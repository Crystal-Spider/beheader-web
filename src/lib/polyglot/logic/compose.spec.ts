import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {InputSource, JobProgress, ProcessingContext} from '../model/contract';
import {inspectInputs} from './inspect';
import {prepareComposition} from './compose';
import {familyMask, FORMAT_FAMILIES, VERIFIED_COMBINATIONS} from './compatibility';
import {ProcessingError} from './diagnostic';

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

  it('never advertises an interpretation when preparation encounters a blocking storage warning', async() => {
    const sources = [source('pdf', 'classic.pdf'), source('archive', 'first.zip')];
    const inspection = await inspectInputs(sources, context);
    const blocked = sources.map(input => input.id === 'pdf' ? {...input, reader: {size: input.reader.size, read: () => Promise.reject(new ProcessingError({code: 'STORAGE_FULL', severity: 'error'}))}} : input);
    const prepared = await prepareComposition(inspection, blocked, context);
    expect(prepared.plan.ready).toBe(false);
    expect(prepared.plan.interpretations).toEqual([]);
    expect(prepared.plan.diagnostics).toContainEqual({code: 'STORAGE_FULL', severity: 'warning', inputId: 'pdf'});
  });

  it('keeps the advertised family matrix limited to the 26 independently checked subsets', () => {
    expect(VERIFIED_COMBINATIONS).toHaveLength(26);
    for (let mask = 0; mask < 32; mask++) {
      const families = FORMAT_FAMILIES.filter((_, index) => mask & (1 << index));
      expect(VERIFIED_COMBINATIONS.includes(familyMask(families))).toBe(families.length >= 2);
    }
  });

  it('identifies every selected format while checking compatibility', async() => {
    const sources = [source('image', 'transparent.png'), source('media', 'video-aac.mp4'), source('pdf', 'classic.pdf'), source('archive', 'first.zip'), {id: 'html', name: 'page.html', mediaType: 'text/html', reader: new BlobInput(new Blob(['<!doctype html><p>Local</p>']))}];
    const events: JobProgress[] = [];
    const monitored = {...context, progress: (event: JobProgress) => { events.push(event); }};
    const prepared = await prepareComposition(await inspectInputs(sources, monitored), sources, monitored);
    expect(prepared.plan.ready).toBe(true);
    const details = new Set(events.map(event => event.detail));
    for (const detail of ['input-types', 'image-structure', 'media-structure', 'pdf-structure', 'archive-index', 'html-encoding', 'html-assets']) { expect(details.has(detail as JobProgress['detail'])).toBe(true); }
  });
});
