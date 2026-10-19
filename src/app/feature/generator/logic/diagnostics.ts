import {Diagnostic} from '~bhw/polyglot/model/contract';
import {detailReason, diagnosticParameters} from '~bhw/polyglot/model/diagnostic-detail';
import {version} from '../../../../../package.json';

/**
 * Exports fixed codes, allowlisted reasons and measured context; excludes names, paths and file bytes.
 * @param {readonly Diagnostic[]} diagnostics Safe core outcomes.
 * @param {(diagnostic: Diagnostic) => string} explain Optional catalog lookup, receiving only sanitized details.
 * @returns {string} Small human-readable downloadable report.
 */
export function diagnosticReport(diagnostics: readonly Diagnostic[], explain?: (diagnostic: Diagnostic) => string): string {
  return JSON.stringify({application: 'beheader-web', version, browser: navigator.userAgent, diagnostics: diagnostics.slice(0, 30).map(item => {
    const reason = detailReason(item); const context = diagnosticParameters(item);
    const safe = {code: item.code, severity: item.severity, details: {...context, ...(reason ? {reason} : {})}};
    return {code: item.code, severity: item.severity, ...(reason ? {reason} : {}), ...(Object.keys(context).length ? {context} : {}), ...(explain ? {message: explain(safe)} : {})};
  })}, null, 2);
}

/**
 * Keeps the prefilled issue within a conservative URL budget; longer reports are downloaded separately.
 * @param {readonly Diagnostic[]} diagnostics Current failure codes.
 * @returns {string} User-initiated GitHub issue URL.
 */
export function issueUrl(diagnostics: readonly Diagnostic[]): string {
  const codes = [...new Set(diagnostics.map(item => `${item.code}${detailReason(item) ? ` (${detailReason(item)})` : ''}`))].slice(0, 8).join(', ');
  return `https://github.com/Crystal-Spider/beheader-web/issues/new?${new URLSearchParams({title: 'Generation issue', body: `Beheader Web ${version}\nDiagnostic codes: ${codes}\n\nWhat happened?\n\nPlease review and attach the downloaded diagnostics if useful. Do not attach private input files.`})}`;
}

/**
 * Restricts downloaded base names to a short portable value without changing input metadata.
 * @param {string} name User preference.
 * @returns {string} Safe base name.
 */
export function outputName(name: string): string { return Array.from(name, character => character.charCodeAt(0) < 32 ? '_' : character).join('').replace(/[<>:"/\\|?*]/g, '_').replace(/[. ]+$/, '').slice(0, 100) || 'polyglot'; }
