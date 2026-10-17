import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ChangeDetectionStrategy, Component, ElementRef, computed, effect, input, output, signal} from '@angular/core';
import {TranslocoDirective, TranslocoService} from '@jsverse/transloco';

import {InputDescription} from '~bhw/polyglot/model/contract';
import {Choice} from '~bhw/shared/component/choice/choice';
import {IconButton} from '~bhw/shared/component/icon-button/icon-button';
import {Button} from '~bhw/shared/component/button/button';
import {TextField} from '~bhw/shared/component/text-field/text-field';

/** Metadata only; selected File objects remain with the runtime session. */
export interface FileCard extends InputDescription {readonly explicitRole: string}

/** File cards with a shared archive group, translucent drag placeholders, and keyboard reordering. */
@Component({selector: 'bhw-input-list', imports: [DragDropModule, TranslocoDirective, Choice, IconButton, Button, TextField], templateUrl: './input-list.html', styleUrl: './input-list.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class InputList {
  /** @type {InputSignal<readonly FileCard[]>} */
  public readonly inputs = input.required<readonly FileCard[]>();
  /** @type {Signal<readonly FileCard[]>} Independently sortable archives, excluding HTML asset ZIPs. */
  public readonly archives = computed<readonly FileCard[]>(() => this.inputs().filter(input => input.role === 'archive'));
  /** @type {Signal<readonly FileCard[]>} Anchor the archive group at the first archive's position. */
  public readonly cards = computed(() => this.inputs().filter(input => input.role !== 'archive' || input.id === this.archives()[0]?.id));
  /** @type {InputSignal<InputDescription | undefined>} */
  public readonly assets = input<InputDescription>();
  /** @type {InputSignal<boolean>} */
  public readonly assetsEnabled = input(true);
  /** @type {InputSignal<string>} */
  public readonly htmlPath = input('');
  /** @type {OutputEmitterRef<void>} */
  public readonly assetsRequested = output<void>();
  /** @type {OutputEmitterRef<string>} */
  public readonly assetReplaced = output<string>();
  /** @type {OutputEmitterRef<string>} */
  public readonly pathChanged = output<string>();
  /** @type {InputSignal<boolean>} */
  public readonly disabled = input(false);
  /** @type {InputSignal<readonly {value: string; label: string}[]>} */
  public readonly roles = input.required<readonly {value: string; label: string}[]>();
  /** @type {OutputEmitterRef<string>} */
  public readonly replaced = output<string>();
  /** @type {OutputEmitterRef<string>} */
  public readonly removed = output<string>();
  /** @type {OutputEmitterRef<{id: string; role: string}>} */
  public readonly assigned = output<{id: string; role: string}>();
  /** @type {OutputEmitterRef<{id: string; index: number}>} */
  public readonly reordered = output<{id: string; index: number}>();
  /** @type {WritableSignal<string | null>} */
  private readonly pendingFocus = signal<string | null>(null);

  /**
   * Restores the moved handle's focus after asynchronous reinspection releases disabled controls.
   * @param {ElementRef<HTMLElement>} host Owned file-list element.
   * @param {LiveAnnouncer} announcer Accessible ordering feedback.
   * @param {TranslocoService} translations Current locale.
   */
  public constructor(host: ElementRef<HTMLElement>, private readonly announcer: LiveAnnouncer, private readonly translations: TranslocoService) {
    effect(() => {
      const id = this.pendingFocus();
      if (id && !this.disabled()) {
        this.pendingFocus.set(null);
        queueMicrotask(() => host.nativeElement.querySelector<HTMLButtonElement>(`[data-file-id="${CSS.escape(id)}"] .drag-handle button`)?.focus());
      }
    });
  }

  /**
   * @param {CdkDragDrop<readonly FileCard[]>} event Position after pointer/touch sorting.
   */
  public drop(event: CdkDragDrop<readonly FileCard[]>): void { this.move(event.previousIndex, event.currentIndex); }

  /**
   * @param {Event} event Arrow key on the dedicated handle.
   * @param {string} id Selected archive.
   * @param {number} direction One position up/down.
   */
  public keyboard(event: Event, id: string, direction: number): void {
    event.preventDefault(); event.stopPropagation();
    const index = this.archives().findIndex(input => input.id === id);
    this.move(index, index + direction, true);
  }

  /**
   * @param {number} size Binary input byte count.
   * @returns {string} Compact metadata, independent of content previews.
   */
  public size(size: number): string { return size >= 1024 ** 3 ? `${(size / 1024 ** 3).toFixed(2)} GiB` : size >= 1024 ** 2 ? `${(size / 1024 ** 2).toFixed(2)} MiB` : `${(size / 1024).toFixed(1)} KiB`; }

  /**
   * @param {number} previous Old archive index.
   * @param {number} current New archive index.
   * @param {boolean} restoreFocus Whether the keyboard action needs focus restoration.
   */
  private move(previous: number, current: number, restoreFocus = false): void {
    const card = this.archives()[previous];
    if (this.disabled() || !card || previous === current || current < 0 || current >= this.archives().length) { return; }
    if (restoreFocus) { this.pendingFocus.set(card.id); }
    this.reordered.emit({id: card.id, index: current});
    void this.announcer.announce(this.translations.translate('ui.reordered', {position: current + 1, count: this.archives().length}));
  }
}
