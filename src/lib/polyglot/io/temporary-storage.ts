import {ArtifactReference} from '../model/contract';
import {diagnose, ProcessingError} from '../logic/diagnostic';
import {OutputWriter} from './output-writer';

/** Application-owned OPFS namespace; never remove the origin root or another app's data. */
export const STORAGE_DIRECTORY = 'beheader-web-polyglot-v1';

/**
 * Restricts all directory/file identifiers to app-generated opaque UUIDs.
 * @param {string} id Proposed workspace identifier.
 */
export function validateStorageId(id: string): void {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
    throw new ProcessingError({code: 'INVALID_REQUEST', severity: 'error'});
  }
}

/**
 * Gets the app-owned root, translating denied/unsupported storage into a stable diagnostic.
 * @returns {Promise<FileSystemDirectoryHandle>} The application namespace only.
 */
export async function storageRoot(): Promise<FileSystemDirectoryHandle> {
  try {
    if (!globalThis.navigator?.storage?.getDirectory) {
      throw new ProcessingError({code: 'STORAGE_UNAVAILABLE', severity: 'error'});
    }
    const root = await navigator.storage.getDirectory();
    return await root.getDirectoryHandle(STORAGE_DIRECTORY, {create: true});
  } catch(error) {
    throw new ProcessingError(diagnose(error, 'STORAGE_UNAVAILABLE'));
  }
}

/**
 * Removes exactly one job after a worker has stopped and released its handles.
 * @param {string} jobId Job to discard; unrelated directories remain untouched.
 * @returns {Promise<void>} Completion, or a recoverable cleanup diagnostic.
 */
export async function cleanupJob(jobId: string): Promise<void> {
  validateStorageId(jobId);
  try {
    const root = await storageRoot();
    await root.removeEntry(jobId, {recursive: true});
  } catch(error) {
    if (error instanceof DOMException && error.name === 'NotFoundError') { return; }
    throw new ProcessingError({code: 'CLEANUP_FAILED', severity: 'error'});
  }
}

/**
 * Resolves a retained worker result without reading its complete payload or recreating its job.
 * @param {ArtifactReference} artifact Opaque worker result.
 * @returns {Promise<File>} File-backed snapshot, valid until explicit cleanup.
 */
export async function resolveArtifact(artifact: ArtifactReference): Promise<File> {
  validateStorageId(artifact.jobId);
  validateStorageId(artifact.id);
  if (!Number.isSafeInteger(artifact.size) || artifact.size < 0) { throw new ProcessingError({code: 'INVALID_SIZE', severity: 'error'}); }
  try {
    const root = await storageRoot();
    const job = await root.getDirectoryHandle(artifact.jobId);
    const handle = await job.getFileHandle(artifact.id);
    const file = await handle.getFile();
    if (file.size !== artifact.size) { throw new ProcessingError({code: 'TRUNCATED_INPUT', severity: 'error'}); }
    return file;
  } catch(error) { throw new ProcessingError(diagnose(error)); }
}

/** Job-scoped temporary files and output references; all live handles stay outside state. */
export class TemporaryStorage {
  /** @type {Set<OutputWriter>} */
  private readonly writers = new Set<OutputWriter>();
  /** @type {boolean} */
  private disposed = false;
  /** @type {boolean} */
  private busy = false;

  /**
   * @param {string} jobId Owning UUID.
   * @param {FileSystemDirectoryHandle} directory Owned job directory.
   */
  private constructor(public readonly jobId: string, private readonly directory: FileSystemDirectoryHandle) {}

  /**
   * Creates a fresh job without reusing or overwriting an existing workspace.
   * @param {string} jobId Owning UUID.
   * @returns {Promise<TemporaryStorage>} New disk-backed workspace.
   */
  public static async create(jobId: string): Promise<TemporaryStorage> {
    validateStorageId(jobId);
    try {
      const root = await storageRoot();
      try {
        await root.getDirectoryHandle(jobId);
        throw new ProcessingError({code: 'JOB_BUSY', severity: 'error'});
      } catch(error) {
        if (!(error instanceof DOMException) || error.name !== 'NotFoundError') { throw error; }
      }
      return new TemporaryStorage(jobId, await root.getDirectoryHandle(jobId, {create: true}));
    } catch(error) { throw new ProcessingError(diagnose(error, 'STORAGE_UNAVAILABLE')); }
  }

  /**
   * Opens one fresh bounded output, using caller-selected resource limits.
   * @param {number} limit Maximum bytes for this file.
   * @returns {Promise<{id: string; writer: OutputWriter}>} Opaque identifier and writer.
   */
  public async createOutput(limit: number): Promise<{id: string; writer: OutputWriter}> {
    this.requireOpen();
    if (!Number.isSafeInteger(limit) || limit < 0) { throw new ProcessingError({code: 'INVALID_SIZE', severity: 'error'}); }
    this.busy = true;
    try {
      const id = crypto.randomUUID();
      const file = await this.directory.getFileHandle(id, {create: true});
      const stream = await file.createWritable();
      const writer = new OutputWriter({
        write: async(offset, bytes) => { await stream.write({type: 'write', position: offset, data: bytes}); },
        close: async() => { await stream.close(); },
        abort: async() => { await stream.abort(); }
      }, limit);
      this.writers.add(writer);
      return {id, writer};
    } catch(error) { throw new ProcessingError(diagnose(error, 'STORAGE_UNAVAILABLE')); }
    finally { this.busy = false; }
  }

  /**
   * Resolves a finished artifact into a file snapshot without reading its full contents.
   * @param {ArtifactReference} artifact Serializable reference from this workspace.
   * @returns {Promise<File>} File-backed snapshot, valid while the workspace is retained.
   */
  public async resolve(artifact: ArtifactReference): Promise<File> {
    this.requireOpen();
    validateStorageId(artifact.id);
    if (artifact.jobId !== this.jobId) { throw new ProcessingError({code: 'INVALID_REQUEST', severity: 'error'}); }
    try {
      const handle = await this.directory.getFileHandle(artifact.id);
      const file = await handle.getFile();
      if (file.size !== artifact.size) { throw new ProcessingError({code: 'TRUNCATED_INPUT', severity: 'error'}); }
      return file;
    } catch(error) { throw new ProcessingError(diagnose(error)); }
  }

  /** @returns {Promise<void>} Closes open streams, then removes only this job's files. */
  public async dispose(): Promise<void> {
    if (this.disposed) { return; }
    this.requireOpen();
    this.busy = true;
    try {
      const results = await Promise.allSettled([...this.writers].map(writer => writer.abort()));
      if (results.some(result => result.status === 'rejected')) {
        throw new ProcessingError({code: 'CLEANUP_FAILED', severity: 'error'});
      }
      await cleanupJob(this.jobId);
      this.writers.clear();
      this.disposed = true;
    } finally {
      this.busy = false;
    }
  }

  /** Rejects use after cleanup. */
  private requireOpen(): void {
    if (this.disposed || this.busy) { throw new ProcessingError({code: 'IO_FAILURE', severity: 'error'}); }
  }
}
