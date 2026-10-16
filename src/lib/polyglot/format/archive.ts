import {Entry, Reader, ZipReader, ZipWriter, configure} from '@zip.js/zip.js';

import {ArchiveCollision, ArtifactReference, InputSource, ProcessingContext, SeekableInput} from '../model/contract';
import {BinaryReader, invalid} from '../io/binary';
import {CHUNK_BYTES, INPUT_LIMIT, TOTAL_INPUT_LIMIT} from '../io/bytes';
import {BlobInput} from '../io/blob-input';
import {OutputWriter} from '../io/output-writer';
import {TemporaryStorage} from '../io/temporary-storage';
import {checkCancelled, diagnose, ProcessingError} from '../logic/diagnostic';

// Run locally inside the owning processing worker; no nested workers, remote codecs, or WASM downloads.
configure({useWebWorkers: false, chunkSize: 65536});

/** Metadata allocation bounds are checked before zip.js reads the complete central directory. */
export const ARCHIVE_ENTRY_LIMIT = 4096;

/** Validated seekable archive and bounded entry index; no expanded payloads are retained here. */
export interface ArchiveInfo {
  readonly source: InputSource;
  readonly entries: readonly Entry[];
  readonly expandedSize: number;
}

/** Last-selected entry wins, while selected archive order remains visible in plan metadata. */
export interface ArchiveWinner {
  readonly archive: ArchiveInfo;
  readonly entry: Entry;
  readonly path: string;
}

/**
 * Supplies true random access instead of a stream adapter that would buffer the entire ZIP.
 */
export class ArchiveReader extends Reader<Uint8Array> {
  /**
   * @param {SeekableInput} input Bounded source.
   * @param {AbortSignal} signal Job cancellation.
   */
  public constructor(private readonly input: SeekableInput, private readonly signal: AbortSignal) {
    super(new Uint8Array(0));
    this.size = input.size;
  }

  /**
   * @param {number} offset Source position.
   * @param {number} length Requested bounded bytes.
   * @returns {Promise<Uint8Array<ArrayBuffer>>} Exact bytes or a safe diagnostic.
   */
  public override async readUint8Array(offset: number, length: number): Promise<Uint8Array<ArrayBuffer>> {
    if (length > CHUNK_BYTES) { invalid('FORMAT_RESOURCE_LIMIT'); }
    return new BinaryReader(this.input, this.signal).read(offset, length);
  }
}

/**
 * Canonicalizes relative ZIP names without ever using them as storage paths.
 * @param {string} filename Untrusted entry name.
 * @returns {string} Safe relative slash-separated path.
 */
export function archivePath(filename: string): string {
  const path = filename.replaceAll('\\', '/');
  if (!path || path.length > 1024 || path.startsWith('/') || /^[a-z]:/i.test(path)
    || [...path].some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) { invalid('ARCHIVE_PATH'); }
  const segments = path.replace(/\/$/, '').split('/');
  if (segments.some(segment => !segment || segment === '.' || segment === '..' || segment.includes(':'))) { invalid('ARCHIVE_PATH'); }
  return segments.join('/') + (path.endsWith('/') ? '/' : '');
}

/**
 * Preflights the EOCD and metadata bounds before handing a seekable reader to zip.js.
 * @param {InputSource} source Archive input.
 * @param {ProcessingContext} context Job context.
 * @returns {Promise<ArchiveInfo>} Unencrypted, single-disk classic ZIP metadata.
 */
export async function inspectArchive(source: InputSource, context: ProcessingContext): Promise<ArchiveInfo> {
  const reader = new BinaryReader(source.reader, context.signal);
  const tailOffset = Math.max(0, source.reader.size - 65557);
  const tail = await reader.read(tailOffset, source.reader.size - tailOffset);
  let end = -1;
  for (let index = tail.length - 22; index >= 0; index--) {
    const view = new DataView(tail.buffer, index);
    if (view.getUint32(0, true) === 0x06054b50 && index + 22 + view.getUint16(20, true) === tail.length) { end = index; break; }
  }
  if (end < 0) { invalid('ARCHIVE_INVALID'); }
  const view = new DataView(tail.buffer, end);
  if (view.getUint16(4, true) || view.getUint16(6, true) || view.getUint16(8, true) !== view.getUint16(10, true)) { invalid('ARCHIVE_SPLIT'); }
  const count = view.getUint16(10, true);
  const length = view.getUint32(12, true);
  const offset = view.getUint32(16, true);
  if (count === 65535 || length === 0xffffffff || offset === 0xffffffff) { invalid('ARCHIVE_UNSUPPORTED'); }
  if (count > ARCHIVE_ENTRY_LIMIT || length > CHUNK_BYTES) { invalid('FORMAT_RESOURCE_LIMIT'); }
  if (offset + length !== tailOffset + end) { invalid('ARCHIVE_INVALID'); }
  const zip = new ZipReader(new ArchiveReader(source.reader, context.signal), {useWebWorkers: false, checkCrc32: true, strictness: 'strict'});
  try {
    const entries = await zip.getEntries();
    if (entries.length !== count) { invalid('ARCHIVE_INVALID'); }
    let expandedSize = 0;
    for (const entry of entries) {
      archivePath(entry.filename);
      if (entry.encrypted) { invalid('ARCHIVE_ENCRYPTED'); }
      if (entry.diskNumberStart) { invalid('ARCHIVE_SPLIT'); }
      if (entry.zip64 || entry.symlink || ![0, 8].includes(entry.compressionMethod)) { invalid('ARCHIVE_UNSUPPORTED'); }
      if (!Number.isSafeInteger(entry.uncompressedSize) || entry.uncompressedSize < 0 || (entry.directory && (entry.uncompressedSize || entry.compressedSize))) { invalid('ARCHIVE_INVALID'); }
      if (entry.directory) {
        const local = await reader.read(entry.offset, 30);
        const fields = new DataView(local.buffer);
        if (fields.getUint32(0, true) !== 0x04034b50 || fields.getUint16(8, true) !== 0
          || fields.getUint32(18, true) !== 0 || fields.getUint32(22, true) !== 0) { invalid('ARCHIVE_INVALID'); }
        const filename = await reader.read(entry.offset + 30, fields.getUint16(26, true));
        if (filename.length !== entry.rawFilename.length || filename.some((byte, index) => byte !== entry.rawFilename[index])) { invalid('ARCHIVE_INVALID'); }
      }
      expandedSize += entry.uncompressedSize;
      if (expandedSize >= INPUT_LIMIT) { invalid('ARCHIVE_EXPANDED_LIMIT'); }
    }
    return {source, entries, expandedSize};
  } catch(error) { throw new ProcessingError(diagnose(error, 'ARCHIVE_INVALID')); }
  finally { await zip.close(); }
}

/**
 * Resolves matching paths in input order and rejects file/directory ancestry conflicts.
 * @param {readonly ArchiveInfo[]} archives Selected order, never sorted by filename.
 * @returns {{winners: ArchiveWinner[]; collisions: ArchiveCollision[]}} Deterministic merged index.
 */
export function mergeArchives(archives: readonly ArchiveInfo[]): {winners: ArchiveWinner[]; collisions: ArchiveCollision[]} {
  const winners = new Map<string, ArchiveWinner>();
  const collisions: ArchiveCollision[] = [];
  let declared = 0;
  let entries = 0;
  for (const archive of archives) {
    entries += archive.entries.length;
    if (entries > ARCHIVE_ENTRY_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT'); }
    declared += archive.expandedSize;
    if (declared > TOTAL_INPUT_LIMIT) { invalid('ARCHIVE_EXPANDED_LIMIT'); }
    for (const entry of archive.entries) {
      const path = archivePath(entry.filename);
      const previous = winners.get(path);
      if (previous) { collisions.push({path, earlierInputId: previous.archive.source.id, laterInputId: archive.source.id}); }
      winners.set(path, {archive, entry, path});
      if (winners.size > ARCHIVE_ENTRY_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT'); }
    }
  }
  let expanded = 0;
  for (const winner of winners.values()) {
    expanded += winner.entry.uncompressedSize;
    if (expanded >= INPUT_LIMIT) { invalid('ARCHIVE_EXPANDED_LIMIT'); }
    const parts = winner.path.replace(/\/$/, '').split('/');
    for (let index = 1; index < parts.length; index++) {
      if (winners.has(parts.slice(0, index).join('/'))) { invalid('ARCHIVE_PATH'); }
    }
    if (!winner.entry.directory && winners.has(winner.path + '/')) { invalid('ARCHIVE_PATH'); }
  }
  return {winners: [...winners.values()], collisions};
}

/**
 * Validates every entry, including overwritten ones, and repacks winners using file-backed intermediates.
 * @param {readonly ArchiveInfo[]} archives Selected archive order.
 * @param {OutputWriter} output Final positioned output.
 * @param {TemporaryStorage} storage Owning job workspace.
 * @param {ProcessingContext} context Cancellation and progress.
 * @param {Uint8Array<ArrayBuffer>} comment Optional PDF end marker retained in the final ZIP comment.
 * @returns {Promise<void>} Finished ZIP with offsets relative to the complete polyglot.
 */
export async function appendArchives(archives: readonly ArchiveInfo[], output: OutputWriter, storage: TemporaryStorage, context: ProcessingContext, comment: Uint8Array<ArrayBuffer>): Promise<void> {
  const {winners} = mergeArchives(archives);
  const retained = new Map<Entry, {artifact: ArtifactReference; input: BlobInput}>();
  const total = archives.reduce((sum, archive) => sum + archive.expandedSize, 0);
  let completed = 0;
  for (const archive of archives) {
    let expanded = 0;
    for (const entry of archive.entries) {
      checkCancelled(context.signal);
      const keep = winners.some(winner => winner.entry === entry);
      const target = !entry.directory && keep ? await storage.createOutput(INPUT_LIMIT - 1) : null;
      let actual = 0;
      let sinkFailure: unknown;
      const stream = new WritableStream<Uint8Array<ArrayBuffer>>({write: async bytes => {
        try {
          checkCancelled(context.signal);
          actual += bytes.length;
          expanded += bytes.length;
          completed += bytes.length;
          if (expanded >= INPUT_LIMIT || actual > entry.uncompressedSize) { invalid('ARCHIVE_EXPANDED_LIMIT'); }
          if (target) {
            for (let offset = 0; offset < bytes.length; offset += CHUNK_BYTES) { await target.writer.append(bytes.slice(offset, offset + CHUNK_BYTES), context.signal); }
          }
          context.progress({stage: 'extract', completed, total, unit: 'bytes'});
        } catch(error) { sinkFailure = error; throw error; }
      }});
      try {
        if (!entry.directory) { await entry.getData(stream, {signal: context.signal, checkCrc32: true, checkOverlappingEntry: true, checkLocalDirectory: true, checkLocalFilename: true, useWebWorkers: false}); }
      } catch(error) { throw new ProcessingError(diagnose(sinkFailure ?? error, 'ARCHIVE_INVALID')); }
      if (actual !== entry.uncompressedSize) { invalid('ARCHIVE_INVALID'); }
      if (target) {
        const artifact = await target.writer.finish(storage.jobId, target.id, 'application/octet-stream', context.signal);
        retained.set(entry, {artifact, input: new BlobInput(await storage.resolve(artifact))});
      }
    }
  }
  let outputFailure: unknown;
  const stream = new WritableStream<Uint8Array<ArrayBuffer>>({write: async bytes => {
    try {
      for (let offset = 0; offset < bytes.length; offset += CHUNK_BYTES) { await output.append(bytes.slice(offset, offset + CHUNK_BYTES), context.signal); }
    } catch(error) { outputFailure = error; throw error; }
  }});
  const zip = new ZipWriter(stream, {offset: output.size, useWebWorkers: false, zip64: false, level: 6, bufferedWrite: false, dataDescriptor: true, extendedTimestamp: false});
  try {
    let packed = 0;
    context.progress({stage: 'pack', completed: packed, total: winners.length, unit: 'inputs'});
    for (const winner of winners) {
      const file = retained.get(winner.entry);
      await zip.add(winner.path, file ? new ArchiveReader(file.input, context.signal) : undefined, {
        directory: winner.entry.directory, signal: context.signal, lastModDate: winner.entry.lastModDate,
        externalFileAttributes: winner.entry.externalFileAttributes
      });
      if (file) { await storage.discard(file.artifact); }
      context.progress({stage: 'pack', completed: ++packed, total: winners.length, unit: 'inputs'});
    }
    await zip.close(comment);
  } catch(error) { throw new ProcessingError(diagnose(outputFailure ?? error, 'ARCHIVE_INVALID')); }
}
