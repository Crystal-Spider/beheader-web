import {describe, expect, it} from 'vitest';

import {WorkerRequest, WorkerResponse} from '../model/contract';
import {WorkerRuntime} from './runtime';

const request = (operation: 'inspect' | 'plan' | 'generate' = 'inspect'): WorkerRequest => ({
  type: 'run', jobId: crypto.randomUUID(), request: {operation, inputs: [{id: 'a', file: new File(['<!doctype html>'], 'x.html')}, {id: 'b', file: new File(['%PDF-1.4'], 'x.pdf')}]}
});

describe('worker runtime', () => {
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
});
