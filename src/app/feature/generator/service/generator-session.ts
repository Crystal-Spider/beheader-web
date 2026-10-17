import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {Processing} from '~bhw/core/service/processing';
import {LanguagePreferences} from '~bhw/core/service/language-preferences';
import {LanguageCode} from '~bhw/core/model/language';
import {ArtifactReference, CompositionOptions, FileInput, InputRole, OperationResult} from '~bhw/polyglot/model/contract';
import {jobActions, jobFeature} from '../redux/job';
import {ProcessingError} from '~bhw/polyglot/logic/diagnostic';
import {selectionActions, selectionFeature} from '../redux/selection';

/** Local asset location and the filename shown in the selected language. */
interface ExampleAsset {readonly path: string; readonly name: string}

/** Owns selected Files and output lifetimes outside NgRx; nothing here restores selected files. */
@Injectable({providedIn: 'root'})
export class GeneratorSession {
  /** @type {readonly FileInput[]} */
  private inputs: readonly FileInput[] = [];
  /** @type {ArtifactReference | null} */
  private artifact: ArtifactReference | null = null;
  /** @type {string | undefined} */
  private htmlId: string | undefined;
  /** @type {boolean} */
  private cancelled = false;
  /** @type {CompositionOptions} */
  public options: CompositionOptions = {};
  /** @type {Signal<boolean>} */
  public readonly busy;
  /** @type {Signal<readonly InputDescription[]>} Inspected roles, including auto-detected archives. */
  private readonly selection;

  /**
   * @param {Processing} processing Dedicated worker owner.
   * @param {Store} store Metadata only.
   * @param {LanguagePreferences} languages Current language for bundled examples.
   */
  public constructor(private readonly processing: Processing, private readonly store: Store, private readonly languages: LanguagePreferences) { this.busy = store.selectSignal(jobFeature.selectBusy); this.selection = store.selectSignal(selectionFeature.selectInputs); }

  /**
   * @param {readonly File[]} files Newly picked or dropped files.
   * @param {InputRole | undefined} role Optional explicit role.
   * @param {string | undefined} replacing Optional selected input ID to replace.
   */
  public add(files: readonly File[], role?: InputRole, replacing?: string): void {
    if (this.busy() || !files.length) { return; }
    const additions = files.map(file => ({id: crypto.randomUUID(), file, ...(role ? {role} : {})}));
    if (replacing) { this.inputs = this.inputs.flatMap(input => input.id === replacing ? additions.slice(0, 1) : [input]); }
    else { this.inputs = [...this.inputs, ...additions]; }
    this.options = {...this.options, allowUnresolved: false}; this.refresh();
  }

  /**
   * @param {string} id Input to remove.
   */
  public remove(id: string): void { if (!this.busy()) { this.inputs = this.inputs.filter(input => input.id !== id && (id !== this.htmlId || input.role !== 'html-assets')); this.options = {...this.options, allowUnresolved: false}; this.refresh(); } }

  /**
   * @param {string} id Input receiving a role decision.
   * @param {string} role Supported role or empty for detection.
   */
  public assign(id: string, role: string): void {
    if (this.busy()) { return; }
    if (id === this.htmlId && role && role !== 'html') { this.inputs = this.inputs.filter(input => input.role !== 'html-assets'); }
    this.inputs = this.inputs.map(input => input.id === id ? {id, file: input.file, ...(role ? {role: role as InputRole} : {})} : input);
    this.options = {...this.options, allowUnresolved: false}; this.refresh();
  }

  /**
   * @param {string} id Selected record.
   * @returns {InputRole | ''} Explicit role, or auto detect.
   */
  public role(id: string): InputRole | '' { return this.inputs.find(input => input.id === id)?.role ?? ''; }

  /**
   * @param {string} id Record to move.
   * @param {number} target Destination archive index; other input positions stay fixed.
   */
  public move(id: string, target: number): void {
    if (this.busy()) { return; }
    const archives = this.selection().filter(input => input.role === 'archive').map(input => input.id);
    const index = archives.indexOf(id);
    const byId = new Map(this.inputs.map(input => [input.id, input]));
    if (index < 0 || !Number.isInteger(target) || target < 0 || target >= archives.length || target === index || archives.some(id => !byId.has(id))) { return; }
    archives.splice(target, 0, archives.splice(index, 1)[0]!);
    const archiveIds = new Set(archives);
    let position = 0;
    this.inputs = this.inputs.map(input => archiveIds.has(input.id) ? byId.get(archives[position++]!)! : input);
    // Publish ordering before worker reinspection so CDK's drop cleanup cannot reveal stale cards.
    this.store.dispatch(selectionActions.reordered({ids: this.inputs.map(input => input.id)}));
    this.options = {...this.options, allowUnresolved: false}; this.refresh();
  }

  /** Starts reinspection after a file, order, or explicit unresolved-resource choice changes. */
  public refresh(): void { if (!this.busy()) { this.store.dispatch(jobActions.requested({operation: 'refresh'})); } }

  /**
   * Runs only from the serialized effect; no second job can overtake its file snapshot.
   * @param {'refresh' | 'generate'} operation UI intent.
   * @returns {Promise<OperationResult | null>} Terminal metadata.
   */
  public async run(operation: 'refresh' | 'generate'): Promise<OperationResult | null> {
    this.cancelled = false;
    if (this.artifact) { await this.processing.release(this.artifact); this.artifact = null; }
    this.requireActive();
    const inputs = [...this.inputs];
    if (operation === 'refresh') {
      const inspected = await this.processing.run({operation: 'inspect', inputs});
      this.requireActive();
      if (inspected.operation !== 'inspect') { throw new Error('WORKER_PROTOCOL'); }
      const metadata = inspected.inspection.inputs.length ? inspected.inspection.inputs : inputs.map(input => ({id: input.id, name: input.file.name, size: input.file.size, candidates: [], role: input.role ?? null}));
      this.store.dispatch(selectionActions.changed({inputs: metadata}));
      const htmlId = metadata.find(input => input.role === 'html')?.id;
      if (htmlId !== this.htmlId) { this.options = {...this.options, htmlPath: undefined, allowUnresolved: false}; this.htmlId = htmlId; }
      if (!inputs.length) { return null; }
      if (inspected.inspection.diagnostics.some(item => item.severity === 'error')) {
        return {operation: 'plan', plan: {...inspected.inspection, inputs: metadata, families: [], interpretations: [], ready: false}};
      }
    }
    const result = await this.processing.run({operation: operation === 'refresh' ? 'plan' : 'generate', inputs, options: this.options});
    if (result.operation === 'generate') { this.artifact = result.artifact; }
    return result;
  }

  /** @returns {Promise<void>} Cancellation across both workers and between-operation cleanup. */
  public cancel(): Promise<void> { this.cancelled = true; return this.processing.cancel(); }

  /** Rejects cancellation between asynchronous cleanup/inspection and the next worker operation. */
  private requireActive(): void { if (this.cancelled) { throw new ProcessingError({code: 'CANCELLED', severity: 'error'}); } }

  /**
   * Loads only redistributable local example assets; file selection itself remains ephemeral.
   * @returns {Promise<void>} Example selection queued for inspection.
   */
  public async example(): Promise<void> {
    if (this.busy()) { return; }
    const previous = this.inputs;
    const language = this.languages.language();
    const response = await fetch(new URL('assets/example/manifest.json', document.baseURI));
    if (!response.ok) { throw new Error('IO_FAILURE'); }
    const manifest = await response.json() as Partial<Record<LanguageCode, readonly ExampleAsset[]>>;
    const assets = manifest[language] ?? manifest.en;
    if (!assets?.length) { throw new Error('IO_FAILURE'); }
    const files = await Promise.all(assets.map(async asset => {
      const response = await fetch(new URL(`assets/example/${asset.path}`, document.baseURI));
      if (!response.ok) { throw new Error('IO_FAILURE'); }
      const blob = await response.blob();
      return new File([blob], asset.name, {type: blob.type});
    }));
    if (this.inputs !== previous || this.busy() || this.languages.language() !== language) { return; }
    this.inputs = []; this.add(files);
  }
}
