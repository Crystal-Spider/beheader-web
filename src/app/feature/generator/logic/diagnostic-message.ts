import {Diagnostic} from '~bhw/polyglot/model/contract';
import {detailKey, detailReason, diagnosticParameters, DiagnosticParameters} from '~bhw/polyglot/model/diagnostic-detail';

/** Runtime translation lookup independent of Angular, without input-content interpolation. */
export type DiagnosticTranslation = (key: string, parameters?: DiagnosticParameters) => string;

/**
 * Formats measured limits and fixed enums before selecting a public explanation.
 * @param {Diagnostic} diagnostic Processing outcome.
 * @param {DiagnosticTranslation} translate Current-language catalog lookup.
 * @returns {string} Actionable localized message with no raw runtime exception.
 */
export function diagnosticMessage(diagnostic: Diagnostic, translate: DiagnosticTranslation): string {
  const reason = detailReason(diagnostic);
  const parameters = {...diagnosticParameters(diagnostic)};
  if (reason?.includes('BYTES') || reason === 'METADATA_LIMIT') {
    for (const key of ['actual', 'limit']) {
      const bytes = parameters[key];
      if (typeof bytes === 'number') {
        parameters[key] = bytes >= 1024 ** 3 ? `${(bytes / 1024 ** 3).toFixed(2)} GiB` : bytes >= 1024 ** 2 ? `${(bytes / 1024 ** 2).toFixed(2)} MiB` : `${bytes} B`;
      }
    }
  }
  for (const key of ['role', 'detected']) {
    if (typeof parameters[key] === 'string') { parameters[key] = translate(`role.${parameters[key]}`); }
  }
  if (parameters['feature']) { parameters['feature'] = translate(`detailFeature.${parameters['feature']}`); }
  let message = translate(reason ? detailKey(reason) : `diagnostic.${diagnostic.code}`, parameters);
  if (diagnostic.code === 'ROLE_CONFLICT' && parameters['role']) { message = translate('messages.roleConflict', parameters); }
  if (diagnostic.code === 'ROLE_REASSIGNED' && parameters['role'] && parameters['detected']) { message = translate('messages.roleAssigned', parameters); }
  if (parameters['stage'] && ['IO_FAILURE', 'WORKER_FAILED', 'CLEANUP_FAILED', 'AUDIO_CONVERSION_FAILED'].includes(diagnostic.code)) {
    message += ` ${translate('messages.failedStage', {stage: translate(`stage.${parameters['stage']}`)})}`;
  }
  return message;
}
