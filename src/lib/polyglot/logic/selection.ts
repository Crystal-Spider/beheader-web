import {Inspection, SelectionCheck} from '../model/contract';
import {blocksGeneration} from './diagnostic';
import {familyMask, FORMAT_FAMILIES, VERIFIED_COMBINATIONS} from './compatibility';

/**
 * Checks only detected roles and supported combinations, without opening format structures.
 * @param {Inspection} inspection Bounded signature detection and static input checks.
 * @returns {SelectionCheck} Provisional readiness to attempt full validation and generation.
 */
export function checkSelection(inspection: Inspection): SelectionCheck {
  const diagnostics = [...inspection.diagnostics];
  const roles = inspection.inputs.map(input => input.role);
  const families = FORMAT_FAMILIES.filter(family => roles.includes(family));
  for (const role of ['image', 'media', 'html', 'pdf', 'html-assets'] as const) {
    const count = roles.filter(value => value === role).length;
    if (count > 1) { diagnostics.push({code: 'ROLE_CONFLICT', severity: 'error', details: {role, actual: count, limit: 1}}); }
  }
  if (roles.includes('html-assets') && !roles.includes('html')) { diagnostics.push({code: 'MISSING_HTML', severity: 'error'}); }
  if (families.length < 2) { diagnostics.push({code: 'MINIMUM_FAMILIES', severity: 'info'}); }
  if (families.length >= 2 && !VERIFIED_COMBINATIONS.includes(familyMask(families))) { diagnostics.push({code: 'COMBINATION_UNSUPPORTED', severity: 'error'}); }
  return {...inspection, diagnostics, families, canCombine: !diagnostics.some(blocksGeneration)};
}
