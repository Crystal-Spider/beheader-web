import {SeekableInput} from '../model/contract';

/**
 * Estimates unique byte coverage with at most 16 KiB of metadata, including sparse and repeated reads.
 * A tail seek counts only its bins, rather than pretending that the whole file was scanned.
 * @param {SeekableInput} input Bounded original source.
 * @param {(fraction: number) => void} progress Approximate coverage, capped below completion until validation succeeds.
 * @returns {SeekableInput} The same bounded reads with lightweight progress accounting.
 */
export function withReadProgress(input: SeekableInput, progress: (fraction: number) => void): SeekableInput {
  const bins = new Uint8Array(Math.min(16384, Math.max(1, Math.ceil(input.size / 65536))));
  const width = Math.max(1, input.size / bins.length);
  let covered = 0;
  return {size: input.size, read: async(offset, length, signal) => {
    const bytes = await input.read(offset, length, signal);
    const before = covered;
    for (let index = Math.floor(offset / width); bytes.length && index <= Math.min(bins.length - 1, Math.floor((offset + bytes.length - 1) / width)); index++) {
      if (!bins[index]) { bins[index] = 1; covered++; }
    }
    if (covered !== before) { progress(Math.min(0.99, covered / bins.length)); }
    return bytes;
  }};
}
