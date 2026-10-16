import {DiagnosticCode, FormatFamily, InputDescription} from '../model/contract';
import {INPUT_COUNT_LIMIT, TOTAL_INPUT_LIMIT} from '../io/bytes';
import {canCompleteComposition, FORMAT_FAMILIES} from './compatibility';

/** UI input kinds; audio and video share the independently countable media family. */
export type InputKind = 'image' | 'audio' | 'video' | 'html' | 'pdf' | 'archive';

/** Availability is metadata only and safe to derive in selectors or use before picker/drop additions. */
export interface InputAvailability {
  readonly kind: InputKind;
  readonly family: FormatFamily;
  readonly enabled: boolean;
  readonly reason?: DiagnosticCode;
  readonly accept: readonly string[];
}

/** Reviewed input support, distinct from the format-family combination matrix. */
export interface InputCapabilities {
  readonly audio: boolean;
}

/** Exact picker hints exclude unfinished codecs/formats; inspectors remain authoritative. */
const INPUT_KINDS: readonly {kind: InputKind; family: FormatFamily; accept: readonly string[]}[] = [
  {kind: 'image', family: 'image', accept: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp']},
  {kind: 'audio', family: 'media', accept: ['.mp3', '.wav', '.ogg', '.oga', '.opus', '.aac', '.m4a']},
  {kind: 'video', family: 'media', accept: ['.mp4', '.m4v']},
  {kind: 'html', family: 'html', accept: ['.html', '.htm']},
  {kind: 'pdf', family: 'pdf', accept: ['.pdf']},
  {kind: 'archive', family: 'archive', accept: ['.zip', '.docx', '.xlsx', '.pptx', '.odt', '.ods', '.odp', '.jar', '.apk', '.epub']}
];

/**
 * Recomputes additions after every selection change; replacement derives against the remaining inputs.
 * All 26 family subsets of size two or more have fixture evidence. Cardinality and implementation gates remain.
 * @param {readonly InputDescription[]} inputs Current inspected metadata, excluding any file being replaced.
 * @param {InputCapabilities} capabilities Implemented input conversions, not user preferences.
 * @returns {readonly InputAvailability[]} Six stable badge/control descriptions with safe reason codes.
 */
export function inputAvailability(inputs: readonly InputDescription[], capabilities: InputCapabilities = {audio: true}): readonly InputAvailability[] {
  const total = inputs.reduce((sum, input) => sum + input.size, 0);
  const families = FORMAT_FAMILIES.filter(family => inputs.some(input => input.role === family));
  return INPUT_KINDS.map(input => {
    const reason: DiagnosticCode | undefined = inputs.some(input => input.role === null) ? 'INPUT_AMBIGUOUS'
      : inputs.length >= INPUT_COUNT_LIMIT ? 'FORMAT_RESOURCE_LIMIT'
        : total >= TOTAL_INPUT_LIMIT ? 'TOTAL_TOO_LARGE'
          : input.family !== 'archive' && inputs.some(selected => selected.role === input.family) ? 'ROLE_CONFLICT'
            : !canCompleteComposition([...families, input.family]) ? 'COMBINATION_UNSUPPORTED'
              : input.kind === 'audio' && !capabilities.audio ? 'IMPLEMENTATION_UNAVAILABLE' : undefined;
    return {...input, enabled: reason === undefined, ...(reason ? {reason} : {})};
  });
}

/**
 * Derives the future chooser's accept hint from the same model that drives badges and controls.
 * @param {readonly InputAvailability[]} availability Current availability.
 * @returns {string} Only enabled input extensions, or an empty hint when the control must be disabled.
 */
export function acceptedInputTypes(availability: readonly InputAvailability[]): string {
  return [...new Set(availability.filter(input => input.enabled).flatMap(input => input.accept))].join(',');
}
