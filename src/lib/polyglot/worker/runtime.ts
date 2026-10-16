import {OperationResult, WorkerResponse} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {generateResult, planComposition} from '../logic/compose';
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
        const plan = planComposition(inspection, context);
        if (request.operation === 'generate') { generateResult(plan, context); }
        result = {operation: 'plan', plan};
      }
      this.send({type: 'complete', jobId, result});
    } catch(error) {
      this.send({type: 'failed', jobId, diagnostic: diagnose(error, 'WORKER_FAILED')});
    } finally { this.active = null; }
  }
}
