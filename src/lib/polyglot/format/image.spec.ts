import {readFileSync} from 'node:fs';
import {describe, expect, it, vi} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {ProcessingContext} from '../model/contract';
import {inspectImage} from './image';
import {inspectHtml} from './html';

const context = (): ProcessingContext => ({signal: new AbortController().signal, progress: vi.fn()});
const fixture = (name: string): Uint8Array<ArrayBuffer> => new Uint8Array(readFileSync(new URL(`../../../../e2e/fixture/${name}`, import.meta.url)));
const reader = (bytes: BlobPart) => new BlobInput(new Blob([bytes]));

describe('static raster validation', () => {
  it.each([
    ['transparent.png', 'png'], ['static.jpg', 'jpeg'], ['static.gif', 'gif'], ['static.webp', 'webp'], ['static.bmp', 'bmp']
  ])('accepts a complete static %s', async(name, format) => {
    expect(await inspectImage(reader(fixture(name)), context())).toEqual({width: 32, height: 24, format});
  });

  it.each(['animated.png', 'animated.gif', 'animated.webp'])('rejects animation in %s before decoding', async name => {
    await expect(inspectImage(reader(fixture(name)), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_ANIMATED'}});
  });

  it('rejects unsupported static TIFF and multipage TIFF/ICO/MPO without flattening', async() => {
    await expect(inspectImage(reader(fixture('static.tiff')), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_UNSUPPORTED'}});
    await expect(inspectImage(reader(fixture('animated.tiff')), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_MULTIPAGE'}});
    await expect(inspectImage(reader(new Uint8Array([0, 0, 1, 0, 2, 0])), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_MULTIPAGE'}});
    const first = fixture('static.jpg');
    await expect(inspectImage(reader(new Uint8Array([...first, ...first])), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_MULTIPAGE'}});
    const mpo = new Uint8Array([...first.slice(0, 2), 255, 226, 0, 6, 77, 80, 70, 0, ...first.slice(2)]);
    await expect(inspectImage(reader(mpo), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_MULTIPAGE'}});
  });

  it('rejects oversized decoded dimensions and malformed/truncated structures', async() => {
    const large = fixture('transparent.png');
    new DataView(large.buffer).setUint32(16, 50000);
    await expect(inspectImage(reader(large), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_RESOURCE_LIMIT'}});
    const malformed = fixture('transparent.png');
    new DataView(malformed.buffer).setUint32(8, malformed.length);
    await expect(inspectImage(reader(malformed), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_INVALID'}});
    await expect(inspectImage(reader(fixture('static.gif').slice(0, -1)), context())).rejects.toThrow();
    await expect(inspectImage(reader(fixture('static.webp').slice(0, -1)), context())).rejects.toThrow();
  });

  it('checks inner GIF/WebP dimensions before a decoder could allocate a larger frame', async() => {
    const gif = fixture('static.gif');
    gif[6] = 1;
    gif[7] = 0;
    await expect(inspectImage(reader(gif), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_INVALID'}});
    const webp = fixture('static.webp');
    const vp8x = new Uint8Array([86, 80, 56, 88, 10, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const extended = new Uint8Array([...webp.slice(0, 12), ...vp8x, ...webp.slice(12)]);
    new DataView(extended.buffer).setUint32(4, extended.length - 8, true);
    await expect(inspectImage(reader(extended), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_INVALID'}});
  });
});

describe('bounded HTML encoding validation', () => {
  it('preserves UTF-8 including split multibyte sequences and detects an optional BOM', async() => {
    const bytes = new Uint8Array(1024 * 1024 + 4).fill(32);
    bytes.set(new TextEncoder().encode('è🙂'), 1024 * 1024 - 2);
    expect(await inspectHtml(reader(bytes), context())).toBe(0);
    expect(await inspectHtml(reader(new Uint8Array([239, 187, 191, 65])), context())).toBe(3);
  });

  it('rejects malformed UTF-8, NUL/UTF-16, and truncated character sequences', async() => {
    for (const bytes of [[255, 254, 65, 0], [65, 0, 66], [195]]) {
      await expect(inspectHtml(reader(new Uint8Array(bytes)), context())).rejects.toMatchObject({diagnostic: {code: 'HTML_ENCODING'}});
    }
  });
});
