import {WorkerRequest} from '../src/lib/polyglot/model/contract';
import {TemporaryStorage} from '../src/lib/polyglot/io/temporary-storage';

// Simulates a format processor that has opened a temporary file and stopped yielding.
addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  if (event.data.type !== 'run') { return; }
  const jobId = event.data.jobId;
  void (async() => {
    const storage = await TemporaryStorage.create(jobId);
    const {writer} = await storage.createOutput(1024);
    await writer.append(new Uint8Array([1, 2, 3]), new AbortController().signal);
    postMessage({type: 'progress', jobId, progress: {stage: 'generate', completed: 3, total: 1024, unit: 'bytes'}});
    // Deliberately leave the writable stream open until the worker is terminated.
  })();
});
