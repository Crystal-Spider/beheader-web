/** Independently countable interpretations, distinct from auxiliary payload roles. */
export type FormatFamily = 'image' | 'media' | 'html' | 'pdf' | 'archive';

/** Auxiliary payloads never satisfy the minimum family count. */
export type InputRole = FormatFamily | 'html-assets' | 'appendable' | 'extra-header';

/** Stable machine-readable diagnostics; presentation belongs to the application. */
export type DiagnosticCode =
  | 'INVALID_REQUEST' | 'INVALID_SIZE' | 'INPUT_TOO_LARGE' | 'TOTAL_TOO_LARGE'
  | 'INPUT_EMPTY' | 'INPUT_UNKNOWN' | 'INPUT_AMBIGUOUS' | 'INPUT_HINT_ONLY'
  | 'ROLE_REASSIGNED' | 'ROLE_CONFLICT' | 'MISSING_HTML' | 'MINIMUM_FAMILIES'
  | 'IMPLEMENTATION_UNAVAILABLE' | 'INVALID_RANGE' | 'TRUNCATED_INPUT'
  | 'OUTPUT_LIMIT' | 'IO_FAILURE' | 'STORAGE_UNAVAILABLE' | 'STORAGE_FULL'
  | 'CLEANUP_FAILED' | 'CANCELLED' | 'JOB_BUSY' | 'WORKER_FAILED' | 'WORKER_PROTOCOL'
  | 'IMAGE_UNSUPPORTED' | 'IMAGE_ANIMATED' | 'IMAGE_MULTIPAGE' | 'IMAGE_INVALID'
  | 'IMAGE_RESOURCE_LIMIT' | 'IMAGE_DECODE_UNAVAILABLE' | 'MP4_INVALID'
  | 'MP4_FRAGMENTED' | 'MP4_ENCRYPTED' | 'MP4_CODEC' | 'MP4_TRACKS'
  | 'MP4_STRUCTURE' | 'FORMAT_RESOURCE_LIMIT' | 'OFFSET_OVERFLOW' | 'HTML_ENCODING'
  | 'PDF_INVALID' | 'PDF_STRUCTURE' | 'PDF_ENCRYPTED'
  | 'ARCHIVE_INVALID' | 'ARCHIVE_UNSUPPORTED' | 'ARCHIVE_ENCRYPTED' | 'ARCHIVE_SPLIT'
  | 'ARCHIVE_EXPANDED_LIMIT' | 'ARCHIVE_PATH' | 'ARCHIVE_COLLISION' | 'COMBINATION_UNSUPPORTED'
  | 'AUDIO_INVALID' | 'AUDIO_CODEC' | 'AUDIO_TRACKS' | 'AUDIO_CHANNELS'
  | 'AUDIO_DECODE_UNAVAILABLE' | 'AUDIO_CONVERSION_FAILED'
  | 'HTML_UNRESOLVED' | 'HTML_ASSET_INVALID' | 'HEADER_SPACE' | 'HEADER_CONTENT';

/** Contains no translated prose, raw errors, file names, or file contents. */
export interface Diagnostic {
  readonly code: DiagnosticCode;
  readonly severity: 'error' | 'warning';
  readonly inputId?: string;
  readonly details?: Readonly<Record<string, string | number>>;
}

/** Bounded random access; callers cannot request a complete large payload. */
export interface SeekableInput {
  readonly size: number;
  read(offset: number, length: number, signal: AbortSignal): Promise<Uint8Array<ArrayBuffer>>;
}

/** Runtime source; never put readers or File objects in serializable state. */
export interface InputSource {
  readonly id: string;
  readonly name: string;
  readonly mediaType: string;
  readonly reader: SeekableInput;
  readonly role?: InputRole;
}

/** File handles cross the worker boundary through structured cloning, not byte copies. */
export interface FileInput {
  readonly id: string;
  readonly file: File;
  readonly role?: InputRole;
}

/** A format candidate is detection evidence, not verified consumer compatibility. */
export interface FormatCandidate {
  readonly family: FormatFamily;
  readonly format: string;
  readonly evidence: 'signature' | 'hint';
}

/** Serializable inspection metadata, including an explicit role override when provided. */
export interface InputDescription {
  readonly id: string;
  readonly name: string;
  readonly size: number;
  readonly candidates: readonly FormatCandidate[];
  readonly role: InputRole | null;
}

/** Shared inspection outcome. */
export interface Inspection {
  readonly inputs: readonly InputDescription[];
  readonly diagnostics: readonly Diagnostic[];
}

/** Only independently validated interpretations may be advertised by a planner. */
export interface Interpretation {
  readonly family: FormatFamily;
  readonly extensions: readonly string[];
}

/** Separates unfinished implementation from detected input/format constraints. */
export interface CompositionPlan extends Inspection {
  readonly families: readonly FormatFamily[];
  readonly interpretations: readonly Interpretation[];
  readonly ready: boolean;
  readonly archives?: readonly ArchiveDescription[];
  readonly collisions?: readonly ArchiveCollision[];
  readonly references?: readonly HtmlReference[];
  readonly headerSpace?: number;
}

/** Display-only reference details; exclude paths and URLs from diagnostic exports. */
export interface HtmlReference {
  readonly reference: string;
  readonly from: string;
  readonly reason: 'missing' | 'remote' | 'cycle' | 'unsupported';
}

/** Explicit decisions shared by planning and generation, without persisted file selection. */
export interface CompositionOptions {
  readonly htmlPath?: string;
  readonly allowUnresolved?: boolean;
}

/** Ordered archive metadata; payloads remain outside state. */
export interface ArchiveDescription {
  readonly inputId: string;
  readonly entries: number;
  readonly expandedSize: number;
}

/** Display metadata only; never include paths in downloaded diagnostics by default. */
export interface ArchiveCollision {
  readonly path: string;
  readonly earlierInputId: string;
  readonly laterInputId: string;
}

/** Opaque reference to a file in the job workspace; no payload in state/messages. */
export interface ArtifactReference {
  readonly jobId: string;
  readonly id: string;
  readonly size: number;
  readonly mediaType: string;
}

/** Measured work units; totals are scoped to the named stage. */
export interface JobProgress {
  readonly stage: 'inspect' | 'plan' | 'convert' | 'generate' | 'extract' | 'pack' | 'cleanup';
  readonly completed: number;
  readonly total: number;
  readonly unit: 'bytes' | 'inputs' | 'microseconds';
}

/** Shared cooperative cancellation and progress reporting. */
export interface ProcessingContext {
  readonly signal: AbortSignal;
  readonly progress: (progress: JobProgress) => void;
}

/** Three core operations share the same selected sources and role assignments. */
export interface OperationRequest {
  readonly operation: 'inspect' | 'plan' | 'generate';
  readonly inputs: readonly FileInput[];
  readonly options?: CompositionOptions;
}

/** Operation-specific results are serializable, including generated artifact references. */
export type OperationResult =
  | {readonly operation: 'inspect'; readonly inspection: Inspection}
  | {readonly operation: 'plan'; readonly plan: CompositionPlan}
  | {readonly operation: 'generate'; readonly artifact: ArtifactReference; readonly interpretations: readonly Interpretation[]};

/** Worker requests are job-scoped, including cancellation. */
export type WorkerRequest =
  | {readonly type: 'run'; readonly jobId: string; readonly request: OperationRequest}
  | {readonly type: 'cancel'; readonly jobId: string};

/** Stale job messages cannot update the active client job. */
export type WorkerResponse =
  | {readonly type: 'progress'; readonly jobId: string; readonly progress: JobProgress}
  | {readonly type: 'complete'; readonly jobId: string; readonly result: OperationResult}
  | {readonly type: 'failed'; readonly jobId: string; readonly diagnostic: Diagnostic};
