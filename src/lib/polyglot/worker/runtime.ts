import {OperationResult, WorkerResponse} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {prepareComposition} from '../logic/compose';
import {generateResult} from '../logic/generate';
import {TemporaryStorage} from '../io/temporary-storage';
import {checkStorageCapacity} from '../io/resource-budget';
import {diagnose} from '../logic/diagnostic';
import {inspectInputs} from '../logic/inspect';
import {isRecord, isWorkerRequest} from './protocol';

/** One active operation per dedicated worker; no input state survives a terminal message. */
export class WorkerRuntime {
  /** @type {{jobId: string; controller: AbortController} | null} */
  private active: {jobId: string; controller: AbortController} | null = null;

  /**
   * @param {(response: WorkerResponse) => void} send Structured response sink.
   */
  public constructor(private readonly send: (response: WorkerResponse) => void) {}

  /**
   * Handles a request and always translates runtime failures to safe diagnostic data.
   * @param {unknown} message Structured-clone request data.
   * @returns {Promise<void>} Settled operation or cancellation acknowledgement.
   */
  public async receive(message: unknown): Promise<void> {
    if (!isWorkerRequest(message)) {
      const jobId = isRecord(message) && typeof message['jobId'] === 'string' ? message['jobId'] : '';
      this.send({type: 'failed', jobId, diagnostic: {code: 'INVALID_REQUEST', severity: 'error'}});
      return;
    }
    if (message.type === 'cancel') {
      if (this.active?.jobId === message.jobId) { this.active.controller.abort(); }
      return;
    }
    const {jobId, request} = message;
    if (this.active) {
      this.send({type: 'failed', jobId, diagnostic: {code: 'JOB_BUSY', severity: 'error'}});
      return;
    }
    const controller = new AbortController();
    this.active = {jobId, controller};
    const context = {
      signal: controller.signal,
      progress: (progress: Extract<WorkerResponse, {type: 'progress'}>['progress']): void => {
        this.send({type: 'progress', jobId, progress});
      }
    };
    let storage: TemporaryStorage | undefined;
    try {
      const sources = request.inputs.map(input => ({
        id: input.id, name: input.file.name, mediaType: input.file.type,
        reader: new BlobInput(input.file), ...(input.role === undefined ? {} : {role: input.role})
      }));
      const inspection = await inspectInputs(sources, context);
      let result: OperationResult;
      if (request.operation === 'inspect') {
        result = {operation: 'inspect', inspection};
      } else {
        const prepared = await prepareComposition(inspection, sources, context, request.options);
        if (request.operation === 'generate') {
          if (!prepared.plan.ready) {
            const diagnostic = prepared.plan.diagnostics.find(diagnostic => diagnostic.severity === 'error');
            this.send({type: 'failed', jobId, diagnostic: diagnostic ?? {code: 'IMPLEMENTATION_UNAVAILABLE', severity: 'error'}});
            return;
          }
          await checkStorageCapacity(prepared.plan.resources?.minimumBytes ?? 0);
          storage = await TemporaryStorage.create(jobId);
          const artifact = await generateResult(prepared, storage, context);
          result = {operation: 'generate', artifact, interpretations: prepared.plan.interpretations};
        } else { result = {operation: 'plan', plan: prepared.plan}; }
      }
      this.send({type: 'complete', jobId, result});
    } catch(error) {
      if (storage) {
        try { await storage.dispose(); }
        catch { this.send({type: 'failed', jobId, diagnostic: {code: 'CLEANUP_FAILED', severity: 'error'}}); return; }
      }
      this.send({type: 'failed', jobId, diagnostic: diagnose(error, 'WORKER_FAILED')});
    } finally { this.active = null; }
  }
}
