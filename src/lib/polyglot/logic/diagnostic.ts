import {Diagnostic, DiagnosticCode} from '../model/contract';

/** Carries safe, stable failure data across worker and application boundaries. */
export class ProcessingError extends Error {
  /**
   * @param {Diagnostic} diagnostic Safe failure metadata.
   */
  public constructor(public readonly diagnostic: Diagnostic) {
    super(diagnostic.code);
    this.name = 'ProcessingError';
  }
}

/**
 * Converts runtime exceptions without exposing browser messages or input content.
 * @param {unknown} error Runtime failure.
 * @param {DiagnosticCode} fallback Context-specific fallback code.
 * @returns {Diagnostic} Serializable safe diagnostic.
 */
export function diagnose(error: unknown, fallback: DiagnosticCode = 'IO_FAILURE'): Diagnostic {
  if (error instanceof ProcessingError) {
    return error.diagnostic;
  }
  if (error instanceof DOMException) {
    if (error.name === 'AbortError') {
      return {code: 'CANCELLED', severity: 'error'};
    }
    if (error.name === 'QuotaExceededError') {
      return {code: 'STORAGE_FULL', severity: 'error'};
    }
  }
  return {code: fallback, severity: 'error'};
}

/**
 * Check cancellation before and after every asynchronous I/O boundary.
 * @param {AbortSignal} signal Job cancellation signal.
 */
export function checkCancelled(signal: AbortSignal): void {
  if (signal.aborted) {
    throw new ProcessingError({code: 'CANCELLED', severity: 'error'});
  }
}
