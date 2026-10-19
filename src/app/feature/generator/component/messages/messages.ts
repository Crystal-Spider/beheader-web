import {ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterRenderEffect, computed, effect, input, output, signal, viewChild} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TranslocoDirective} from '@jsverse/transloco';

import {ArchiveCollision, Diagnostic, HtmlReference, InputDescription} from '~bhw/polyglot/model/contract';
import {TranslocoService} from '@jsverse/transloco';
import {diagnosticMessage} from '../../logic/diagnostic-message';
import {Button} from '~bhw/shared/component/button/button';

/** Serializable message content retained until refreshed results arrive and while its section closes. */
export interface MessageState {
  readonly inputs: readonly InputDescription[];
  readonly diagnostics: readonly Diagnostic[];
  readonly references: readonly HtmlReference[];
  readonly collisions: readonly ArchiveCollision[];
  readonly largeBytes: number | null;
  readonly allowUnresolved: boolean;
  readonly busy: boolean;
  readonly issue: string;
}

const EMPTY: MessageState = {inputs: [], diagnostics: [], references: [], collisions: [], largeBytes: null, allowUnresolved: false, busy: false, issue: ''};

/** Dedicated feedback section, replacing settled results without closing between requests. */
@Component({selector: 'bhw-messages', imports: [TranslocoDirective, MatCheckboxModule, Button], templateUrl: './messages.html', styleUrl: './messages.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class Messages {
  /** @type {InputSignal<MessageState>} */
  public readonly state = input.required<MessageState>();
  /** @type {WritableSignal<MessageState>} */
  public readonly displayed = signal(EMPTY);
  /** @type {WritableSignal<boolean>} */
  public readonly expanded = signal(false);
  /** @type {Signal<boolean>} */
  public readonly errors = computed(() => this.displayed().diagnostics.some(item => item.severity === 'error'));
  /** @type {OutputEmitterRef<boolean>} */
  public readonly allowed = output<boolean>();
  /** @type {OutputEmitterRef<void>} */
  public readonly logs = output<void>();
  /** @type {Signal<ElementRef<HTMLElement> | undefined>} */
  private readonly reportActions = viewChild<ElementRef<HTMLElement>>('reportActions');
  /** @type {WritableSignal<boolean>} */
  public readonly stacked = signal(false);

  /**
   * @param {DestroyRef} destroy Lifetime of the delayed closing snapshot.
   * @param {TranslocoService} translations Current-language explanations.
   */
  public constructor(destroy: DestroyRef, private readonly translations: TranslocoService) {
    let closing: ReturnType<typeof setTimeout> | undefined;
    effect(() => {
      const state = this.state();
      clearTimeout(closing);
      if (state.busy) { return; }
      const present = !!state.diagnostics.length || state.largeBytes !== null;
      if (present) { this.displayed.set(state); }
      this.expanded.set(present);
      if (!present) { closing = setTimeout(() => this.displayed.set(EMPTY), 300); }
    });
    destroy.onDestroy(() => clearTimeout(closing));
    afterRenderEffect(onCleanup => {
      const actions = this.reportActions()?.nativeElement;
      if (!actions) { return; }
      const measure = (): void => {
        const widths = [...actions.querySelectorAll<HTMLElement>('button, a')].map(button => {
          const content = button.querySelector('.button-content');
          if (!content) { return 0; }
          const range = document.createRange(); range.selectNodeContents(content);
          const style = getComputedStyle(button);
          return Math.max(parseFloat(style.minWidth) || 0, range.getBoundingClientRect().width + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth));
        });
        this.stacked.set(widths.reduce((sum, width) => sum + width, 0) + parseFloat(getComputedStyle(actions).columnGap) > actions.clientWidth);
      };
      const observer = new ResizeObserver(measure);
      observer.observe(actions);
      actions.querySelectorAll('.button-content').forEach(content => observer.observe(content));
      measure(); onCleanup(() => observer.disconnect());
    });
  }

  /** @returns {string} Compact binary storage estimate. */
  public storage(): string { return `${((this.displayed().largeBytes ?? 0) / 1024 ** 3).toFixed(2)} GiB`; }

  /**
   * @param {Diagnostic} diagnostic Safe outcome.
   * @returns {string} Current-language explanation.
   */
  public message(diagnostic: Diagnostic): string { return diagnosticMessage(diagnostic, (key, parameters) => this.translations.translate(key, parameters)); }

  /**
   * @param {string | undefined} id Metadata identity.
   * @returns {string} Local-only filename, never an export field.
   */
  public inputName(id: string | undefined): string { return this.displayed().inputs.find(input => input.id === id)?.name ?? ''; }
}
