import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

import {InputSource} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {inspectInputs} from './inspect';
import {inspectSelectedArchives} from './inspect-archives';

const context = (): {signal: AbortSignal; progress: () => void} => ({signal: new AbortController().signal, progress: () => {}});
const source = (id: string, role: InputSource['role'] = 'archive'): InputSource => ({id, name: `${id}.zip`, mediaType: '', role, reader: new BlobInput(new Blob([readFileSync(`e2e/fixture/${id}.zip`)]))});

describe('early archive feedback', () => {
  it('reports the ordered winner before generation and excludes HTML assets', async() => {
    const sources = [source('first'), source('second')];
    const check = async(selected: InputSource[]): Promise<Awaited<ReturnType<typeof inspectSelectedArchives>>> => inspectSelectedArchives(await inspectInputs(selected, context()), selected, context());
    const initial = await check(sources);
    expect(initial.diagnostics).toContainEqual({code: 'ARCHIVE_COLLISION', severity: 'warning', details: {count: 1}});
    expect(initial.collisions).toEqual([{path: 'shared.txt', earlierInputId: 'first', laterInputId: 'second'}]);
    expect((await check([...sources].reverse())).collisions?.[0]?.laterInputId).toBe('first');
    expect((await check([source('first'), source('second', 'html-assets')])).collisions).toEqual([]);
    expect((await check([source('first')])).diagnostics).toEqual([]);
  });

  it('does not read archive payloads, and surfaces malformed indexes safely', async() => {
    const original = source('first');
    const ranges: [number, number][] = [];
    const selected = {...original, reader: {size: original.reader.size, read: (offset: number, length: number, signal: AbortSignal) => { ranges.push([offset, length]); return original.reader.read(offset, length, signal); }}};
    const inspection = await inspectInputs([selected], context());
    ranges.length = 0;
    await inspectSelectedArchives(inspection, [selected], context());
    // zip.js reads bounded metadata; no entry extraction or decompression is requested.
    expect(ranges.length).toBeGreaterThan(0);
    expect(ranges.every(([, length]) => length <= 65557)).toBe(true);
    const invalid = {...original, reader: new BlobInput(new Blob(['PK\x03\x04bad']))};
    const result = await inspectSelectedArchives(await inspectInputs([invalid], context()), [invalid], context());
    expect(result.diagnostics).toContainEqual({code: 'ARCHIVE_INVALID', severity: 'error', inputId: 'first', details: {reason: 'ZIP_HEADER'}});
  });

  it('checks an HTML asset ZIP index early while keeping it outside the archive merge', async() => {
    const assets = source('first', 'html-assets');
    const bytes = new Uint8Array(readFileSync('e2e/fixture/first.zip'));
    const end = Buffer.from(bytes).lastIndexOf('PK\x05\x06');
    new DataView(bytes.buffer).setUint16(end + 10, 65535, true);
    new DataView(bytes.buffer).setUint16(end + 8, 65535, true);
    const invalid = {...assets, reader: new BlobInput(new Blob([bytes]))};
    const result = await inspectSelectedArchives(await inspectInputs([invalid], context()), [invalid], context());
    expect(result.diagnostics).toContainEqual({code: 'ARCHIVE_UNSUPPORTED', severity: 'error', inputId: 'first', details: {reason: 'ZIP64'}});
    expect(result.collisions).toEqual([]);
  });
});
