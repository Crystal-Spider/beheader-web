import {BlobInput} from '../src/lib/polyglot/io/blob-input';
import {TemporaryStorage} from '../src/lib/polyglot/io/temporary-storage';
import {CHUNK_BYTES} from '../src/lib/polyglot/io/bytes';
import {InputSource} from '../src/lib/polyglot/model/contract';
import {inspectInputs} from '../src/lib/polyglot/logic/inspect';
import {prepareComposition} from '../src/lib/polyglot/logic/compose';
import {generateResult} from '../src/lib/polyglot/logic/generate';
import {diagnose} from '../src/lib/polyglot/logic/diagnostic';

// Synthetic seekable input supplies bytes on demand; the real generator writes an actual large OPFS file.
addEventListener('message', (event: MessageEvent<{cancel: boolean}>) => {
  void (async() => {
    const controller = new AbortController();
    const jobId = crypto.randomUUID();
    const storage = await TemporaryStorage.create(jobId);
    let maxRead = 0;
    // An unreferenced PDF stream exercises copying real supported content without a giant test allocation.
    const payloadSize = 512 * CHUNK_BYTES + 1;
    let prefix = '%PDF-1.4\n';
    const offsets: number[] = [];
    for (const [index, body] of [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >>'
    ].entries()) {
      offsets.push(prefix.length);
      prefix += `${index + 1} 0 obj\n${body}\nendobj\n`;
    }
    offsets.push(prefix.length);
    prefix += `4 0 obj\n<< /Length ${payloadSize} >>\nstream\n`;
    const streamEnd = '\nendstream\nendobj\n';
    const xref = prefix.length + payloadSize + streamEnd.length;
    const suffix = `${streamEnd}xref\n0 5\n0000000000 65535 f \n${offsets.map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    const head = new TextEncoder().encode(prefix);
    const tail = new TextEncoder().encode(suffix);
    const context = {signal: controller.signal, progress: (progress: {stage: string; completed: number}): void => {
      if (event.data.cancel && progress.stage === 'generate' && progress.completed > 32 * CHUNK_BYTES) { controller.abort(); }
    }};
    const inputs: InputSource[] = [
      {id: 'html', name: 'index.html', mediaType: '', reader: new BlobInput(new Blob(['<!doctype html><p>Large fixture</p>']))},
      {id: 'pdf', name: 'large.pdf', mediaType: '', reader: {size: head.length + payloadSize + tail.length, read: (offset, length): Promise<Uint8Array<ArrayBuffer>> => {
        maxRead = Math.max(maxRead, length);
        if (length > CHUNK_BYTES) { throw new Error('unbounded read'); }
        const bytes = new Uint8Array(length).fill(65);
        for (const [start, source] of [[0, head], [head.length + payloadSize, tail]] as const) {
          const from = Math.max(offset, start);
          const to = Math.min(offset + length, start + source.length);
          if (from < to) { bytes.set(source.subarray(from - start, to - start), from - offset); }
        }
        return Promise.resolve(bytes);
      }}}
    ];
    try {
      const prepared = await prepareComposition(await inspectInputs(inputs, context), inputs, context);
      const artifact = await generateResult(prepared, storage, context);
      postMessage({artifact, resources: prepared.plan.resources, maxRead});
    } catch(error) { await storage.dispose(); postMessage({diagnostic: diagnose(error), jobId, maxRead}); }
  })().catch(error => postMessage({error: String(error)}));
});
