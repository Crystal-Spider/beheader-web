import {describe, expect, it} from 'vitest';

import {Diagnostic} from '../model/contract';
import {isWorkerResponse} from '../worker/protocol';
import {blocksGeneration, checkCancelled, diagnose, ProcessingError} from './diagnostic';

describe('diagnostic severity and generation prerequisites', () => {
  it('treats cancellation as information while still aborting work', () => {
    const controller = new AbortController();
    controller.abort();
    expect(() => checkCancelled(controller.signal)).toThrow(ProcessingError);
    expect(diagnose(new DOMException('', 'AbortError'))).toEqual({code: 'CANCELLED', severity: 'info'});
    try { checkCancelled(controller.signal); } catch(error) { expect(diagnose(error)).toEqual({code: 'CANCELLED', severity: 'info'}); }
  });

  it('preserves blocking storage limitations as warnings', () => {
    for (const code of ['STORAGE_FULL', 'STORAGE_UNAVAILABLE'] as const) {
      const diagnostic = diagnose(new ProcessingError({code, severity: 'error'}));
      expect(diagnostic.severity).toBe('warning');
      expect(blocksGeneration(diagnostic)).toBe(true);
    }
    expect(diagnose(new DOMException('', 'QuotaExceededError'))).toEqual({code: 'STORAGE_FULL', severity: 'warning'});
  });

  it('distinguishes compatibility errors, expected guidance and accepted warnings', () => {
    const cases: readonly [Diagnostic, boolean][] = [
      [{code: 'PDF_INVALID', severity: 'error'}, true],
      [{code: 'ROLE_CONFLICT', severity: 'error'}, true],
      [{code: 'IMAGE_DECODE_UNAVAILABLE', severity: 'error'}, true],
      [{code: 'AUDIO_DECODE_UNAVAILABLE', severity: 'error'}, true],
      [{code: 'MINIMUM_FAMILIES', severity: 'info'}, true],
      [{code: 'ROLE_REASSIGNED', severity: 'info'}, false],
      [{code: 'ARCHIVE_COLLISION', severity: 'warning'}, false],
      [{code: 'HTML_UNRESOLVED', severity: 'error'}, true],
      [{code: 'HTML_UNRESOLVED', severity: 'warning'}, false]
    ];
    for (const [diagnostic, blocking] of cases) {
      expect(diagnose(new ProcessingError(diagnostic))).toEqual(diagnostic);
      expect(blocksGeneration(diagnostic)).toBe(blocking);
    }
  });

  it('accepts terminal info and warning envelopes without weakening severity validation', () => {
    for (const severity of ['info', 'warning', 'error']) {
      expect(isWorkerResponse({type: 'failed', jobId: 'job', diagnostic: {code: 'CANCELLED', severity}})).toBe(true);
    }
    expect(isWorkerResponse({type: 'failed', jobId: 'job', diagnostic: {code: 'CANCELLED', severity: 'unknown'}})).toBe(false);
    expect(isWorkerResponse({type: 'failed', jobId: 'job', diagnostic: {code: 'CANCELLED', severity: {toString: () => 'error'}}})).toBe(false);
  });
});
