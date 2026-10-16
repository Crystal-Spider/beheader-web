import {Diagnostic} from '../model/contract';
import {cleanupJob, storageRoot, validateStorageId} from './temporary-storage';
import {diagnose} from '../logic/diagnostic';

/** Shared for live tabs; exclusive cleanup never overlaps a current app session. */
export const STORAGE_SESSION_LOCK = 'beheader-web:storage-session-v1';

/** Runtime-only lease; neither lock handles nor selected files enter persistent state. */
export interface StorageSession {
  readonly release: () => void;
  readonly diagnostic?: Diagnostic;
}

/**
 * Cleans only abandoned UUID workspaces when no live tab holds the shared lease, then protects this tab.
 * Without Web Locks, cleanup is conservatively skipped to avoid deleting another tab's work.
 * @returns {Promise<StorageSession>} Lifetime lease and an optional recoverable maintenance diagnostic.
 */
export async function startStorageSession(): Promise<StorageSession> {
  if (!navigator.locks) { return {release: () => {}}; }
  let diagnostic: Diagnostic | undefined;
  try {
    await navigator.locks.request(STORAGE_SESSION_LOCK, {mode: 'exclusive', ifAvailable: true}, async lock => {
      if (!lock) { return; }
      const root = await storageRoot();
      // Directory iteration is supported by current target browsers but omitted from some DOM type sets.
      const iterable = root as FileSystemDirectoryHandle & AsyncIterable<[string, FileSystemHandle]>;
      for await (const [name, handle] of iterable) {
        if (handle.kind !== 'directory') { continue; }
        try { validateStorageId(name); } catch { continue; }
        await cleanupJob(name);
      }
    });
  } catch(error) { diagnostic = diagnose(error, 'CLEANUP_FAILED'); }
  let release: () => void = () => {};
  const held = new Promise<void>(resolve => { release = resolve; });
  await new Promise<void>((resolve, reject) => {
    void navigator.locks.request(STORAGE_SESSION_LOCK, {mode: 'shared'}, async() => { resolve(); await held; }).catch(reject);
  });
  return {release, ...(diagnostic ? {diagnostic} : {})};
}
