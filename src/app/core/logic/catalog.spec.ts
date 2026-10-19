import {describe, expect, it} from 'vitest';

import en from '../i18n/en.json';
import itCatalog from '../i18n/it.json';
import {DiagnosticCode, PROGRESS_DETAILS} from '~bhw/polyglot/model/contract';
import {PDF_REASONS, PdfReason} from '~bhw/polyglot/model/pdf-diagnostic';
import {DETAIL_REASONS, DetailReason} from '~bhw/polyglot/model/diagnostic-detail';

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

  it('explains every PDF check in both languages', () => {
    const english: Record<PdfReason, string> = en.pdfReason;
    const italian: Record<PdfReason, string> = itCatalog.pdfReason;
    expect(Object.keys(english).sort()).toEqual([...PDF_REASONS].sort());
    expect(Object.keys(italian).sort()).toEqual([...PDF_REASONS].sort());
  });

  it('explains every public structural reason in both languages', () => {
    const english: Record<DetailReason, string> = en.detail;
    const italian: Record<DetailReason, string> = itCatalog.detail;
    expect(Object.keys(english).sort()).toEqual([...DETAIL_REASONS].sort());
    expect(Object.keys(italian).sort()).toEqual([...DETAIL_REASONS].sort());
  });

  it('labels every worker detail in both languages', () => {
    for (const detail of PROGRESS_DETAILS) { expect(en.progress[detail]).toBeTruthy(); expect(itCatalog.progress[detail]).toBeTruthy(); }
  });
});
