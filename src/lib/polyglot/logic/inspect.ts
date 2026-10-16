import {FormatCandidate, InputDescription, InputRole, InputSource, Inspection, ProcessingContext} from '../model/contract';
import {INPUT_COUNT_LIMIT, INPUT_LIMIT, matches, TOTAL_INPUT_LIMIT} from '../io/bytes';
import {checkCancelled} from './diagnostic';

/** Supported role names; auxiliary roles always require explicit assignment. */
export const INPUT_ROLES: readonly InputRole[] = ['image', 'media', 'html', 'pdf', 'archive', 'html-assets', 'appendable', 'extra-header'];

/**
 * Rejects all statically known size/id violations before any source is read.
 * @param {readonly InputSource[]} sources Selected sources.
 * @returns {Inspection['diagnostics']} Safe validation diagnostics.
 */
export function validateSources(sources: readonly InputSource[]): Inspection['diagnostics'] {
  const diagnostics: Inspection['diagnostics'][number][] = [];
  if (sources.length > INPUT_COUNT_LIMIT) { return [{code: 'FORMAT_RESOURCE_LIMIT', severity: 'error', details: {limit: INPUT_COUNT_LIMIT}}]; }
  const ids = new Set<string>();
  let total = 0;
  for (const source of sources) {
    if (!source.id || ids.has(source.id)) {
      diagnostics.push({code: 'INVALID_REQUEST', severity: 'error'});
    }
    ids.add(source.id);
    const size = source.reader.size;
    if (!Number.isSafeInteger(size) || size < 0) {
      diagnostics.push({code: 'INVALID_SIZE', severity: 'error', inputId: source.id});
    } else {
      total += size;
      if (size > INPUT_LIMIT) {
        diagnostics.push({code: 'INPUT_TOO_LARGE', severity: 'error', inputId: source.id, details: {limit: INPUT_LIMIT}});
      }
    }
    if (source.role !== undefined && !INPUT_ROLES.includes(source.role)) {
      diagnostics.push({code: 'INVALID_REQUEST', severity: 'error', inputId: source.id});
    }
  }
  if (!Number.isSafeInteger(total) || total > TOTAL_INPUT_LIMIT) {
    diagnostics.push({code: 'TOTAL_TOO_LARGE', severity: 'error', details: {limit: TOTAL_INPUT_LIMIT}});
  }
  return diagnostics;
}

/**
 * Finds format evidence without trusting extensions/MIME types or executing content.
 * @param {Uint8Array} head First bounded source bytes.
 * @param {Uint8Array} tail Last bounded source bytes, for ZIP end records.
 * @param {InputSource} source Metadata hints.
 * @returns {FormatCandidate[]} Detected candidates, including conflicting hints.
 */
export function detectFormats(head: Uint8Array, tail: Uint8Array, source: InputSource): FormatCandidate[] {
  const candidates: FormatCandidate[] = [];
  const add = (family: FormatCandidate['family'], format: string, evidence: FormatCandidate['evidence'] = 'signature'): void => {
    if (!candidates.some(candidate => candidate.family === family && candidate.format === format)) {
      candidates.push({family, format, evidence});
    }
  };
  if (matches(head, 0, [137, 80, 78, 71, 13, 10, 26, 10])) { add('image', 'png'); }
  if (matches(head, 0, [255, 216, 255])) { add('image', 'jpeg'); }
  const ascii = (offset: number, value: string): boolean => matches(head, offset, Array.from(value, character => character.charCodeAt(0)));
  if (ascii(0, 'GIF87a') || ascii(0, 'GIF89a')) { add('image', 'gif'); }
  if (ascii(0, 'RIFF') && ascii(8, 'WEBP')) { add('image', 'webp'); }
  if (ascii(0, 'BM')) { add('image', 'bmp'); }
  if (matches(head, 0, [73, 73, 42, 0]) || matches(head, 0, [77, 77, 0, 42])) { add('image', 'tiff'); }
  if (matches(head, 0, [0, 0, 1, 0])) { add('image', 'ico'); }
  if (ascii(4, 'ftyp')) {
    const imageBrand = /^(avif|avis|heic|heix|hevc|hevx|mif1|msf1)$/.test(new TextDecoder().decode(head.subarray(8, 12)));
    add(imageBrand ? 'image' : 'media', imageBrand ? 'heif' : 'mp4');
  }
  if (ascii(0, 'ID3') || (head[0] === 255 && head[1] !== undefined && (head[1] & 0xe6) === 0xe2)) { add('media', 'mp3'); }
  if (head[0] === 255 && head[1] !== undefined && (head[1] & 0xf6) === 0xf0) { add('media', 'aac'); }
  if (ascii(0, 'RIFF') && ascii(8, 'WAVE')) { add('media', 'wav'); }
  if (ascii(0, 'OggS')) { add('media', 'ogg'); }
  const text = new TextDecoder().decode(head);
  if (text.slice(0, 1024).includes('%PDF-')) { add('pdf', 'pdf'); }
  if (/^\s*(?:<\?xml[^>]*>\s*)?<svg[\s>]/i.test(text)) { add('image', 'svg'); }
  if (/^\s*(?:<!--[^]*?-->\s*)*(?:<!doctype\s+html|<html[\s>]|<head[\s>]|<body[\s>])/i.test(text)) { add('html', 'html'); }
  let zip = matches(head, 0, [80, 75, 3, 4]) || matches(head, 0, [80, 75, 5, 6]);
  for (let offset = Math.max(0, tail.length - 65557); offset <= tail.length - 22; offset++) {
    if (matches(tail, offset, [80, 75, 5, 6])) {
      const comment = (tail[offset + 20] ?? 0) + 256 * (tail[offset + 21] ?? 0);
      if (offset + 22 + comment === tail.length) { zip = true; }
    }
  }
  if (zip) { add('archive', 'zip'); }
  const extension = source.name.split('.').at(-1)?.toLowerCase() ?? '';
  if (/^(png|jpe?g|gif|webp|bmp|tiff?|ico|svg|avif|heic)$/.test(extension) || source.mediaType.startsWith('image/')) { add('image', extension || 'image', 'hint'); }
  if (/^(mp4|m4a|m4v|mp3|wav|ogg|oga|opus|aac|webm|mov)$/.test(extension) || /^(audio|video)\//.test(source.mediaType)) { add('media', extension || 'media', 'hint'); }
  if (/^html?$/.test(extension) || source.mediaType === 'text/html') { add('html', 'html', 'hint'); }
  if (extension === 'pdf' || source.mediaType === 'application/pdf') { add('pdf', 'pdf', 'hint'); }
  if (/^(zip|docx|xlsx|pptx|odt|ods|odp|jar|apk|epub)$/.test(extension) || source.mediaType === 'application/zip') { add('archive', 'zip', 'hint'); }
  return candidates;
}

/**
 * Inspects bounded headers/tails and resolves roles; codec/structure checks come later.
 * @param {readonly InputSource[]} sources Selected sources.
 * @param {ProcessingContext} context Cancellation and measured progress.
 * @returns {Promise<Inspection>} Metadata and diagnostics without retaining source handles.
 */
export async function inspectInputs(sources: readonly InputSource[], context: ProcessingContext): Promise<Inspection> {
  checkCancelled(context.signal);
  const diagnostics = [...validateSources(sources)];
  const inputs: InputDescription[] = [];
  if (diagnostics.length) { return {inputs, diagnostics}; }
  context.progress({stage: 'inspect', completed: 0, total: sources.length, unit: 'inputs'});
  for (const source of sources) {
    checkCancelled(context.signal);
    const head = await source.reader.read(0, Math.min(65536, source.reader.size), context.signal);
    const tail = source.reader.size <= head.length ? head
      : await source.reader.read(Math.max(0, source.reader.size - 65557), Math.min(65557, source.reader.size), context.signal);
    checkCancelled(context.signal);
    const candidates = detectFormats(head, tail, source);
    const families = [...new Set(candidates.map(candidate => candidate.family))];
    const role = source.role ?? (families.length === 1 ? families[0] ?? null : null);
    if (!source.reader.size) { diagnostics.push({code: 'INPUT_EMPTY', severity: 'error', inputId: source.id}); }
    if (!source.role && !families.length) { diagnostics.push({code: 'INPUT_UNKNOWN', severity: 'error', inputId: source.id}); }
    if (!source.role && families.length > 1) { diagnostics.push({code: 'INPUT_AMBIGUOUS', severity: 'error', inputId: source.id}); }
    if (candidates.length && candidates.every(candidate => candidate.evidence === 'hint')) { diagnostics.push({code: 'INPUT_HINT_ONLY', severity: 'warning', inputId: source.id}); }
    if (source.role && !['html-assets', 'appendable', 'extra-header'].includes(source.role)
      && (!families.includes(source.role as FormatCandidate['family']) || families.length > 1)) {
      diagnostics.push({code: 'ROLE_REASSIGNED', severity: 'warning', inputId: source.id});
    }
    inputs.push({id: source.id, name: source.name, size: source.reader.size, candidates, role});
    context.progress({stage: 'inspect', completed: inputs.length, total: sources.length, unit: 'inputs'});
  }
  checkCancelled(context.signal);
  return {inputs, diagnostics};
}
