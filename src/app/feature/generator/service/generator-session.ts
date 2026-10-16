import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {Processing} from '~bhw/core/service/processing';
import {ArtifactReference, CompositionOptions, FileInput, InputRole, OperationResult} from '~bhw/polyglot/model/contract';
import {jobActions, jobFeature} from '../redux/job';
import {ProcessingError} from '~bhw/polyglot/logic/diagnostic';
import {selectionActions} from '../redux/selection';

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

  /**
   * @param {Processing} processing Dedicated worker owner.
   * @param {Store} store Metadata only.
   */
  public constructor(private readonly processing: Processing, private readonly store: Store) { this.busy = store.selectSignal(jobFeature.selectBusy); }

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
  public remove(id: string): void { if (!this.busy()) { this.inputs = this.inputs.filter(input => input.id !== id); this.options = {...this.options, allowUnresolved: false}; this.refresh(); } }

  /**
   * @param {string} id Input receiving a role decision.
   * @param {string} role Supported role or empty for detection.
   */
  public assign(id: string, role: string): void {
    if (this.busy()) { return; }
    this.inputs = this.inputs.map(input => input.id === id ? {id, file: input.file, ...(role ? {role: role as InputRole} : {})} : input);
    this.options = {...this.options, allowUnresolved: false}; this.refresh();
  }

  /**
   * @param {string} id Selected record.
   * @returns {string} Explicit role, or automatic detection.
   */
  public role(id: string): string { return this.inputs.find(input => input.id === id)?.role ?? ''; }

  /**
   * @param {string} id Record to move.
   * @param {number} direction One step in selected ordering.
   */
  public move(id: string, direction: number): void {
    if (this.busy()) { return; }
    const inputs = [...this.inputs]; const index = inputs.findIndex(input => input.id === id); const other = index + direction;
    if (index < 0 || other < 0 || other >= inputs.length) { return; }
    [inputs[index], inputs[other]] = [inputs[other]!, inputs[index]!]; this.inputs = inputs; this.options = {...this.options, allowUnresolved: false}; this.refresh();
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
    const files = await Promise.all(['picture.png', 'page.html', 'tone.mp3'].map(async name => {
      const response = await fetch(new URL(`assets/example/${name}`, document.baseURI));
      if (!response.ok) { throw new Error('IO_FAILURE'); }
      return new File([await response.blob()], name);
    }));
    if (this.inputs !== previous || this.busy()) { return; }
    this.inputs = []; this.add(files);
  }
}
