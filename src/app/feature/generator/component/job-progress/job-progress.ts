import {ChangeDetectionStrategy, Component, DestroyRef, computed, effect, input, signal} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslocoDirective} from '@jsverse/transloco';

import {JobProgress as ProgressEvent} from '~bhw/polyglot/model/contract';
import {progressTime} from '../../logic/progress';
import {ProgressVisibility} from '../../logic/progress-visibility';

/** Overall work estimate plus measured step activity; no invented progress during unobservable work. */
@Component({selector: 'bhw-job-progress', imports: [TranslocoDirective, MatProgressBarModule], templateUrl: './job-progress.html', styleUrl: './job-progress.scss', changeDetection: ChangeDetectionStrategy.OnPush, host: {'[class.visible]': 'visible()'}})
export class JobProgress {
  /** @type {InputSignal<ProgressEvent | null>} */
  public readonly progress = input<ProgressEvent | null>(null);
  /** @type {InputSignal<number>} */
  public readonly percentage = input(0);
  /** @type {InputSignal<'refresh' | 'generate' | null>} */
  public readonly operation = input<'refresh' | 'generate' | null>(null);
  /** @type {InputSignal<boolean>} */
  public readonly busy = input(false);
  /** @type {InputSignal<boolean>} */
  public readonly failed = input(false);
  /** @type {InputSignal<number>} */
  public readonly revision = input(0);
  /** @type {WritableSignal<boolean>} */
  public readonly visible = signal(false);
  /** @type {WritableSignal<ProgressEvent | null>} */
  public readonly event = signal<ProgressEvent | null>(null);
  /** @type {WritableSignal<number>} */
  public readonly now = signal(Date.now());
  /** @type {WritableSignal<number>} */
  private readonly started = signal(Date.now());
  /** @type {WritableSignal<number>} */
  private readonly stepStarted = signal(Date.now());
  /** @type {WritableSignal<number>} */
  private readonly updated = signal(Date.now());
  /** @type {Signal<boolean>} */
  public readonly waiting = computed(() => this.busy() && (!this.event()?.total || this.now() - this.updated() > 1500));
  /** @type {Signal<string>} */
  public readonly elapsed = computed(() => progressTime(this.now() - this.started()));
  /** @type {Signal<string | null>} */
  public readonly remaining = computed(() => {
    const progress = this.event();
    const elapsed = this.now() - this.stepStarted();
    const fraction = progress?.total ? progress.completed / progress.total : 0;
    return this.busy() && !this.waiting() && elapsed >= 2000 && fraction >= 0.02 && fraction < 0.98 ? progressTime(Math.ceil(elapsed * (1 - fraction) / fraction / 5000) * 5000) : null;
  });

  /** @param {DestroyRef} destroy Release the live clock when the job ends. */
  public constructor(destroy: DestroyRef) {
    let stage: ProgressEvent['stage'] | undefined;
    let revision = -1;
    let clock: ReturnType<typeof setInterval> | undefined;
    const visibility = new ProgressVisibility(visible => {
      this.visible.set(visible);
      if (!visible && !this.busy()) { clearInterval(clock); clock = undefined; }
    });
    effect(() => {
      const progress = this.progress();
      const now = Date.now();
      if (revision !== this.revision()) { revision = this.revision(); stage = undefined; this.started.set(now); this.stepStarted.set(now); this.now.set(now); }
      if (this.busy()) {
        this.event.set(progress); this.updated.set(now);
        if (progress?.stage !== stage) { stage = progress?.stage; this.stepStarted.set(now); }
        clock ??= setInterval(() => this.now.set(Date.now()), 500);
      } else { this.now.set(now); clearInterval(clock); clock = undefined; }
      visibility.update(revision, this.busy(), this.failed());
      if (!this.busy() && !visibility.visible) { clearInterval(clock); clock = undefined; }
    });
    destroy.onDestroy(() => { visibility.dispose(); clearInterval(clock); });
  }

  /** @returns {number} Estimated whole-operation percentage, matching the bar. */
  public percent(): number { return Math.floor(this.percentage()); }
}
