import {describe, expect, it} from 'vitest';

import {CompositionPlan, JobProgress} from '~bhw/polyglot/model/contract';
import {overallProgress} from './progress';

const mib = 1024 ** 2;
const plan: CompositionPlan = {
  inputs: [
    {id: 'audio', name: 'long.mp3', role: 'media', size: 20 * mib, candidates: [{family: 'media', format: 'mp3', evidence: 'signature'}]},
    {id: 'archive', name: 'small.zip', role: 'archive', size: 1000, candidates: []}
  ],
  families: ['media', 'archive'], interpretations: [], diagnostics: [], ready: true,
  archives: [{inputId: 'archive', entries: 2, expandedSize: 100}]
};
const event = (stage: JobProgress['stage'], completed: number): JobProgress => ({stage, completed, total: 100, unit: 'bytes'});

describe('work estimates for differently sized compositions', () => {
  it('allocates most long-audio work to conversion instead of tiny archive and copy steps', () => {
    const start = overallProgress(event('convert', 0), 'generate', plan);
    const halfway = overallProgress(event('convert', 50), 'generate', plan);
    const end = overallProgress(event('convert', 100), 'generate', plan);
    expect(start).toBeLessThan(12);
    expect(halfway).toBeGreaterThan(45);
    expect(end).toBeGreaterThan(90);
    expect(end).toBeLessThan(99);
  });

  it('reserves substantial measured work for large expanded archives', () => {
    const large = {...plan, archives: [{inputId: 'archive', entries: 2, expandedSize: 500 * mib}]};
    const packed = overallProgress(event('pack', 100), 'generate', large) - overallProgress(event('pack', 0), 'generate', large);
    expect(packed).toBeGreaterThan(45);
    expect(overallProgress(event('convert', 100), 'generate', large)).toBeLessThan(30);
  });

  it('keeps unknown or zero-sized work finite and never declares completion before a result', () => {
    for (const current of [null, {...plan, inputs: [], archives: []}]) {
      for (const stage of ['inspect', 'plan', 'convert', 'generate', 'extract', 'pack', 'cleanup'] as const) {
        const value = overallProgress({...event(stage, 0), total: 0}, 'generate', current);
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(100);
      }
    }
  });
});
