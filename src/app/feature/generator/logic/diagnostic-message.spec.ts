import {describe, expect, it} from 'vitest';

import en from '~bhw/core/i18n/en.json';
import itCatalog from '~bhw/core/i18n/it.json';
import {Diagnostic} from '~bhw/polyglot/model/contract';
import {diagnosticParameters} from '~bhw/polyglot/model/diagnostic-detail';
import {diagnosticMessage, DiagnosticTranslation} from './diagnostic-message';
import {diagnosticReport} from './diagnostics';

const translation = (catalog: object): DiagnosticTranslation => (key, parameters = {}) => {
  const text = key.split('.').reduce<unknown>((value, field) => value && typeof value === 'object' ? (value as Record<string, unknown>)[field] : undefined, catalog);
  if (typeof text !== 'string') { throw new Error(key); }
  return text.replace(/{{(\w+)}}/g, (_, field: string) => String(parameters[field] ?? `MISSING:${field}`));
};

describe('actionable and private diagnostic presentation', () => {
  it.each([en, itCatalog])('formats precise resource limits, role conflicts and safe failed-stage context', catalog => {
    const translate = translation(catalog);
    expect(diagnosticMessage({code: 'FORMAT_RESOURCE_LIMIT', severity: 'error', details: {reason: 'SELECTED_INPUTS', actual: 17, limit: 16}}, translate)).toContain('17');
    expect(diagnosticMessage({code: 'FORMAT_RESOURCE_LIMIT', severity: 'error', details: {reason: 'HTML_TEXT_BYTES', actual: 65 * 1024 ** 2, limit: 64 * 1024 ** 2}}, translate)).toContain('65.00 MiB');
    expect(diagnosticMessage({code: 'ROLE_CONFLICT', severity: 'error', details: {role: 'html', actual: 2}}, translate)).toContain('HTML');
    expect(diagnosticMessage({code: 'IO_FAILURE', severity: 'error', details: {stage: 'pack'}}, translate)).not.toMatch(/MISSING:|messages\./);
    expect(diagnosticMessage({code: 'AUDIO_DECODE_UNAVAILABLE', severity: 'error', details: {reason: 'AUDIO_DECODE', codec: 'opus'}}, translate)).toContain('opus');
  });

  it('exports measured metadata and static explanations while rejecting arbitrary fields, codecs and stages', () => {
    const input: Diagnostic = {code: 'IMAGE_RESOURCE_LIMIT', severity: 'error', inputId: 'private.pdf', details: {reason: 'IMAGE_PIXELS', actual: 100000000, limit: 67108864, width: 10000, height: 10000, path: 'secret/path', content: 'private-content', codec: 'secret-codec', stage: 'secret-stage'}};
    const parameters = diagnosticParameters(input);
    expect(parameters).toEqual({actual: 100000000, limit: 67108864, width: 10000, height: 10000});
    const report = diagnosticReport([input], diagnostic => diagnosticMessage(diagnostic, translation(en)));
    expect(report).toContain('100000000'); expect(report).toContain('67108864');
    expect(report).not.toMatch(/private|secret/);
    expect(diagnosticParameters({...input, details: {actual: NaN, limit: Infinity, width: -1, height: Number.MAX_SAFE_INTEGER + 1}})).toEqual({});
  });
});
