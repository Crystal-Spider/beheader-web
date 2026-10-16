import {Diagnostic} from '~bhw/polyglot/model/contract';

/**
 * Allowlisted diagnostic export intentionally excludes names, paths, URLs, details, and file bytes.
 * @param {readonly Diagnostic[]} diagnostics Safe core outcomes.
 * @returns {string} Small human-readable downloadable report.
 */
export function diagnosticReport(diagnostics: readonly Diagnostic[]): string {
  return JSON.stringify({application: 'beheader-web', version: '0.1.0', browser: navigator.userAgent, diagnostics: diagnostics.slice(0, 30).map(({code, severity}) => ({code, severity}))}, null, 2);
}

/**
 * Keeps the prefilled issue within a conservative URL budget; longer reports are downloaded separately.
 * @param {readonly Diagnostic[]} diagnostics Current failure codes.
 * @returns {string} User-initiated GitHub issue URL.
 */
export function issueUrl(diagnostics: readonly Diagnostic[]): string {
  const codes = [...new Set(diagnostics.map(item => item.code))].slice(0, 8).join(', ');
  return `https://github.com/Crystal-Spider/beheader-web/issues/new?${new URLSearchParams({title: 'Generation issue', body: `Beheader Web 0.1.0\nDiagnostic codes: ${codes}\n\nWhat happened?\n\nPlease review and attach the downloaded diagnostics if useful. Do not attach private input files.`})}`;
}

/**
 * Restricts downloaded base names to a short portable value without changing input metadata.
 * @param {string} name User preference.
 * @returns {string} Safe base name.
 */
export function outputName(name: string): string { return Array.from(name, character => character.charCodeAt(0) < 32 ? '_' : character).join('').replace(/[<>:"/\\|?*]/g, '_').replace(/[. ]+$/, '').slice(0, 100) || 'polyglot'; }
