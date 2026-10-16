import {describe, expect, it} from 'vitest';

import en from '../i18n/en.json';
import itCatalog from '../i18n/it.json';
import {DiagnosticCode} from '~bhw/polyglot/model/contract';

/**
 * Flatten catalog paths to catch untranslated additions and mismatched parameters.
 * @param {object} catalog Nested translation catalog.
 * @param {string} prefix Parent path.
 * @returns {Record<string, string>} Leaf messages by translation key.
 */
function messages(catalog: object, prefix = ''): Record<string, string> {
  return Object.fromEntries(Object.entries(catalog).flatMap(([key, value]: [string, unknown]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'string' ? [[path, value]] : Object.entries(messages(value as object, path));
  }));
}

describe('translation completeness', () => {
  it('provides both catalogs with identical nonempty messages and interpolation parameters', () => {
    const english = messages(en);
    const italian = messages(itCatalog);
    expect(Object.keys(italian).sort()).toEqual(Object.keys(english).sort());
    for (const [key, value] of Object.entries(english)) {
      expect(value.trim(), key).not.toBe('');
      expect(italian[key]?.trim(), key).not.toBe('');
      const parameters = (text: string): string[] => [...text.matchAll(/{{\s*(\w+)\s*}}/g)].map(match => match[1]!).sort();
      expect(parameters(italian[key]!), key).toEqual(parameters(value));
    }
  });

  it('keeps diagnostic codes as catalog keys in both languages', () => {
    // These assignments also make missing union members a strict type-checking failure.
    const english: Record<DiagnosticCode, string> = en.diagnostic;
    const italian: Record<DiagnosticCode, string> = itCatalog.diagnostic;
    expect(Object.keys(italian).sort()).toEqual(Object.keys(english).sort());
  });
});
