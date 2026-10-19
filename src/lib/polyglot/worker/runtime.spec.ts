import {describe, expect, it} from 'vitest';

import {WorkerRequest, WorkerResponse} from '../model/contract';
import {WorkerRuntime} from './runtime';

const request = (operation: 'inspect' | 'plan' | 'generate' = 'inspect'): WorkerRequest => ({
  type: 'run', jobId: crypto.randomUUID(), request: {operation, inputs: [{id: 'a', file: new File(['<!doctype html>'], 'x.html')}, {id: 'b', file: new File(['%PDF-1.4'], 'x.pdf')}]}
});

describe('worker runtime', () => {
  it('rejects the removed entry-path customization at the worker boundary', async() => {
    const messages: WorkerResponse[] = [];
    const message = request('plan');
    if (message.type !== 'run') { throw new Error('Expected run'); }
    await new WorkerRuntime(response => { messages.push(response); }).receive({...message, request: {...message.request, options: {htmlPath: 'site/index.html'}}});
    expect(messages).toEqual([{type: 'failed', jobId: message.jobId, diagnostic: {code: 'INVALID_REQUEST', severity: 'error'}}]);
  });
  it('runs inspection and planning without claiming successful generation', async() => {
    const messages: WorkerResponse[] = [];
    const runtime = new WorkerRuntime(message => { messages.push(message); });
    await runtime.receive(request());
    expect(messages.at(-1)).toMatchObject({type: 'complete', result: {operation: 'inspect', inspection: {inputs: [{role: 'html'}, {role: 'pdf'}]}}});
    await runtime.receive(request('plan'));
    expect(messages.at(-1)).toMatchObject({type: 'complete', result: {operation: 'plan', plan: {ready: false, families: ['html', 'pdf'], interpretations: []}}});
    await runtime.receive(request('generate'));
    expect(messages.at(-1)).toMatchObject({type: 'failed', diagnostic: {code: 'PDF_INVALID'}});
  });

  it('handles cooperative cancellation, busy requests, and retry', async() => {
    const messages: WorkerResponse[] = [];
    const runtime = new WorkerRuntime(message => { messages.push(message); });
    const first = request();
    const running = runtime.receive(first);
    await runtime.receive(request());
    expect(messages.at(-1)).toMatchObject({type: 'failed', diagnostic: {code: 'JOB_BUSY'}});
    await runtime.receive({type: 'cancel', jobId: first.jobId});
    await running;
    expect(messages.at(-1)).toMatchObject({type: 'failed', diagnostic: {code: 'CANCELLED'}});
    await runtime.receive(request());
    expect(messages.at(-1)?.type).toBe('complete');
  });

  it.each([null, {}, {type: 'run', jobId: '../other-app'}, {type: 'run', jobId: crypto.randomUUID(), request: {operation: 'inspect', inputs: [{id: 'a', file: 'not a file'}]}}])('rejects malformed protocol data: %j', async message => {
    const messages: WorkerResponse[] = [];
    await new WorkerRuntime(response => { messages.push(response); }).receive(message);
    expect(messages.at(-1)).toMatchObject({type: 'failed', diagnostic: {code: 'INVALID_REQUEST'}});
  });

  it.each(['appendable', 'extra-header'])('rejects the removed %s input role at the worker boundary', async role => {
    const messages: WorkerResponse[] = [];
    const message = {type: 'run', jobId: crypto.randomUUID(), request: {operation: 'generate', inputs: [{id: 'a', file: new File(['data'], 'payload.bin'), role}]}};
    await new WorkerRuntime(response => { messages.push(response); }).receive(message);
    expect(messages).toEqual([{type: 'failed', jobId: message.jobId, diagnostic: {code: 'INVALID_REQUEST', severity: 'error'}}]);
  });
});
