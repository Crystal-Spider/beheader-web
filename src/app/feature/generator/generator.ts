import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, computed, signal} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoDirective, TranslocoService} from '@jsverse/transloco';
import {Store} from '@ngrx/store';

import {Button} from '~bhw/shared/component/button/button';
import {Choice} from '~bhw/shared/component/choice/choice';
import {TextField} from '~bhw/shared/component/text-field/text-field';
import {Expansion} from '~bhw/shared/component/expansion/expansion';
import {Icon} from '~bhw/shared/component/icon/icon';
import {LanguagePicker} from '~bhw/shared/component/language-picker/language-picker';
import {Footer} from '~bhw/core/component/footer/footer';
import {Processing} from '~bhw/core/service/processing';
import {Offline} from '~bhw/core/service/offline';
import {InputRole} from '~bhw/polyglot/model/contract';
import {InputAvailability} from '~bhw/polyglot/logic/availability';
import {INPUT_ROLES} from '~bhw/polyglot/logic/inspect';
import {diagnose} from '~bhw/polyglot/logic/diagnostic';
import {selectionFeature} from './redux/selection';
import {jobActions, jobFeature} from './redux/job';
import {GeneratorSession} from './service/generator-session';
import {diagnosticReport, issueUrl, outputName} from './logic/diagnostics';
import {InputList} from './component/input-list/input-list';

/** Complete local generator: metadata controls only, without uploaded-content previews. */
@Component({selector: 'bhw-generator', imports: [TranslocoDirective, Button, Choice, TextField, Expansion, InputList, Icon, LanguagePicker, Footer, MatCheckboxModule, MatProgressBarModule, MatTooltipModule], templateUrl: './generator.html', styleUrl: './generator.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class Generator {
  /** @type {Signal<readonly InputAvailability[]>} */
  public readonly availability;
  /** @type {Signal<string>} */
  public readonly accepted;
  /** @type {Signal<readonly InputDescription[]>} */
  public readonly inputs;
  /** @type {Signal<readonly FileCard[]>} */
  public readonly cards;
  /** @type {Signal<JobState>} */
  public readonly job;
  /** @type {WritableSignal<string>} */
  public readonly name = signal(this.preference('name') || 'polyglot');
  /** @type {WritableSignal<string>} */
  public readonly extension = signal(this.preference('extension'));
  /** @type {WritableSignal<boolean>} */
  public readonly dragging = signal(false);
  /** @type {Signal<readonly string[]>} */
  public readonly extensions;
  /** @type {Signal<string>} */
  public readonly selectedExtension;
  /** @type {InputRole | undefined} */
  private pickingRole: InputRole | undefined;
  /** @type {string | undefined} */
  private replacing: string | undefined;
  /** @type {string} */
  public pickerAccept = '';
  /** @type {readonly InputRole[]} */
  public readonly auxiliaryRoles: readonly InputRole[] = ['html-assets', 'appendable', 'extra-header'];

  /**
   * @param {Processing} processing Runtime worker and output owner.
   * @param {GeneratorSession} session Ephemeral file selection.
   * @param {Store} store Serializable state.
   * @param {TranslocoService} translations Runtime text.
   * @param {Offline} offline Production caching and idle-only update gate.
   * @param {ChangeDetectorRef} changeDetector Commits drop ordering before the next browser paint.
   */
  public constructor(public readonly processing: Processing, public readonly session: GeneratorSession, private readonly store: Store, private readonly translations: TranslocoService, public readonly offline: Offline, private readonly changeDetector: ChangeDetectorRef) {
    this.availability = store.selectSignal(selectionFeature.selectAvailability);
    this.accepted = store.selectSignal(selectionFeature.selectAcceptedTypes);
    this.inputs = store.selectSignal(selectionFeature.selectInputs);
    this.cards = computed(() => this.inputs().map(input => ({...input, explicitRole: this.session.role(input.id)})));
    this.job = store.selectSignal(jobFeature.selectJobState);
    this.extensions = computed(() => this.job().interpretations.flatMap(item => item.extensions));
    this.selectedExtension = computed(() => this.extensions().includes(this.extension()) ? this.extension() : this.extensions()[0] ?? '');
  }

  /**
   * @param {HTMLInputElement} picker Hidden native file chooser.
   * @param {InputAvailability | InputRole | undefined} role Optional role-specific selection.
   * @param {string | undefined} replacing Replacement input ID.
   */
  public choose(picker: HTMLInputElement, role?: InputAvailability | InputRole, replacing?: string): void {
    if (this.job().busy) { return; }
    this.pickingRole = typeof role === 'string' ? role : role?.family;
    this.replacing = replacing;
    this.pickerAccept = typeof role === 'object' ? role.accept.join(',') : role === 'html-assets' ? '.zip' : role ? '' : replacing ? this.availability().flatMap(item => item.accept).join(',') : this.accepted();
    picker.accept = this.pickerAccept; picker.multiple = !replacing; picker.click();
  }

  /**
   * @param {HTMLInputElement} picker Selected files; the native control is reset to permit the same file again.
   */
  public picked(picker: HTMLInputElement): void {
    this.session.add(Array.from(picker.files ?? []), this.pickingRole, this.replacing);
    picker.value = ''; this.pickerAccept = ''; this.pickingRole = undefined; this.replacing = undefined;
  }

  /**
   * @param {DragEvent} event Page-wide file drag.
   */
  @HostListener('document:dragover', ['$event'])
  public drag(event: DragEvent): void { if (event.dataTransfer?.types.includes('Files')) { event.preventDefault(); this.dragging.set(true); } }

  /**
   * @param {DragEvent} event Leaving the browser viewport.
   */
  @HostListener('document:dragleave', ['$event'])
  public leave(event: DragEvent): void { if (!event.relatedTarget) { this.dragging.set(false); } }

  /**
   * @param {DragEvent} event File drop, validated by authoritative core inspection/planning.
   */
  @HostListener('document:drop', ['$event'])
  public drop(event: DragEvent): void { event.preventDefault(); this.dragging.set(false); this.session.add(Array.from(event.dataTransfer?.files ?? [])); }

  /** Starts generation only from a validated ready plan. */
  public generate(): void { if (!this.job().busy && this.job().plan?.ready) { this.store.dispatch(jobActions.requested({operation: 'generate'})); } }
  /** Requests termination through the worker lifecycle effect. */
  public cancel(): void { this.store.dispatch(jobActions.cancelRequested({})); }

  /**
   * @param {{id: string; index: number}} event Pointer or keyboard ordering intent.
   * @param {string} event.id Selected file identity.
   * @param {number} event.index Target position.
   */
  public reorder(event: {id: string; index: number}): void {
    this.session.move(event.id, event.index);
    // CDK restores the source DOM synchronously; render the new order before its drop callback returns.
    this.changeDetector.detectChanges();
  }

  /**
   * Explains the shared media slot without implying that a separate audio and video are permitted.
   * @param {InputAvailability} input Current badge availability.
   * @returns {string} Localized reason shared by hover and assistive descriptions.
   */
  public availabilityReason(input: InputAvailability): string {
    if (this.job().busy) { return this.translations.translate('ui.busyReason'); }
    const reason = input.reason === 'ROLE_CONFLICT' && input.family === 'media' ? 'MEDIA_SLOT_OCCUPIED' : input.reason;
    return reason ? this.translations.translate(`availability.${reason}`) : '';
  }

  /**
   * @returns {readonly {value: string; label: string}[]} Translated role choices.
   */
  public roles(): readonly {value: string; label: string}[] { return ['', ...INPUT_ROLES].map(value => ({value, label: this.translations.translate(`role.${value || 'auto'}`)})); }
  /**
   * @param {InputRole} role Auxiliary input role.
   * @returns {boolean} Whether its cardinality/dependency permits another selection.
   */
  public auxiliaryEnabled(role: InputRole): boolean {
    return !this.job().busy && this.inputs().length < 128 && this.inputs().reduce((sum, input) => sum + input.size, 0) < 2 * 1024 ** 3
      && (role === 'appendable' || !this.inputs().some(input => input.role === role))
      && (role !== 'html-assets' || this.inputs().some(input => input.role === 'html'));
  }
  /**
   * @returns {readonly {value: string; label: string}[]} Actual output variants.
   */
  public variants(): readonly {value: string; label: string}[] { return this.extensions().map(value => ({value, label: `.${value}`})); }

  /**
   * @param {string} value HTML entry path relative to supplied ZIP root.
   */
  public path(value: string): void { this.session.options = {...this.session.options, htmlPath: value || undefined, allowUnresolved: false}; this.session.refresh(); }
  /**
   * @param {boolean} checked Explicit unresolved-reference decision.
   */
  public allow(checked: boolean): void { this.session.options = {...this.session.options, allowUnresolved: checked}; this.session.refresh(); }
  /**
   * @param {'name' | 'extension'} key Remembered output preference.
   * @param {string} value User-selected metadata.
   */
  public remember(key: 'name' | 'extension', value: string): void {
    if (key === 'name') { this.name.set(outputName(value)); } else { this.extension.set(value); }
    try { localStorage.setItem(`bhw.output.${key}`, key === 'name' ? this.name() : value); } catch { /* Preferences are optional when storage is denied. */ }
  }
  /**
   * @param {number} size Binary byte count.
   * @returns {string} Compact binary-unit metadata.
   */
  public size(size: number): string { return size >= 1024 ** 3 ? `${(size / 1024 ** 3).toFixed(2)} GiB` : size >= 1024 ** 2 ? `${(size / 1024 ** 2).toFixed(2)} MiB` : `${(size / 1024).toFixed(1)} KiB`; }

  /** @returns {string} Stage-scoped measured percentage with familiar units. */
  public progressLabel(): string {
    const progress = this.job().progress;
    if (!progress?.total) { return ''; }
    const count = progress.unit === 'bytes' ? `${this.size(progress.completed)} / ${this.size(progress.total)}`
      : progress.unit === 'microseconds' ? `${(progress.completed / 1000000).toFixed(1)} / ${(progress.total / 1000000).toFixed(1)} s`
        : `${progress.completed} / ${progress.total} ${this.translations.translate('unit.inputs')}`;
    return `${Math.floor(100 * progress.completed / progress.total)}% · ${count}`;
  }

  /**
   * @returns {Promise<void>} Browser download from the file-backed artifact, without payload buffering.
   */
  public async download(): Promise<void> {
    const artifact = this.job().artifact;
    if (!artifact || this.job().busy) { return; }
    try { this.save(await this.processing.resolve(artifact), `${outputName(this.name())}.${this.selectedExtension()}`); }
    catch(error) { this.store.dispatch(jobActions.failed({diagnostic: diagnose(error)})); }
  }
  /** Downloads only allowlisted diagnostic codes and browser metadata. */
  public logs(): void { this.save(new Blob([diagnosticReport(this.job().diagnostics)], {type: 'application/json'}), 'beheader-web-diagnostics.json'); }
  /** @returns {string} Short user-initiated issue link. */
  public issue(): string { return issueUrl(this.job().diagnostics); }
  /** @returns {boolean} Whether the failure is unexpected rather than ordinary validation. */
  public unexpected(): boolean { return this.job().diagnostics.some(item => ['WORKER_FAILED', 'WORKER_PROTOCOL', 'IO_FAILURE', 'AUDIO_CONVERSION_FAILED', 'CLEANUP_FAILED'].includes(item.code)); }
  /** @returns {Promise<void>} Local redistributable example selection. */
  public async example(): Promise<void> { try { await this.session.example(); } catch(error) { this.store.dispatch(jobActions.failed({diagnostic: diagnose(error)})); } }

  /**
   * @param {string} key Preference key, independent of selected file metadata.
   * @returns {string} Saved value or empty default.
   */
  private preference(key: string): string { try { return localStorage.getItem(`bhw.output.${key}`) ?? ''; } catch { return ''; } }
  /**
   * @param {Blob} file File-backed output or small diagnostic blob.
   * @param {string} name Download name.
   */
  private save(file: Blob, name: string): void {
    const url = URL.createObjectURL(file); const link = document.createElement('a');
    link.href = url; link.download = name; document.body.append(link); link.click(); link.remove();
    setTimeout(() => { URL.revokeObjectURL(url); }, 60000);
  }
}
