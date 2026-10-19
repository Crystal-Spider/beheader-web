import {CompositionPlan, JobProgress} from '~bhw/polyglot/model/contract';

/**
 * Size-weighted phase costs keep overall progress monotonic while individual counters restart.
 * They describe work, not predicted wall time; remaining time is estimated only within the current step.
 * @param {JobProgress} progress Measured current-step work.
 * @param {'refresh' | 'generate' | null} operation User operation spanning one or more worker requests.
 * @param {(Pick<CompositionPlan, 'inputs' | 'families'> & Partial<Pick<CompositionPlan, 'archives'>>) | null} plan Known optional conversion/archive steps.
 * @returns {number} Estimated overall percentage, reserving completion for the terminal result.
 */
export function overallProgress(progress: JobProgress, operation: 'refresh' | 'generate' | null, plan: (Pick<CompositionPlan, 'inputs' | 'families'> & Partial<Pick<CompositionPlan, 'archives'>>) | null): number {
  const archives = !!plan?.families.includes('archive');
  const audio = !!plan?.inputs.some(input => input.role === 'media' && input.candidates.some(candidate => ['mp3', 'wav', 'ogg', 'aac'].includes(candidate.format)));
  // Conversion and compression cost more than bounded copying; tiny archives must not reserve half an audio job.
  const mib = 1024 ** 2;
  const mediaBytes = plan?.inputs.filter(input => input.role === 'media').reduce((sum, input) => sum + input.size, 0) ?? 0;
  const copyBytes = plan?.inputs.filter(input => input.role !== 'archive' && input.role !== 'html-assets').reduce((sum, input) => sum + input.size, 0) ?? 0;
  const expandedBytes = plan?.archives?.reduce((sum, archive) => sum + archive.expandedSize, 0) ?? plan?.inputs.filter(input => input.role === 'archive').reduce((sum, input) => sum + input.size * 4, 0) ?? 0;
  const conversion = audio ? Math.max(mib, mediaBytes * 32) : 0;
  const copying = Math.max(mib / 4, copyBytes);
  const extraction = archives ? Math.max(mib / 16, expandedBytes * 2) : 0;
  const packing = archives ? Math.max(mib / 16, expandedBytes * 4) : 0;
  const planning = Math.max(mib / 8, (conversion + copying + extraction + packing) / 9);
  const steps: readonly (readonly [JobProgress['stage'], number])[] = operation === 'generate'
    ? [['inspect', mib / 32], ['plan', planning], ...(audio ? [['convert', conversion] as const] : []), ['generate', copying], ...(archives ? [['extract', extraction] as const, ['pack', packing] as const] : []), ['cleanup', mib / 32]]
    : [['inspect', 100]];
  const index = steps.findIndex(([stage]) => stage === progress.stage);
  if (index < 0) { return 0; }
  const total = steps.reduce((sum, [, cost]) => sum + cost, 0);
  const before = steps.slice(0, index).reduce((sum, [, cost]) => sum + cost, 0);
  const fraction = progress.total ? Math.min(1, Math.max(0, progress.completed / progress.total)) : 0;
  return Math.min(99, 100 * (before + fraction * steps[index]![1]) / total);
}

/**
 * @param {number} milliseconds Elapsed or estimated time.
 * @returns {string} Compact locale-neutral clock.
 */
export function progressTime(milliseconds: number): string {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  return seconds >= 3600 ? `${Math.floor(seconds / 3600)}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}` : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
