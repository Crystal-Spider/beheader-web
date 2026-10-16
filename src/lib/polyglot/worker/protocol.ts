import {FileInput, WorkerRequest, WorkerResponse} from '../model/contract';
import {INPUT_ROLES} from '../logic/inspect';
import {validateStorageId} from '../io/temporary-storage';

/**
 * Narrows unknown structured-clone values before accessing fields.
 * @param {unknown} value Message data.
 * @returns {boolean} Whether this is a non-array object.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Checks requests at the worker boundary; rejects invalid roles, IDs, and non-File inputs.
 * @param {unknown} value Structured-clone payload.
 * @returns {boolean} Whether the request has the supported protocol shape.
 */
export function isWorkerRequest(value: unknown): value is WorkerRequest {
  if (!isRecord(value) || typeof value['jobId'] !== 'string') { return false; }
  try { validateStorageId(value['jobId']); } catch { return false; }
  if (value['type'] === 'cancel') { return true; }
  const request = value['request'];
  if (value['type'] !== 'run' || !isRecord(request) || !['inspect', 'plan', 'generate'].includes(String(request['operation']))) { return false; }
  const inputs: unknown = request['inputs'];
  return Array.isArray(inputs) && inputs.every((input: unknown): input is FileInput => isRecord(input)
    && typeof input['id'] === 'string' && input['id'].length > 0 && input['id'].length <= 128
    && input['file'] instanceof File
    && (input['role'] === undefined || INPUT_ROLES.some(role => role === input['role'])));
}

/**
 * Guards terminal/progress envelopes before they can update the application.
 * Detailed operation data is produced only by our bundled worker.
 * @param {unknown} value Worker message data.
 * @returns {boolean} Whether the envelope is a supported response.
 */
export function isWorkerResponse(value: unknown): value is WorkerResponse {
  if (!isRecord(value) || typeof value['jobId'] !== 'string') { return false; }
  if (value['type'] === 'progress') {
    const progress = value['progress'];
    return isRecord(progress) && ['inspect', 'plan', 'generate', 'cleanup'].includes(String(progress['stage']))
      && ['bytes', 'inputs'].includes(String(progress['unit']))
      && typeof progress['completed'] === 'number' && Number.isSafeInteger(progress['completed']) && progress['completed'] >= 0
      && typeof progress['total'] === 'number' && Number.isSafeInteger(progress['total']) && progress['total'] >= progress['completed'];
  }
  if (value['type'] === 'failed') {
    const diagnostic = value['diagnostic'];
    return isRecord(diagnostic) && typeof diagnostic['code'] === 'string' && diagnostic['severity'] === 'error';
  }
  const result = value['result'];
  if (value['type'] !== 'complete' || !isRecord(result)) { return false; }
  if (result['operation'] === 'inspect') { return isRecord(result['inspection']) && Array.isArray(result['inspection']['inputs']) && Array.isArray(result['inspection']['diagnostics']); }
  if (result['operation'] === 'plan') { return isRecord(result['plan']) && Array.isArray(result['plan']['inputs']) && Array.isArray(result['plan']['diagnostics']); }
  const artifact = result['artifact'];
  if (result['operation'] !== 'generate' || !isRecord(artifact) || !Array.isArray(result['interpretations'])
    || artifact['jobId'] !== value['jobId'] || typeof artifact['id'] !== 'string' || typeof artifact['mediaType'] !== 'string'
    || typeof artifact['size'] !== 'number' || !Number.isSafeInteger(artifact['size']) || artifact['size'] < 0) { return false; }
  try { validateStorageId(artifact['id']); } catch { return false; }
  return true;
}
