import {describe, expect, it, vi} from 'vitest';

import {OperationRequest, WorkerRequest} from '../model/contract';
import {ProcessingError} from '../logic/diagnostic';
import {WorkerClient} from './worker-client';

/** Controllable transport for crash, stale-event, and cleanup races. */
class FakeWorker {
  /** @type {Worker['onmessage']} */
  public onmessage: Worker['onmessage'] = null;
  /** @type {Worker['onerror']} */
  public onerror: Worker['onerror'] = null;
  /** @type {Worker['onmessageerror']} */
  public onmessageerror: Worker['onmessageerror'] = null;
  /** @type {ReturnType<typeof vi.fn>} */
  public readonly terminate = vi.fn();
  /** @type {ReturnType<typeof vi.fn>} */
  public readonly postMessage = vi.fn<(request: WorkerRequest) => void>();

  /**
   * @param {unknown} data Data delivered as if from a worker.
   */
  public emit(data: unknown): void {
    this.onmessage?.call(this as unknown as Worker, new MessageEvent('message', {data}));
  }

  /** @returns {string} Most recently started job ID. */
  public get jobId(): string { return this.postMessage.mock.calls[0]?.[0].jobId ?? ''; }
}

const request: OperationRequest = {operation: 'inspect', inputs: []};
const completed = (jobId: string): unknown => ({type: 'complete', jobId, result: {operation: 'inspect', inspection: {inputs: [], diagnostics: []}}});
const setup = (cleanup = vi.fn(async(_id: string) => {})) => {
  const workers: FakeWorker[] = [];
  const client = new WorkerClient(() => {
    const worker = new FakeWorker();
    workers.push(worker);
    return worker as unknown as Worker;
  }, cleanup);
  return {client, cleanup, workers, worker: (): FakeWorker => workers.at(-1)!};
};

describe('worker client ownership', () => {
  it('rejects concurrent jobs, forwards progress, then releases the worker and sources', async() => {
    const {client, worker, cleanup} = setup();
    const progress = vi.fn();
    const result = client.run(request, progress);
    await expect(client.run(request)).rejects.toMatchObject({diagnostic: {code: 'JOB_BUSY'}});
    worker().emit({type: 'progress', jobId: worker().jobId, progress: {stage: 'inspect', completed: 0, total: 0, unit: 'inputs'}});
    expect(progress).toHaveBeenCalledOnce();
    worker().emit(completed(worker().jobId));
    await expect(result).resolves.toMatchObject({operation: 'inspect'});
    expect(client.busy).toBe(false);
    expect(worker().terminate).toHaveBeenCalledOnce();
    expect(cleanup).not.toHaveBeenCalled();
  });

  it('ignores stale job IDs and callbacks from terminated workers', async() => {
    const {client, worker} = setup();
    const first = client.run(request);
    const old = worker();
    const staleCallback = old.onmessage;
    old.emit(completed(crypto.randomUUID()));
    expect(client.busy).toBe(true);
    const cancelled = expect(first).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
    await client.cancel();
    await cancelled;
    const second = client.run(request);
    staleCallback?.call(old as unknown as Worker, new MessageEvent('message', {data: completed(old.jobId)}));
    expect(client.busy).toBe(true);
    worker().emit(completed(worker().jobId));
    await expect(second).resolves.toMatchObject({operation: 'inspect'});
  });

  it('waits for job cleanup after termination before allowing a retry', async() => {
    let release: (() => void) | undefined;
    const cleanup = vi.fn(() => new Promise<void>(resolve => { release = resolve; }));
    const {client, worker} = setup(cleanup);
    const job = client.run({operation: 'generate', inputs: []});
    const rejected = expect(job).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
    const cancellation = client.cancel();
    expect(worker().terminate).toHaveBeenCalledOnce();
    expect(cleanup).toHaveBeenCalledWith(worker().jobId);
    expect(client.busy).toBe(true);
    await expect(client.run(request)).rejects.toMatchObject({diagnostic: {code: 'JOB_BUSY'}});
    release?.();
    await cancellation;
    await rejected;
    expect(client.busy).toBe(false);
  });

  it.each(['error', 'messageerror', 'malformed', 'wrong-operation', 'post-failure'] as const)('recovers after %s', async mode => {
    const {client, worker, cleanup} = setup();
    const job = client.run({operation: 'generate', inputs: []});
    if (mode === 'error') { worker().onerror?.call(worker() as unknown as Worker, new Event('error') as ErrorEvent); }
    if (mode === 'messageerror') { worker().onmessageerror?.call(worker() as unknown as Worker, new MessageEvent('messageerror')); }
    if (mode === 'malformed') { worker().emit({type: 'progress', jobId: worker().jobId, progress: {completed: -1}}); }
    if (mode === 'wrong-operation') { worker().emit(completed(worker().jobId)); }
    if (mode === 'post-failure') { worker().emit({type: 'failed', jobId: worker().jobId, diagnostic: {code: 'STORAGE_FULL', severity: 'error'}}); }
    await expect(job).rejects.toBeInstanceOf(ProcessingError);
    expect(cleanup).toHaveBeenCalledOnce();
    expect(client.busy).toBe(false);
    const retry = client.run(request);
    worker().emit(completed(worker().jobId));
    await expect(retry).resolves.toMatchObject({operation: 'inspect'});
  });

  it('reports cleanup failures rather than silently declaring cancellation successful', async() => {
    const {client} = setup(vi.fn(() => Promise.reject(new Error('private storage path'))));
    const job = client.run({operation: 'generate', inputs: []});
    const rejected = expect(job).rejects.toMatchObject({message: 'CLEANUP_FAILED', diagnostic: {code: 'CLEANUP_FAILED'}});
    await client.cancel();
    await rejected;
    expect(client.busy).toBe(false);
  });

  it('reports worker construction or structured-clone failures without retaining an active job', async() => {
    const construction = new WorkerClient(() => { throw new Error('worker unavailable'); }, async() => {});
    await expect(construction.run(request)).rejects.toMatchObject({diagnostic: {code: 'WORKER_FAILED'}});
    expect(construction.busy).toBe(false);
    const transport = new FakeWorker();
    transport.postMessage.mockImplementation(() => { throw new DOMException('clone failure', 'DataCloneError'); });
    const client = new WorkerClient(() => transport as unknown as Worker, async() => {});
    await expect(client.run(request)).rejects.toMatchObject({diagnostic: {code: 'WORKER_FAILED'}});
    expect(transport.terminate).toHaveBeenCalledOnce();
    expect(client.busy).toBe(false);
  });
});
