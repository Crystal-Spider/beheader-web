import {CompositionPlan, FormatFamily, Inspection, ProcessingContext} from '../model/contract';
import {checkCancelled, ProcessingError} from './diagnostic';

/** Counted families, independent of optional payloads and asset archives. */
export const FORMAT_FAMILIES: readonly FormatFamily[] = ['image', 'media', 'html', 'pdf', 'archive'];

/**
 * Checks role cardinality without advertising combinations before fixture validation.
 * @param {Inspection} inspection Current input metadata and role decisions.
 * @param {ProcessingContext} context Cancellation and progress.
 * @returns {CompositionPlan} Explicitly unavailable until a format implementation exists.
 */
export function planComposition(inspection: Inspection, context: ProcessingContext): CompositionPlan {
  checkCancelled(context.signal);
  const diagnostics = [...inspection.diagnostics];
  const roles = inspection.inputs.map(input => input.role);
  const families = FORMAT_FAMILIES.filter(family => roles.includes(family));
  for (const role of ['image', 'media', 'html', 'pdf', 'html-assets', 'extra-header'] as const) {
    if (roles.filter(value => value === role).length > 1) {
      diagnostics.push({code: 'ROLE_CONFLICT', severity: 'error', details: {role}});
    }
  }
  if (roles.includes('html-assets') && !roles.includes('html')) {
    diagnostics.push({code: 'MISSING_HTML', severity: 'error'});
  }
  if (families.length < 2) { diagnostics.push({code: 'MINIMUM_FAMILIES', severity: 'error'}); }
  diagnostics.push({code: 'IMPLEMENTATION_UNAVAILABLE', severity: 'error'});
  context.progress({stage: 'plan', completed: inspection.inputs.length, total: inspection.inputs.length, unit: 'inputs'});
  checkCancelled(context.signal);
  return {inputs: inspection.inputs, diagnostics, families, interpretations: [], ready: false};
}

/**
 * The generation boundary exists now; format writers begin in Milestone 4.
 * @param {CompositionPlan} plan Validated proposed composition.
 * @param {ProcessingContext} context Job cancellation/progress.
 * @returns {never} Always reports unfinished implementation in this milestone.
 */
export function generateResult(plan: CompositionPlan, context: ProcessingContext): never {
  checkCancelled(context.signal);
  throw new ProcessingError(plan.diagnostics.find(diagnostic => diagnostic.severity === 'error')
    ?? {code: 'IMPLEMENTATION_UNAVAILABLE', severity: 'error'});
}
