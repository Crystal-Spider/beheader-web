import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {InputSource, ProcessingContext} from '../model/contract';
import {inspectInputs} from './inspect';
import {prepareComposition} from './compose';
import {familyMask, FORMAT_FAMILIES, VERIFIED_COMBINATIONS} from './compatibility';

const context: ProcessingContext = {signal: new AbortController().signal, progress: () => {}};
const source = (id: string, name: string): InputSource => ({id, name, mediaType: '', reader: new BlobInput(new Blob([new Uint8Array(readFileSync(`e2e/fixture/${name}`))]))});

describe('authoritative composition validation', () => {
  it('rejects duplicate media/image roles even when picker filtering is bypassed', async() => {
    for (const name of ['video-aac.mp4', 'transparent.png']) {
      const sources = [source('first', name), source('second', name), source('pdf', 'classic.pdf')];
      const inspection = await inspectInputs(sources, context);
      const prepared = await prepareComposition(inspection, sources, context);
      expect(prepared.plan.ready).toBe(false);
      expect(prepared.plan.diagnostics.map(item => item.code)).toContain('ROLE_CONFLICT');
      expect(prepared.plan.interpretations).toEqual([]);
    }
  });

  it('does not count two archives as two different families', async() => {
    const sources = [source('first', 'first.zip'), source('second', 'second.zip')];
    const prepared = await prepareComposition(await inspectInputs(sources, context), sources, context);
    expect(prepared.plan.diagnostics.map(item => item.code)).toContain('MINIMUM_FAMILIES');
  });

  it('keeps the advertised family matrix limited to the 26 independently checked subsets', () => {
    expect(VERIFIED_COMBINATIONS).toHaveLength(26);
    for (let mask = 0; mask < 32; mask++) {
      const families = FORMAT_FAMILIES.filter((_, index) => mask & (1 << index));
      expect(VERIFIED_COMBINATIONS.includes(familyMask(families))).toBe(families.length >= 2);
    }
  });
});
