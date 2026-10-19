import {Entry} from '@zip.js/zip.js';
import {DefaultTreeAdapterTypes, serializeOuter} from 'parse5';

import {ProcessingContext} from '../model/contract';
import {CHUNK_BYTES, INPUT_LIMIT} from '../io/bytes';
import {invalid} from '../io/binary';
import {OutputWriter} from '../io/output-writer';
import {checkCancelled, ProcessingError} from '../logic/diagnostic';
import {archiveDiagnostic} from './archive';

/** A bounded text fragment, ZIP payload or lazily encoded subtree; never a large data URL string. */
export type HtmlPart = string | {readonly kind: 'asset'; readonly entry: Entry; readonly size: number}
  | {readonly kind: 'base64'; readonly parts: readonly HtmlPart[]; readonly size: number};

/**
 * Splits at UTF-16 character boundaries without breaking surrogate pairs.
 * @param {string} text Parsed text or metadata.
 * @returns {Generator<string>} Bounded fragments for UTF-8 encoding and escaping.
 */
export function* textFragments(text: string): Generator<string> {
  for (let offset = 0; offset < text.length;) {
    let end = Math.min(text.length, offset + 32768);
    const last = text.charCodeAt(end - 1);
    if (end < text.length && last >= 0xd800 && last <= 0xdbff) { end--; }
    yield text.slice(offset, end);
    offset = end;
  }
}

/**
 * @param {HtmlPart} part One recipe node.
 * @returns {number} Exact emitted UTF-8 byte count.
 */
export function partSize(part: HtmlPart): number {
  if (typeof part !== 'string') { return part.size; }
  let size = 0;
  for (const text of textFragments(part)) { size += new TextEncoder().encode(text).length; }
  return size;
}

/**
 * @param {readonly HtmlPart[]} parts Unencoded resource or CSS recipe.
 * @returns {HtmlPart} Size-checked lazy base64 node.
 */
export function encodedPart(parts: readonly HtmlPart[]): HtmlPart {
  const size = 4 * Math.ceil(parts.reduce((sum, part) => sum + partSize(part), 0) / 3);
  if (size > INPUT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_OUTPUT_BYTES', actual: size, limit: INPUT_LIMIT}); }
  return {kind: 'base64', parts, size};
}

/**
 * Walks DOM children with bounded stack operations, including optional template content.
 * @param {DefaultTreeAdapterTypes.ParentNode} root Parsed document or fragment.
 * @param {boolean} templates Whether inert template children are included.
 * @returns {Generator<DefaultTreeAdapterTypes.ChildNode>} Document-order nodes.
 */
export function* htmlNodes(root: DefaultTreeAdapterTypes.ParentNode, templates = true): Generator<DefaultTreeAdapterTypes.ChildNode> {
  const stack: DefaultTreeAdapterTypes.ChildNode[] = [];
  const push = (children: readonly DefaultTreeAdapterTypes.ChildNode[]): void => { for (let index = children.length - 1; index >= 0; index--) { stack.push(children[index]!); } };
  push(root.childNodes);
  let visited = 0;
  while (stack.length) {
    const node = stack.pop()!;
    if (++visited > 1000000) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_NODES', actual: visited, limit: 1000000}); }
    yield node;
    if ('content' in node) { if (templates) { push(node.content.childNodes); } }
    else if ('childNodes' in node) { push(node.childNodes); }
  }
}

/**
 * Uses parse5's escaping/namespace rules one shallow node at a time, avoiding recursive serialization.
 * @param {DefaultTreeAdapterTypes.Document} document Parsed and rewritten DOM.
 * @returns {Generator<string>} Markup fragments; resource placeholders remain small.
 */
export function* htmlMarkup(document: DefaultTreeAdapterTypes.Document): Generator<string> {
  const stack: (DefaultTreeAdapterTypes.ChildNode | string)[] = [];
  for (let index = document.childNodes.length - 1; index >= 0; index--) { stack.push(document.childNodes[index]!); }
  while (stack.length) {
    const node = stack.pop()!;
    if (typeof node === 'string') { yield node; continue; }
    if ('tagName' in node) {
      const shallow = {...node, childNodes: [], ...('content' in node ? {content: {...node.content, childNodes: []}} : {})};
      const markup = serializeOuter(shallow);
      const close = `</${node.tagName}>`;
      if (!markup.endsWith(close)) { yield markup; continue; }
      yield markup.slice(0, -close.length);
      stack.push(close);
      const children = 'content' in node ? node.content.childNodes : node.childNodes;
      for (let index = children.length - 1; index >= 0; index--) { stack.push(children[index]!); }
    } else if ('value' in node) {
      for (const value of textFragments(node.value)) { yield serializeOuter({...node, value}); }
    } else { yield serializeOuter(node); }
  }
}

/** Backpressured byte destination; every write is at most one I/O chunk. */
type ByteSink = (bytes: Uint8Array<ArrayBuffer>) => Promise<void>;

/** Stateful base64 transform preserving triplets across arbitrary input chunk boundaries. */
class Base64Sink {
  /** @type {Uint8Array<ArrayBuffer>} */
  private tail = new Uint8Array(0);

  /** @param {ByteSink} sink Downstream encoder or final positioned file. */
  public constructor(private readonly sink: ByteSink) {}

  /**
   * @param {Uint8Array<ArrayBuffer>} bytes Bounded unencoded fragment.
   * @returns {Promise<void>} Backpressure after all complete triplets are emitted.
   */
  public async write(bytes: Uint8Array<ArrayBuffer>): Promise<void> {
    for (let offset = 0; offset < bytes.length; offset += 32768) {
      const piece = bytes.subarray(offset, offset + 32768);
      const joined = new Uint8Array(this.tail.length + piece.length);
      joined.set(this.tail); joined.set(piece, this.tail.length);
      const length = joined.length - joined.length % 3;
      this.tail = joined.slice(length);
      if (length) { await this.sink(new TextEncoder().encode(btoa(String.fromCharCode(...joined.subarray(0, length))))); }
    }
  }

  /** @returns {Promise<void>} Final padded base64 bytes. */
  public async finish(): Promise<void> {
    if (this.tail.length) { await this.sink(new TextEncoder().encode(btoa(String.fromCharCode(...this.tail)))); }
  }
}

/**
 * Writes lazy recipes directly to the final file, retaining only bounded codec buffers.
 * @param {Iterable<HtmlPart>} parts Resource-aware markup fragments.
 * @param {number} size Planned final HTML bytes.
 * @param {OutputWriter} output Positioned output, already containing the container prefix.
 * @param {ProcessingContext} context Cancellation and HTML byte progress.
 * @returns {Promise<void>} Exact emitted size or a typed integrity/resource failure.
 */
export async function writeHtml(parts: Iterable<HtmlPart>, size: number, output: OutputWriter, context: ProcessingContext): Promise<void> {
  let completed = 0;
  let accepted = 0;
  let used = 0;
  const buffer = new Uint8Array(65536);
  const flush = async(): Promise<void> => {
    if (!used) { return; }
    await output.append(buffer.slice(0, used), context.signal);
    completed += used; used = 0;
    context.progress({stage: 'generate', completed, total: size, unit: 'bytes'});
  };
  const sink: ByteSink = async bytes => {
    checkCancelled(context.signal);
    if (accepted + bytes.length > size || accepted + bytes.length > INPUT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_OUTPUT_BYTES', actual: accepted + bytes.length, limit: Math.min(size, INPUT_LIMIT)}); }
    accepted += bytes.length;
    for (let offset = 0; offset < bytes.length;) {
      const length = Math.min(buffer.length - used, bytes.length - offset);
      buffer.set(bytes.subarray(offset, offset + length), used);
      used += length; offset += length;
      if (used === buffer.length) { await flush(); }
    }
  };
  const emit = async(part: HtmlPart, destination: ByteSink): Promise<void> => {
    checkCancelled(context.signal);
    if (typeof part === 'string') {
      for (const text of textFragments(part)) { await destination(new TextEncoder().encode(text)); }
    } else if (part.kind === 'base64') {
      const encoder = new Base64Sink(destination);
      // Each nesting layer increases the planned byte count by 4/3; the 1 GiB
      // output bound also bounds encoder nesting without an arbitrary import cap.
      for (const child of part.parts) { await emit(child, bytes => encoder.write(bytes)); }
      await encoder.finish();
    } else {
      if (part.entry.directory) { invalid('HTML_ASSET_INVALID', {reason: 'ASSET_DIRECTORY'}); }
      let actual = 0;
      let failure: unknown;
      try {
        await part.entry.getData(new WritableStream<Uint8Array<ArrayBuffer>>({write: async bytes => {
          try {
            checkCancelled(context.signal);
            actual += bytes.length;
            if (actual > part.size) { invalid('ARCHIVE_EXPANDED_LIMIT', {reason: 'ZIP_ENTRY_SIZE', actual, limit: part.size}); }
            for (let offset = 0; offset < bytes.length; offset += CHUNK_BYTES) { await destination(bytes.slice(offset, offset + CHUNK_BYTES)); }
          } catch(error) { failure = error; throw error; }
        }}), {signal: context.signal, checkCrc32: true, checkLocalDirectory: true, checkLocalFilename: true, checkOverlappingEntry: true, useWebWorkers: false});
      } catch(error) { throw new ProcessingError(archiveDiagnostic(failure ?? error, 'HTML_ASSET_INVALID')); }
      if (actual !== part.size) { invalid('ARCHIVE_INVALID', {reason: 'ZIP_ENTRY_SIZE', actual, limit: part.size}); }
    }
  };
  for (const part of parts) { await emit(part, sink); }
  await flush();
  if (completed !== size) { invalid('HTML_ASSET_INVALID', {reason: 'ASSET_RECIPE'}); }
}
