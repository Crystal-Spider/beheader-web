import {FormatFamily} from '../model/contract';

/** Counted families, independent of optional payloads and asset archives. */
export const FORMAT_FAMILIES: readonly FormatFamily[] = ['image', 'media', 'html', 'pdf', 'archive'];

/** Explicit masks with reproducible M5 fixture evidence; adding a family does not silently advertise it. */
export const VERIFIED_COMBINATIONS: readonly number[] = [3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

/**
 * @param {readonly FormatFamily[]} families Selected independent interpretations.
 * @returns {number} Stable matrix mask.
 */
export function familyMask(families: readonly FormatFamily[]): number {
  return families.reduce((mask, family) => mask | (1 << FORMAT_FAMILIES.indexOf(family)), 0);
}

/**
 * @param {readonly FormatFamily[]} families Current families, including a prospective addition.
 * @returns {boolean} Whether a verified composition can contain this selection, allowing incomplete singletons.
 */
export function canCompleteComposition(families: readonly FormatFamily[]): boolean {
  const mask = familyMask(families);
  return VERIFIED_COMBINATIONS.some(verified => (verified & mask) === mask);
}
