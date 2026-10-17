import {ChangeDetectionStrategy, Component, HostListener, signal} from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';

import {SparkleTrail} from '~bhw/feature/generator/component/sparkle-trail/sparkle-trail';
import {Icon} from '~bhw/shared/component/icon/icon';
import {IconButton} from '~bhw/shared/component/icon-button/icon-button';

/** A persistent guide control with a one-time, motion-aware invitation. */
@Component({selector: 'bhw-title-card', imports: [TranslocoDirective, Icon, IconButton, SparkleTrail], templateUrl: './title-card.html', styleUrl: './title-card.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class TitleCard {
  /** @type {WritableSignal<boolean>} */
  public readonly flipped = signal(false);
  /** @type {WritableSignal<boolean>} */
  public readonly inviting = signal(false);

  /** Highlights the shared control on the first visit unless reduced motion is requested. */
  public constructor() {
    let seen = false;
    try { seen = localStorage.getItem('bhw.hero-introduced') === 'true'; } catch { /* Keep the current visit usable without preference storage. */ }
    this.inviting.set(!seen && !matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /** Explicit activation changes faces; hovering never changes the content. */
  public toggle(): void {
    this.flipped.update(value => !value);
    this.completeHint();
  }

  /** Stops the looping invitation after explicit use, independently of selected files. */
  public completeHint(): void {
    this.inviting.set(false);
    try { localStorage.setItem('bhw.hero-introduced', 'true'); } catch { /* Repeat only on a later visit when storage is unavailable. */ }
  }

  /**
   * Escape closes the guide while retaining focus on the existing toggle.
   * @param {Event} event Keyboard event from within the card.
   */
  @HostListener('keydown.escape', ['$event'])
  public dismiss(event: Event): void {
    if (!this.flipped()) { return; }
    event.preventDefault();
    this.flipped.set(false);
    this.completeHint();
  }

}
