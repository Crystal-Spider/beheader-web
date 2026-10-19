import {CompositionPlan, Diagnostic, DiagnosticCode, JobProgress} from '../model/contract';

/** Expected environment limits can block work without representing an application error. */
const BLOCKING_WARNINGS: readonly DiagnosticCode[] = ['STORAGE_UNAVAILABLE', 'STORAGE_FULL'];

/**
 * Separates generation prerequisites from the message's visual severity.
 * @param {Diagnostic} diagnostic Safe processing outcome.
 * @returns {boolean} Whether generation must wait for correction.
 */
export function blocksGeneration(diagnostic: Diagnostic): boolean {
  return diagnostic.severity === 'error' || diagnostic.code === 'MINIMUM_FAMILIES' || BLOCKING_WARNINGS.includes(diagnostic.code);
}

/** Carries safe, stable failure data across worker and application boundaries. */
export class ProcessingError extends Error {
  /** @type {Diagnostic} */
  public readonly diagnostic: Diagnostic;
  /**
   * @param {Diagnostic} diagnostic Safe failure metadata.
   * @param {CompositionPlan | undefined} plan Complete validation feedback before output allocation.
   */
  public constructor(diagnostic: Diagnostic, public readonly plan?: CompositionPlan) {
    super(diagnostic.code);
    this.name = 'ProcessingError';
    this.diagnostic = {...diagnostic, severity: BLOCKING_WARNINGS.includes(diagnostic.code) ? 'warning' : diagnostic.severity};
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
      return {code: 'CANCELLED', severity: 'info'};
    }
    if (error.name === 'QuotaExceededError') {
      return {code: 'STORAGE_FULL', severity: 'warning'};
    }
  }
  return {code: fallback, severity: 'error'};
}

/**
 * Adds the current stage to unexpected failures without retaining exception messages.
 * @param {unknown} error Runtime failure.
 * @param {JobProgress['stage']} stage Last known processing stage.
 * @param {DiagnosticCode} fallback Context-specific fallback code.
 * @returns {Diagnostic} Safe diagnostic with optional stage context.
 */
export function diagnoseAt(error: unknown, stage: JobProgress['stage'], fallback: DiagnosticCode = 'IO_FAILURE'): Diagnostic {
  const diagnostic = diagnose(error, fallback);
  return ['IO_FAILURE', 'WORKER_FAILED', 'CLEANUP_FAILED', 'AUDIO_CONVERSION_FAILED'].includes(diagnostic.code) ? {...diagnostic, details: {...diagnostic.details, stage}} : diagnostic;
}

/**
 * Check cancellation before and after every asynchronous I/O boundary.
 * @param {AbortSignal} signal Job cancellation signal.
 */
export function checkCancelled(signal: AbortSignal): void {
  if (signal.aborted) {
    throw new ProcessingError({code: 'CANCELLED', severity: 'info'});
  }
}
