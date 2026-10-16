import {JobProgress, OperationRequest, OperationResult} from '../model/contract';
import {diagnose, ProcessingError} from '../logic/diagnostic';
import {isRecord, isWorkerResponse} from './protocol';

/** Runtime-only active job record; never serialize this object into NgRx. */
interface ActiveJob {
  readonly id: string;
  readonly request: OperationRequest;
  readonly worker: Worker;
  readonly resolve: (result: OperationResult) => void;
  readonly reject: (error: ProcessingError) => void;
  readonly progress: (progress: JobProgress) => void;
  finishing: Promise<void> | null;
}

/** Owns one short-lived dedicated worker, including forced cancellation and crash cleanup. */
export class WorkerClient {
  /** @type {ActiveJob | null} */
  private active: ActiveJob | null = null;

  /**
   * @param {() => Worker} createWorker Lazy bundled worker factory.
   * @param {(jobId: string) => Promise<void>} cleanup Removes generation workspace after failure/cancellation.
   */
  public constructor(private readonly createWorker: () => Worker, private readonly cleanup: (jobId: string) => Promise<void>) {}

  /** @returns {boolean} Whether a job is running or its failure cleanup is pending. */
  public get busy(): boolean { return this.active !== null; }

  /**
   * Starts one job; selected Files remain only in this runtime closure until settlement.
   * @param {OperationRequest} request Selected files and operation.
   * @param {(progress: JobProgress) => void} progress Optional serializable progress observer.
   * @returns {Promise<OperationResult>} Terminal result, or a safe ProcessingError.
   */
  public run(request: OperationRequest, progress: (progress: JobProgress) => void = () => {}): Promise<OperationResult> {
    if (this.active) { return Promise.reject(new ProcessingError({code: 'JOB_BUSY', severity: 'error'})); }
    return new Promise((resolve, reject) => {
      let worker: Worker;
      try { worker = this.createWorker(); } catch { reject(new ProcessingError({code: 'WORKER_FAILED', severity: 'error'})); return; }
      const job: ActiveJob = {id: crypto.randomUUID(), request, worker, resolve, reject, progress, finishing: null};
      this.active = job;
      worker.onmessage = (event: MessageEvent<unknown>): void => {
        const message = event.data;
        if (this.active !== job || job.finishing) { return; }
        if (isRecord(message) && typeof message['jobId'] === 'string' && message['jobId'] !== job.id) { return; }
        if (!isWorkerResponse(message)) { void this.finish(job, new ProcessingError({code: 'WORKER_PROTOCOL', severity: 'error'})); return; }
        if (message.type === 'progress') {
          try { job.progress(message.progress); } catch { void this.finish(job, new ProcessingError({code: 'WORKER_FAILED', severity: 'error'})); }
        } else if (message.type === 'failed') {
          void this.finish(job, new ProcessingError(message.diagnostic));
        } else if (message.result.operation !== request.operation) {
          void this.finish(job, new ProcessingError({code: 'WORKER_PROTOCOL', severity: 'error'}));
        } else {
          void this.finish(job, message.result);
        }
      };
      worker.onerror = (event): void => {
        event.preventDefault();
        void this.finish(job, new ProcessingError({code: 'WORKER_FAILED', severity: 'error'}));
      };
      worker.onmessageerror = (): void => { void this.finish(job, new ProcessingError({code: 'WORKER_PROTOCOL', severity: 'error'})); };
      try { worker.postMessage({type: 'run', jobId: job.id, request}); }
      catch { void this.finish(job, new ProcessingError({code: 'WORKER_FAILED', severity: 'error'})); }
    });
  }

  /** @returns {Promise<void>} Forced termination plus cleanup, even during an unresponsive read. */
  public async cancel(): Promise<void> {
    const job = this.active;
    if (!job) { return; }
    if (job.finishing) { await job.finishing; return; }
    // Termination guarantees cancellation even if a decoder or read does not yield.
    await this.finish(job, new ProcessingError({code: 'CANCELLED', severity: 'error'}));
  }

  /**
   * Terminates before cleanup, rejects stale events, and releases all selected files.
   * @param {ActiveJob} job Owning runtime job.
   * @param {OperationResult | ProcessingError} outcome Terminal result or safe error.
   * @returns {Promise<void>} Completion of any necessary cleanup and settlement.
   */
  private finish(job: ActiveJob, outcome: OperationResult | ProcessingError): Promise<void> {
    if (this.active !== job) { return Promise.resolve(); }
    if (job.finishing) { return job.finishing; }
    job.worker.onmessage = null;
    job.worker.onerror = null;
    job.worker.onmessageerror = null;
    job.worker.terminate();
    job.finishing = (async(): Promise<void> => {
      let terminal = outcome;
      // Runtime reports unavailable storage only before allocation or after successful disposal.
      // Retrying through the same unavailable API would mask that actionable failure as cleanup failure.
      if (outcome instanceof ProcessingError && job.request.operation === 'generate' && outcome.diagnostic.code !== 'STORAGE_UNAVAILABLE') {
        try { await this.cleanup(job.id); }
        catch(error) { terminal = new ProcessingError(diagnose(error, 'CLEANUP_FAILED')); }
      }
      // Defer settlement so finishing is assigned before another operation can start.
      await Promise.resolve();
      this.active = null;
      if (terminal instanceof ProcessingError) { job.reject(terminal); }
      else { job.resolve(terminal); }
    })();
    return job.finishing;
  }
}
