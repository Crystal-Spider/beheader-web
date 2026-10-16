import {BlobInput} from '../src/lib/polyglot/io/blob-input';
import {TemporaryStorage} from '../src/lib/polyglot/io/temporary-storage';
import {CHUNK_BYTES} from '../src/lib/polyglot/io/bytes';
import {InputSource} from '../src/lib/polyglot/model/contract';
import {inspectInputs} from '../src/lib/polyglot/logic/inspect';
import {prepareComposition} from '../src/lib/polyglot/logic/compose';
import {generateResult} from '../src/lib/polyglot/logic/generate';
import {diagnose} from '../src/lib/polyglot/logic/diagnostic';

// Synthetic seekable input supplies bytes on demand; the real generator writes an actual large OPFS file.
addEventListener('message', (event: MessageEvent<{pdf: number[]; cancel: boolean}>) => {
  void (async() => {
    const controller = new AbortController();
    const jobId = crypto.randomUUID();
    const storage = await TemporaryStorage.create(jobId);
    let maxRead = 0;
    const context = {signal: controller.signal, progress: (progress: {stage: string; completed: number}): void => {
      if (event.data.cancel && progress.stage === 'generate' && progress.completed > 32 * CHUNK_BYTES) { controller.abort(); }
    }};
    const inputs: InputSource[] = [
      {id: 'html', name: 'index.html', mediaType: '', reader: new BlobInput(new Blob(['<!doctype html><p>Large fixture</p>']))},
      {id: 'pdf', name: 'file.pdf', mediaType: '', reader: new BlobInput(new Blob([new Uint8Array(event.data.pdf)]))},
      {id: 'raw', name: 'large.bin', mediaType: '', role: 'appendable', reader: {size: 512 * CHUNK_BYTES + 1, read: (_offset, length): Promise<Uint8Array<ArrayBuffer>> => {
        maxRead = Math.max(maxRead, length);
        if (length > CHUNK_BYTES) { throw new Error('unbounded read'); }
        return Promise.resolve(new Uint8Array(length).fill(65));
      }}}
    ];
    try {
      const prepared = await prepareComposition(await inspectInputs(inputs, context), inputs, context);
      const artifact = await generateResult(prepared, storage, context);
      postMessage({artifact, resources: prepared.plan.resources, maxRead});
    } catch(error) { await storage.dispose(); postMessage({diagnostic: diagnose(error), jobId, maxRead}); }
  })().catch(error => postMessage({error: String(error)}));
});
