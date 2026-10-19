import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, afterRenderEffect, computed, signal, viewChild} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoDirective, TranslocoService} from '@jsverse/transloco';
import {Store} from '@ngrx/store';

import {Button} from '~bhw/shared/component/button/button';
import {Choice} from '~bhw/shared/component/choice/choice';
import {TextField} from '~bhw/shared/component/text-field/text-field';
import {Icon} from '~bhw/shared/component/icon/icon';
import {Header} from '~bhw/core/component/header/header';
import {Footer} from '~bhw/core/component/footer/footer';
import {Processing} from '~bhw/core/service/processing';
import {InputRole} from '~bhw/polyglot/model/contract';
import {InputAvailability} from '~bhw/polyglot/logic/availability';
import {INPUT_ROLES} from '~bhw/polyglot/logic/inspect';
import {blocksGeneration, diagnose} from '~bhw/polyglot/logic/diagnostic';
import {INPUT_COUNT_LIMIT, TOTAL_INPUT_LIMIT} from '~bhw/polyglot/io/bytes';
import {selectionFeature} from './redux/selection';
import {jobActions, jobFeature} from './redux/job';
import {GeneratorSession} from './service/generator-session';
import {diagnosticReport, issueUrl, outputName} from './logic/diagnostics';
import {InputList} from './component/input-list/input-list';
import {TitleCard} from './component/title-card/title-card';
import {Messages, MessageState} from './component/messages/messages';
import {JobProgress} from './component/job-progress/job-progress';
import {diagnosticMessage} from './logic/diagnostic-message';

/** Complete local generator: metadata controls only, without uploaded-content previews. */
@Component({selector: 'bhw-generator', imports: [TranslocoDirective, Button, Choice, TextField, InputList, Icon, Header, Footer, TitleCard, Messages, JobProgress, MatTooltipModule], templateUrl: './generator.html', styleUrl: './generator.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class Generator {
  /** @type {Signal<readonly InputAvailability[]>} */
  public readonly availability;
  /** @type {Signal<string>} */
  public readonly accepted;
  /** @type {Signal<readonly InputDescription[]>} */
  public readonly inputs;
  /** @type {Signal<readonly FileCard[]>} */
  public readonly cards;
  /** @type {Signal<InputDescription | undefined>} */
  public readonly assets;
  /** @type {Signal<boolean>} */
  public readonly assetsEnabled;
  /** @type {Signal<JobState>} */
  public readonly job;
  /** @type {Signal<boolean>} Quick readiness does not advertise full format validity. */
  public readonly canCombine;
  /** @type {Signal<boolean>} Immediate during generation; retains cancellation for a visible selection check. */
  public readonly canCancel;
  /** @type {Signal<JobProgress | undefined>} */
  private readonly progressPanel = viewChild(JobProgress);
  /** @type {Signal<ElementRef<HTMLElement> | undefined>} */
  private readonly filePlaceholder = viewChild<ElementRef<HTMLElement>>('filePlaceholder');
  /** @type {WritableSignal<boolean>} */
  public readonly pickerStacked = signal(false);
  /** @type {WritableSignal<boolean>} Only the latest example request controls generation readiness. */
  public readonly exampleLoading = signal(false);
  /** @type {number} */
  private exampleRevision = 0;
  /**
   * Visible outcomes, including storage maintenance; selection guidance lives in the button tooltip.
   * @type {Signal<readonly Diagnostic[]>}
   */
  public readonly diagnostics;
  /** @type {Signal<boolean>} */
  public readonly hasErrors;
  /** @type {Signal<MessageState>} */
  public readonly messageState;
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

  /**
   * @param {Processing} processing Runtime worker and output owner.
   * @param {GeneratorSession} session Ephemeral file selection.
   * @param {Store} store Serializable state.
   * @param {TranslocoService} translations Runtime text.
   * @param {ChangeDetectorRef} changeDetector Commits drop ordering before the next browser paint.
   */
  public constructor(public readonly processing: Processing, public readonly session: GeneratorSession, private readonly store: Store, private readonly translations: TranslocoService, private readonly changeDetector: ChangeDetectorRef) {
    this.availability = store.selectSignal(selectionFeature.selectAvailability);
    this.accepted = store.selectSignal(selectionFeature.selectAcceptedTypes);
    this.inputs = store.selectSignal(selectionFeature.selectInputs);
    this.cards = computed(() => this.inputs().filter(input => input.role !== 'html-assets' || !this.inputs().some(item => item.role === 'html')).map(input => ({...input, explicitRole: this.session.role(input.id)})));
    this.assets = computed(() => this.inputs().find(input => input.role === 'html-assets'));
    this.assetsEnabled = computed(() => this.inputs().length < INPUT_COUNT_LIMIT && this.inputs().reduce((sum, input) => sum + input.size, 0) < TOTAL_INPUT_LIMIT);
    this.job = store.selectSignal(jobFeature.selectJobState);
    this.canCancel = computed(() => this.job().busy && (this.job().operation === 'generate' || !!this.progressPanel()?.visible()));
    this.canCombine = computed(() => !this.exampleLoading() && !!this.job().selection?.canCombine && !this.job().plan?.diagnostics.some(blocksGeneration));
    this.diagnostics = computed(() => {
      const maintenance = this.processing.storageDiagnostic();
      const diagnostics = this.job().diagnostics.filter(item => item.code !== 'MINIMUM_FAMILIES');
      if (this.job().plan?.references?.length && !diagnostics.some(item => item.code === 'HTML_UNRESOLVED')) { diagnostics.push({code: 'HTML_UNRESOLVED', severity: this.session.options.allowUnresolved ? 'warning' : 'error'}); }
      if (this.job().plan?.collisions?.length && !diagnostics.some(item => item.code === 'ARCHIVE_COLLISION')) { diagnostics.push({code: 'ARCHIVE_COLLISION', severity: 'warning'}); }
      return maintenance && !diagnostics.some(item => item.code === maintenance.code) ? [maintenance, ...diagnostics] : diagnostics;
    });
    this.hasErrors = computed(() => this.diagnostics().some(item => item.severity === 'error'));
    this.messageState = computed<MessageState>(() => ({inputs: this.inputs(), diagnostics: this.diagnostics(), references: this.job().plan?.references ?? [], collisions: this.job().plan?.collisions ?? this.job().selection?.collisions ?? [], largeBytes: this.job().plan?.resources?.large ? this.job().plan!.resources!.temporaryBytes : null, allowUnresolved: !!this.session.options.allowUnresolved, busy: this.job().busy, issue: this.hasErrors() ? this.issue() : ''}));
    this.extensions = computed(() => this.job().interpretations.flatMap(item => item.extensions));
    this.selectedExtension = computed(() => this.extensions().includes(this.extension()) ? this.extension() : this.extensions()[0] ?? '');
    afterRenderEffect(onCleanup => {
      const placeholder = this.filePlaceholder()?.nativeElement;
      if (!placeholder) { return; }
      const measure = (): void => {
        const button = placeholder.querySelector('button')!;
        const content = button.querySelector('.button-content')!;
        const copy = placeholder.querySelector('.file-copy')!;
        const icon = placeholder.querySelector('.upload-icon')!;
        const invitation = placeholder.querySelector('.file-invitation')!;
        const range = document.createRange(); range.selectNodeContents(content);
        const style = getComputedStyle(button);
        const box = getComputedStyle(placeholder);
        const buttonWidth = Math.max(parseFloat(style.minWidth) || 0, range.getBoundingClientRect().width + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth));
        // Keep a readable text column; translations and font loading determine the button's actual width.
        const required = icon.getBoundingClientRect().width + parseFloat(getComputedStyle(invitation).columnGap) + parseFloat(getComputedStyle(copy).flexBasis) + parseFloat(box.columnGap) + buttonWidth;
        this.pickerStacked.set(required > placeholder.clientWidth - parseFloat(box.paddingLeft) - parseFloat(box.paddingRight));
      };
      const observer = new ResizeObserver(measure);
      observer.observe(placeholder);
      placeholder.querySelectorAll('.button-content, h3, p').forEach(content => observer.observe(content));
      measure(); onCleanup(() => observer.disconnect());
    });
  }

  /**
   * @param {HTMLInputElement} picker Hidden native file chooser.
   * @param {InputAvailability | InputRole | undefined} role Optional role-specific selection.
   * @param {string | undefined} replacing Replacement input ID.
   */
  public choose(picker: HTMLInputElement, role?: InputAvailability | InputRole, replacing?: string): void {
    if (this.job().busy) { return; }
    const selection = role ?? (replacing ? this.session.role(replacing) || undefined : undefined);
    this.pickingRole = typeof selection === 'string' ? selection : selection?.family;
    this.replacing = replacing;
    // Replacement includes the occupied slot's extensions and retains an explicit role.
    this.pickerAccept = typeof selection === 'object' ? selection.accept.join(',') : selection === 'html-assets' ? '.zip'
      : selection ? this.availability().filter(item => item.family === selection).flatMap(item => item.accept).join(',')
        : replacing ? this.availability().flatMap(item => item.accept).join(',') : this.accepted();
    picker.accept = this.pickerAccept; picker.multiple = !replacing && selection !== 'html-assets'; picker.click();
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

  /** Starts full validation and generation after cheap selection checks pass. */
  public generate(): void { if (!this.job().busy && this.canCombine()) { this.store.dispatch(jobActions.requested({operation: 'generate'})); } }
  /** Requests termination through the worker lifecycle effect. */
  public cancel(): void { this.store.dispatch(jobActions.cancelRequested({})); }

  /**
   * @param {{id: string; index: number}} event Pointer or keyboard ordering intent.
   * @param {string} event.id Selected file identity.
   * @param {number} event.index Target archive position.
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

  /** @returns {string} Localized explanation for pointer and keyboard users of the disabled action. */
  public combineReason(): string {
    if (this.exampleLoading()) { return this.translations.translate('ui.loadingExample'); }
    if (this.job().busy) { return this.translations.translate('ui.busyReason'); }
    if (this.canCombine()) { return ''; }
    const key = this.hasErrors() ? 'checkErrors' : this.diagnostics().some(blocksGeneration) ? 'checkWarnings' : 'minimumTypes';
    return this.translations.translate(`ui.${key}`);
  }

  /**
   * @returns {readonly {value: string; label: string}[]} Translated role choices.
   */
  public roles(): readonly {value: string; label: string}[] { return ['', ...INPUT_ROLES.filter(role => role !== 'html-assets')].map(value => ({value, label: this.translations.translate(`role.${value || 'auto'}`)})); }
  /**
   * @returns {readonly {value: string; label: string}[]} Actual output variants.
   */
  public variants(): readonly {value: string; label: string}[] { return this.extensions().map(value => ({value, label: `.${value}`})); }

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

  /**
   * @returns {Promise<void>} Browser download from the file-backed artifact, without payload buffering.
   */
  public async download(): Promise<void> {
    const artifact = this.job().artifact;
    if (!artifact || this.job().busy) { return; }
    try { this.save(await this.processing.resolve(artifact), `${outputName(this.name())}.${this.selectedExtension()}`); }
    catch(error) { this.store.dispatch(jobActions.failed({diagnostic: diagnose(error)})); }
  }
  /** Downloads allowlisted codes, translated PDF reasons and browser metadata. */
  public logs(): void { if (this.hasErrors()) { this.save(new Blob([diagnosticReport(this.diagnostics(), diagnostic => diagnosticMessage(diagnostic, (key, parameters) => this.translations.translate(key, parameters)))], {type: 'application/json'}), 'beheader-web-diagnostics.json'); } }
  /** @returns {string} Short user-initiated issue link. */
  public issue(): string { return issueUrl(this.diagnostics()); }
  /** @returns {Promise<void>} Local redistributable example selection. */
  public async example(): Promise<void> {
    const revision = ++this.exampleRevision;
    this.exampleLoading.set(true);
    try { await this.session.example(); }
    catch(error) { if (revision === this.exampleRevision) { this.store.dispatch(jobActions.failed({diagnostic: diagnose(error)})); } }
    finally { if (revision === this.exampleRevision) { this.exampleLoading.set(false); } }
  }

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
