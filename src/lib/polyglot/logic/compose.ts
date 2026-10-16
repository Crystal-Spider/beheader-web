import {CompositionPlan, FormatFamily, InputSource, Inspection, ProcessingContext} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {ImageInfo, inspectImage} from '../format/image';
import {inspectHtml} from '../format/html';
import {inspectMp4, Mp4Info} from '../format/mp4';
import {checkCancelled, diagnose, ProcessingError} from './diagnostic';

/** Counted families, independent of optional payloads and asset archives. */
export const FORMAT_FAMILIES: readonly FormatFamily[] = ['image', 'media', 'html', 'pdf', 'archive'];

/** Runtime preparation never enters state; only its plan metadata is serializable. */
export interface PreparedComposition {
  readonly plan: CompositionPlan;
  readonly image?: {readonly input: BlobInput; readonly info: ImageInfo};
  readonly media?: {readonly source: InputSource; readonly info: Mp4Info};
  readonly html?: {readonly source: InputSource; readonly bom: number};
}

/**
 * Checks roles before expensive format validation; later milestones expand the matrix.
 * @param {Inspection} inspection Current input metadata and role decisions.
 * @param {ProcessingContext} context Cancellation and progress.
 * @returns {CompositionPlan} Provisional plan, requiring structure validation before readiness.
 */
export function planComposition(inspection: Inspection, context: ProcessingContext): CompositionPlan {
  checkCancelled(context.signal);
  const diagnostics = [...inspection.diagnostics];
  const roles = inspection.inputs.map(input => input.role);
  const families = FORMAT_FAMILIES.filter(family => roles.includes(family));
  for (const role of ['image', 'media', 'html', 'pdf', 'html-assets', 'extra-header'] as const) {
    if (roles.filter(value => value === role).length > 1) {
      diagnostics.push({code: 'ROLE_CONFLICT', severity: 'error', details: {role}});
    }
  }
  if (roles.includes('html-assets') && !roles.includes('html')) {
    diagnostics.push({code: 'MISSING_HTML', severity: 'error'});
  }
  if (families.length < 2) { diagnostics.push({code: 'MINIMUM_FAMILIES', severity: 'error'}); }
  if (!roles.includes('image') || !roles.includes('media') || roles.some(role => role !== 'image' && role !== 'media' && role !== 'html')) {
    diagnostics.push({code: 'IMPLEMENTATION_UNAVAILABLE', severity: 'error'});
  }
  return {inputs: inspection.inputs, diagnostics, families, interpretations: [], ready: false};
}

/**
 * Validates sources against the current composition matrix without decoding images or writing files.
 * @param {Inspection} inspection Bounded detection and role metadata.
 * @param {readonly InputSource[]} sources Runtime readers corresponding to inspection IDs.
 * @param {ProcessingContext} context Cancellation and progress.
 * @returns {Promise<PreparedComposition>} Ready metadata plus runtime-only relocation data.
 */
export async function prepareComposition(inspection: Inspection, sources: readonly InputSource[], context: ProcessingContext): Promise<PreparedComposition> {
  const initial = planComposition(inspection, context);
  if (initial.diagnostics.some(diagnostic => diagnostic.severity === 'error')) { return {plan: initial}; }
  const diagnostics = [...initial.diagnostics];
  let image: PreparedComposition['image'];
  let media: PreparedComposition['media'];
  let html: PreparedComposition['html'];
  for (const [index, description] of inspection.inputs.entries()) {
    const source = sources.find(source => source.id === description.id);
    if (!source || source.reader.size !== description.size) { throw new ProcessingError({code: 'INVALID_REQUEST', severity: 'error'}); }
    try {
      if (description.role === 'image') {
        if (!(source.reader instanceof BlobInput)) { throw new ProcessingError({code: 'IMAGE_DECODE_UNAVAILABLE', severity: 'error'}); }
        image = {input: source.reader, info: await inspectImage(source.reader, context)};
      } else if (description.role === 'media') {
        if (description.candidates.some(candidate => candidate.evidence === 'signature' && candidate.family === 'media' && ['mp3', 'wav', 'ogg', 'aac'].includes(candidate.format))) {
          throw new ProcessingError({code: 'IMPLEMENTATION_UNAVAILABLE', severity: 'error', details: {capability: 'audio-conversion'}});
        }
        media = {source, info: await inspectMp4(source.reader, context)};
      } else if (description.role === 'html') {
        html = {source, bom: await inspectHtml(source.reader, context)};
      }
    } catch(error) {
      const diagnostic = diagnose(error);
      if (diagnostic.code === 'CANCELLED') { throw error; }
      diagnostics.push({...diagnostic, inputId: description.id});
    }
    context.progress({stage: 'plan', completed: index + 1, total: inspection.inputs.length, unit: 'inputs'});
  }
  checkCancelled(context.signal);
  const ready = !!image && !!media && !diagnostics.some(diagnostic => diagnostic.severity === 'error');
  const interpretations: CompositionPlan['interpretations'] = ready ? [
    {family: 'image', extensions: ['ico']},
    {family: 'media', extensions: ['mp4']},
    ...(html ? [{family: 'html' as const, extensions: ['html', 'htm']}] : [])
  ] : [];
  return {plan: {...initial, diagnostics, interpretations, ready}, ...(image ? {image} : {}), ...(media ? {media} : {}), ...(html ? {html} : {})};
}
