import {describe, expect, it, vi} from 'vitest';

import {InputSource, ProcessingContext} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {CHUNK_BYTES, INPUT_LIMIT, TOTAL_INPUT_LIMIT, validRange} from '../io/bytes';
import {inspectInputs} from './inspect';
import {generateResult, planComposition} from './compose';

const context = (): ProcessingContext => ({signal: new AbortController().signal, progress: vi.fn()});
const source = (id: string, name: string, contents: BlobPart[], role?: InputSource['role']): InputSource => ({
  id, name, mediaType: '', reader: new BlobInput(new Blob(contents)), ...(role ? {role} : {})
});
const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

describe('inspection and role planning', () => {
  it('checks all input and aggregate sizes before the first read', async() => {
    const read = vi.fn();
    const large = (id: string, size: number): InputSource => ({id, name: '', mediaType: '', reader: {size, read}});
    const oversized = await inspectInputs([large('a', INPUT_LIMIT + 1)], context());
    expect(oversized.diagnostics.map(item => item.code)).toEqual(['INPUT_TOO_LARGE']);
    const total = await inspectInputs([large('a', INPUT_LIMIT), large('b', INPUT_LIMIT), large('c', 1)], context());
    expect(total.diagnostics.map(item => item.code)).toEqual(['TOTAL_TOO_LARGE']);
    for (const size of [-1, NaN, Infinity, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
      expect((await inspectInputs([large('a', size)], context())).diagnostics[0]?.code).toBe('INVALID_SIZE');
    }
    expect(read).not.toHaveBeenCalled();
  });

  it('accepts the exact 1 GiB/2 GiB boundaries through bounded seekable reads', async() => {
    const read = vi.fn((offset: number, length: number) => {
      expect(length).toBeLessThanOrEqual(CHUNK_BYTES);
      expect(validRange(offset, length, INPUT_LIMIT)).toBe(true);
      return Promise.resolve(new Uint8Array(length));
    });
    const sources: InputSource[] = ['a', 'b'].map(id => ({id, name: 'large.bin', mediaType: '', role: 'appendable', reader: {size: INPUT_LIMIT, read}}));
    const result = await inspectInputs(sources, context());
    expect(result.diagnostics).toEqual([]);
    expect(result.inputs.reduce((total, input) => total + input.size, 0)).toBe(TOTAL_INPUT_LIMIT);
    expect(read.mock.calls).toEqual([[0, 65536, expect.any(AbortSignal)], [INPUT_LIMIT - 65557, 65557, expect.any(AbortSignal)], [0, 65536, expect.any(AbortSignal)], [INPUT_LIMIT - 65557, 65557, expect.any(AbortSignal)]]);
  });

  it.each([
    ['x.png', png, 'image'],
    ['x.mp4', new Uint8Array([0, 0, 0, 16, 102, 116, 121, 112]), 'media'],
    ['x.mp3', new TextEncoder().encode('ID3'), 'media'],
    ['x.wav', new TextEncoder().encode('RIFF1234WAVE'), 'media'],
    ['x.ogg', new TextEncoder().encode('OggS'), 'media'],
    ['x.html', new TextEncoder().encode('\ufeff<!doctype html><title>è</title>'), 'html'],
    ['x.pdf', new TextEncoder().encode('%PDF-1.4'), 'pdf'],
    ['x.docx', new Uint8Array([80, 75, 3, 4]), 'archive']
  ] as const)('detects %s without declaring structural compatibility', async(name, bytes, family) => {
    const result = await inspectInputs([source('a', name, [bytes])], context());
    expect(result.inputs[0]?.role).toBe(family);
    expect(result.inputs[0]?.candidates.some(candidate => candidate.evidence === 'signature')).toBe(true);
    const plan = planComposition(result, context());
    expect(plan.ready).toBe(false);
    expect(plan.interpretations).toEqual([]);
    expect(plan.diagnostics.map(item => item.code)).toContain('IMPLEMENTATION_UNAVAILABLE');
  });

  it('detects appended ZIP end records using a tail read and requires a role choice', async() => {
    const bytes = new Uint8Array(70000);
    bytes.set(png);
    bytes.set([80, 75, 5, 6], bytes.length - 22);
    const result = await inspectInputs([source('a', 'polyglot.bin', [bytes])], context());
    expect(result.inputs[0]?.candidates.map(candidate => candidate.family)).toEqual(['image', 'archive']);
    expect(result.inputs[0]?.role).toBeNull();
    expect(result.diagnostics[0]?.code).toBe('INPUT_AMBIGUOUS');
  });

  it('allows explicit reassignment after conflicting extension/signature detection', async() => {
    const ambiguous = await inspectInputs([source('a', 'wrong.pdf', [png])], context());
    expect(ambiguous.inputs[0]?.role).toBeNull();
    expect(ambiguous.diagnostics[0]?.code).toBe('INPUT_AMBIGUOUS');
    const chosen = await inspectInputs([source('a', 'wrong.pdf', [png], 'image')], context());
    expect(chosen.inputs[0]?.role).toBe('image');
    expect(chosen.diagnostics.map(item => item.code)).toEqual(['ROLE_REASSIGNED']);
  });

  it('keeps metadata hints distinct from signature evidence and rejects unknown/empty inputs', async() => {
    const result = await inspectInputs([source('a', 'fake.png', ['hello']), source('b', 'empty.bin', [])], context());
    expect(result.diagnostics.map(item => item.code)).toEqual(['INPUT_HINT_ONLY', 'INPUT_EMPTY', 'INPUT_UNKNOWN']);
  });

  it('allows multiple archives, but only one input in each other interpretation slot', async() => {
    const result = await inspectInputs([
      source('a', 'a.png', [png]), source('b', 'b.png', [png]),
      source('c', 'c.zip', ['PK\x03\x04']), source('d', 'd.zip', ['PK\x03\x04'])
    ], context());
    const plan = planComposition(result, context());
    expect(plan.families).toEqual(['image', 'archive']);
    expect(plan.diagnostics.filter(item => item.code === 'ROLE_CONFLICT')).toEqual([{code: 'ROLE_CONFLICT', severity: 'error', details: {role: 'image'}}]);
    expect(plan.inputs.map(input => input.id)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('excludes auxiliary roles from family counts and requires HTML for an asset ZIP', async() => {
    const result = await inspectInputs([
      source('a', 'a.pdf', ['%PDF-1.4']), source('b', 'assets.zip', ['PK\x03\x04'], 'html-assets'),
      source('c', 'c.bin', ['x'], 'appendable'), source('d', 'd.bin', ['y'], 'extra-header')
    ], context());
    const plan = planComposition(result, context());
    expect(plan.families).toEqual(['pdf']);
    expect(plan.diagnostics.map(item => item.code)).toEqual(expect.arrayContaining(['MINIMUM_FAMILIES', 'MISSING_HTML', 'IMPLEMENTATION_UNAVAILABLE']));
    expect(() => generateResult(plan, context())).toThrow();
  });

  it('cancels before reading and rejects duplicate IDs without reading', async() => {
    const input = source('a', 'a.png', [png]);
    const controller = new AbortController();
    controller.abort();
    await expect(inspectInputs([input], {...context(), signal: controller.signal})).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
    expect((await inspectInputs([input, input], context())).diagnostics[0]?.code).toBe('INVALID_REQUEST');
  });
});
