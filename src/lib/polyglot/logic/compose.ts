import {CompositionOptions, CompositionPlan, InputSource, Inspection, ProcessingContext} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {ImageInfo, inspectImage} from '../format/image';
import {inspectHtml} from '../format/html';
import {inspectMp4, Mp4Info} from '../format/mp4';
import {inspectPdf, PdfInfo} from '../format/pdf';
import {ArchiveInfo, inspectArchive, mergeArchives} from '../format/archive';
import {AudioInfo, inspectAudio} from '../format/audio';
import {bundleHtml} from '../format/html-bundle';
import {checkCancelled, diagnose, ProcessingError} from './diagnostic';
import {familyMask, FORMAT_FAMILIES, VERIFIED_COMBINATIONS} from './compatibility';
import {LARGE_FILE_THRESHOLD} from '../io/resource-budget';

/** Runtime preparation never enters state; only its plan metadata is serializable. */
export interface PreparedComposition {
  readonly plan: CompositionPlan;
  readonly image?: {readonly input: BlobInput; readonly info: ImageInfo};
  readonly media?: {readonly source: InputSource; readonly info: Mp4Info} | {readonly source: InputSource; readonly audio: AudioInfo};
  readonly html?: {readonly source: InputSource; readonly bom: number};
  readonly pdf?: {readonly source: InputSource; readonly info: PdfInfo};
  readonly archives?: readonly ArchiveInfo[];
}

/**
 * Checks roles before expensive format validation against the verified family matrix.
 * @param {Inspection} inspection Current input metadata and role decisions.
 * @param {ProcessingContext} context Cancellation and progress.
 * @returns {CompositionPlan} Provisional plan, requiring structure validation before readiness.
 */
export function planComposition(inspection: Inspection, context: ProcessingContext): CompositionPlan {
  checkCancelled(context.signal);
  const diagnostics = [...inspection.diagnostics];
  const roles = inspection.inputs.map(input => input.role);
  const families = FORMAT_FAMILIES.filter(family => roles.includes(family));
  for (const role of ['image', 'media', 'html', 'pdf', 'html-assets'] as const) {
    if (roles.filter(value => value === role).length > 1) {
      diagnostics.push({code: 'ROLE_CONFLICT', severity: 'error', details: {role}});
    }
  }
  if (roles.includes('html-assets') && !roles.includes('html')) {
    diagnostics.push({code: 'MISSING_HTML', severity: 'error'});
  }
  if (families.length < 2) { diagnostics.push({code: 'MINIMUM_FAMILIES', severity: 'error'}); }
  if (families.length >= 2 && !VERIFIED_COMBINATIONS.includes(familyMask(families))) { diagnostics.push({code: 'COMBINATION_UNSUPPORTED', severity: 'error'}); }
  return {inputs: inspection.inputs, diagnostics, families, interpretations: [], ready: false};
}

/**
 * Validates sources against the current composition matrix without decoding images or writing files.
 * @param {Inspection} inspection Bounded detection and role metadata.
 * @param {readonly InputSource[]} sources Runtime readers corresponding to inspection IDs.
 * @param {ProcessingContext} context Cancellation and progress.
 * @param {CompositionOptions} options Explicit HTML reference policy.
 * @returns {Promise<PreparedComposition>} Ready metadata plus runtime-only relocation data.
 */
export async function prepareComposition(inspection: Inspection, sources: readonly InputSource[], context: ProcessingContext, options: CompositionOptions = {}): Promise<PreparedComposition> {
  const initial = planComposition(inspection, context);
  if (initial.diagnostics.some(diagnostic => diagnostic.severity === 'error')) { return {plan: initial}; }
  const diagnostics = [...initial.diagnostics];
  let image: PreparedComposition['image'];
  let media: PreparedComposition['media'];
  let html: PreparedComposition['html'];
  let pdf: PreparedComposition['pdf'];
  const archives: ArchiveInfo[] = [];
  let assets: ArchiveInfo | undefined;
  for (const [index, description] of inspection.inputs.entries()) {
    const source = sources.find(source => source.id === description.id);
    if (!source || source.reader.size !== description.size) { throw new ProcessingError({code: 'INVALID_REQUEST', severity: 'error'}); }
    try {
      if (description.role === 'image') {
        if (!(source.reader instanceof BlobInput)) { throw new ProcessingError({code: 'IMAGE_DECODE_UNAVAILABLE', severity: 'error'}); }
        image = {input: source.reader, info: await inspectImage(source.reader, context)};
      } else if (description.role === 'media') {
        if (description.candidates.some(candidate => candidate.evidence === 'signature' && candidate.family === 'media' && ['mp3', 'wav', 'ogg', 'aac'].includes(candidate.format))) {
          media = {source, audio: await inspectAudio(source, context)};
        } else { media = {source, info: await inspectMp4(source.reader, context)}; }
      } else if (description.role === 'html') {
        html = {source, bom: await inspectHtml(source.reader, context)};
      } else if (description.role === 'pdf') {
        pdf = {source, info: await inspectPdf(source.reader, context)};
      } else if (description.role === 'archive') {
        archives.push(await inspectArchive(source, context));
      } else if (description.role === 'html-assets') {
        assets = await inspectArchive(source, context);
      }
    } catch(error) {
      const diagnostic = diagnose(error);
      if (diagnostic.code === 'CANCELLED') { throw error; }
      diagnostics.push({...diagnostic, inputId: description.id});
    }
    context.progress({stage: 'plan', completed: index + 1, total: inspection.inputs.length, unit: 'inputs'});
  }
  checkCancelled(context.signal);
  let references: CompositionPlan['references'] = [];
  if (html) {
    try {
      const bundled = await bundleHtml(html.source, assets, options, context);
      references = bundled.references;
      html = {source: {...html.source, reader: new BlobInput(bundled.blob)}, bom: 0};
      if (references.length) { diagnostics.push({code: 'HTML_UNRESOLVED', severity: options.allowUnresolved ? 'warning' : 'error', details: {count: references.length}}); }
    } catch(error) { diagnostics.push(diagnose(error, 'HTML_ASSET_INVALID')); }
  }
  let collisions: CompositionPlan['collisions'] = [];
  let expanded = 0;
  try {
    const merged = mergeArchives(archives);
    collisions = merged.collisions;
    expanded = merged.winners.reduce((sum, winner) => sum + winner.entry.uncompressedSize, 0);
    if (collisions.length) { diagnostics.push({code: 'ARCHIVE_COLLISION', severity: 'warning', details: {count: collisions.length}}); }
  } catch(error) { diagnostics.push(diagnose(error)); }
  const ready = !diagnostics.some(diagnostic => diagnostic.severity === 'error');
  const interpretations: CompositionPlan['interpretations'] = ready ? [
    ...(image ? [{family: 'image' as const, extensions: ['ico']}] : []),
    ...(media ? [{family: 'media' as const, extensions: 'audio' in media || !media.info.video ? ['m4a', 'mp4'] : ['mp4']}] : []),
    ...(html ? [{family: 'html' as const, extensions: ['html', 'htm']}] : []),
    ...(pdf ? [{family: 'pdf' as const, extensions: ['pdf']}] : []),
    ...(archives.length ? [{family: 'archive' as const, extensions: ['zip']}] : [])
  ] : [];
  const encodedMedia = media && 'info' in media ? media.source.reader.size - media.info.ftyp.size : 0;
  const base = 256 + encodedMedia + (html?.source.reader.size ?? 0) + (pdf?.info.startxref ?? 0);
  const audioBytes = media && 'audio' in media ? Math.ceil(media.audio.duration * 192000 / 8) : 0;
  const temporaryBytes = base + expanded * 2 + audioBytes * 2 + (image ? image.info.width * image.info.height * 4 : 0) + 1024 * 1024;
  const resources = {large: sources.some(source => source.reader.size > LARGE_FILE_THRESHOLD) || temporaryBytes > LARGE_FILE_THRESHOLD, temporaryBytes, minimumBytes: base + expanded};
  return {
    plan: {...initial, diagnostics, interpretations, ready, collisions, references, resources, archives: archives.map(archive => ({inputId: archive.source.id, entries: archive.entries.length, expandedSize: archive.expandedSize}))},
    ...(image ? {image} : {}), ...(media ? {media} : {}), ...(html ? {html} : {}), ...(pdf ? {pdf} : {}), archives
  };
}
