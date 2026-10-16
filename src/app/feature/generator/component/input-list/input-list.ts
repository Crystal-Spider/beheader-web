import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ChangeDetectionStrategy, Component, ElementRef, effect, input, output, signal} from '@angular/core';
import {TranslocoDirective, TranslocoService} from '@jsverse/transloco';

import {InputDescription} from '~bhw/polyglot/model/contract';
import {Choice} from '~bhw/shared/component/choice/choice';
import {IconButton} from '~bhw/shared/component/icon-button/icon-button';

/** Metadata only; selected File objects remain with the runtime session. */
export interface FileCard extends InputDescription {readonly explicitRole: string}

/** File cards with GoLT-style vertical handles, translucent placeholders, and keyboard reordering. */
@Component({selector: 'bhw-input-list', imports: [DragDropModule, TranslocoDirective, Choice, IconButton], templateUrl: './input-list.html', styleUrl: './input-list.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class InputList {
  /** @type {InputSignal<readonly FileCard[]>} */
  public readonly inputs = input.required<readonly FileCard[]>();
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
   * @param {number} index Selected position.
   * @param {number} direction One position up/down.
   */
  public keyboard(event: Event, index: number, direction: number): void { event.preventDefault(); event.stopPropagation(); this.move(index, index + direction, true); }

  /**
   * @param {number} size Binary input byte count.
   * @returns {string} Compact metadata, independent of content previews.
   */
  public size(size: number): string { return size >= 1024 ** 3 ? `${(size / 1024 ** 3).toFixed(2)} GiB` : size >= 1024 ** 2 ? `${(size / 1024 ** 2).toFixed(2)} MiB` : `${(size / 1024).toFixed(1)} KiB`; }

  /**
   * @param {number} previous Old selected index.
   * @param {number} current New selected index.
   * @param {boolean} restoreFocus Whether the keyboard action needs focus restoration.
   */
  private move(previous: number, current: number, restoreFocus = false): void {
    const card = this.inputs()[previous];
    if (this.disabled() || !card || previous === current || current < 0 || current >= this.inputs().length) { return; }
    if (restoreFocus) { this.pendingFocus.set(card.id); }
    this.reordered.emit({id: card.id, index: current});
    void this.announcer.announce(this.translations.translate('ui.reordered', {position: current + 1, count: this.inputs().length}));
  }
}
