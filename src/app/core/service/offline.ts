import {Injectable, OnDestroy, signal} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {jobFeature} from '~bhw/feature/generator/redux/job';

/** Prefetched production assets support reopening; updates require an explicit idle reload. */
@Injectable({providedIn: 'root'})
export class Offline implements OnDestroy {
  /** @type {WritableSignal<boolean>} */
  public readonly ready = signal(false);
  /** @type {WritableSignal<boolean>} */
  public readonly update = signal(false);
  /** @type {Signal<boolean>} */
  private readonly busy;
  /** @type {Subscription} */
  private readonly events = new Subscription();

  /**
   * @param {SwUpdate} updates Angular's versioned service-worker protocol.
   * @param {Store} store Active-job gate.
   */
  public constructor(updates: SwUpdate, store: Store) {
    this.busy = store.selectSignal(jobFeature.selectBusy);
    if (!updates.isEnabled) { return; }
    this.events.add(updates.versionUpdates.subscribe(event => { if (event.type === 'VERSION_READY') { this.update.set(true); } }));
    this.events.add(updates.unrecoverable.subscribe(() => { this.update.set(true); }));
    void navigator.serviceWorker.ready.then(async() => {
      if (navigator.onLine) { await updates.checkForUpdate(); }
      this.ready.set(true);
    }).catch(() => { this.ready.set(false); });
  }

  /** Reloading keeps versioned lazy chunks consistent and never interrupts an active job. */
  public apply(): void { if (this.update() && !this.busy()) { location.reload(); } }

  /** Releases event subscriptions; the browser owns the installed cache lifetime. */
  public ngOnDestroy(): void { this.events.unsubscribe(); }
}
