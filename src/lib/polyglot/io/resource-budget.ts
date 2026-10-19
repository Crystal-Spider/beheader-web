import {invalid} from './binary';

/** Every live temporary file contributes to a job-wide cap, including intermediates. */
export const WORKSPACE_LIMIT = 4 * 1024 ** 3;
/** Informational threshold; all jobs already use the same bounded, file-backed I/O. */
export const LARGE_FILE_THRESHOLD = 512 * 1024 ** 2;

/** Accounts high-water file sizes synchronously before a positioned write can grow storage. */
export class ResourceBudget {
  /** @type {Map<string, number>} */
  private readonly sizes = new Map<string, number>();
  /** @type {number} */
  private total = 0;

  /**
   * @param {number} limit Aggregate live-file byte bound.
   */
  public constructor(private readonly limit = WORKSPACE_LIMIT) {}

  /**
   * @param {string} id Opaque owned file ID.
   * @param {number} end Proposed high-water offset.
   */
  public reserve(id: string, end: number): void {
    if (!Number.isSafeInteger(end) || end < 0) { invalid('INVALID_SIZE'); }
    const previous = this.sizes.get(id) ?? 0;
    const size = Math.max(previous, end);
    const total = this.total + size - previous;
    if (!Number.isSafeInteger(total) || total > this.limit) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'WORKSPACE_BYTES', actual: total, limit: this.limit}); }
    this.sizes.set(id, size); this.total = total;
  }

  /**
   * @param {string} id Successfully discarded intermediate.
   */
  public release(id: string): void { this.total -= this.sizes.get(id) ?? 0; this.sizes.delete(id); }
}

/**
 * Rejects known-insufficient headroom; unavailable estimates never substitute for actual write guards.
 * @param {number} minimum Known minimum simultaneous payload bytes.
 * @returns {Promise<void>} Permission to attempt the job, without guaranteeing disk capacity.
 */
export async function checkStorageCapacity(minimum: number): Promise<void> {
  if (!navigator.storage?.estimate) { return; }
  let estimate: StorageEstimate;
  try { estimate = await navigator.storage.estimate(); } catch { return; }
  if (Number.isFinite(estimate.quota) && Number.isFinite(estimate.usage) && minimum > Math.max(0, estimate.quota! - estimate.usage!)) { invalid('STORAGE_FULL'); }
}
