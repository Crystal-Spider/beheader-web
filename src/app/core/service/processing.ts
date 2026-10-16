import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

import {JobProgress, OperationRequest, OperationResult} from '~bhw/polyglot/model/contract';
import {cleanupJob} from '~bhw/polyglot/io/temporary-storage';
import {WorkerClient} from '~bhw/polyglot/worker/worker-client';

/** Runtime worker ownership; files, streams, and handles never enter the application store. */
@Injectable({providedIn: 'root'})
export class Processing implements OnDestroy {
  /** @type {Subject<JobProgress>} */
  private readonly updates = new Subject<JobProgress>();
  /** @type {Observable<JobProgress>} */
  public readonly progress = this.updates.asObservable();
  /** @type {WorkerClient} */
  private readonly client = new WorkerClient(
    () => new Worker(new URL('../worker/processing.worker', import.meta.url), {type: 'module'}),
    cleanupJob
  );

  /**
   * Starts the requested core operation when no other job is active.
   * @param {OperationRequest} request Files and explicit role overrides.
   * @returns {Promise<OperationResult>} Serializable operation outcome.
   */
  public run(request: OperationRequest): Promise<OperationResult> {
    return this.client.run(request, progress => { this.updates.next(progress); });
  }

  /** @returns {Promise<void>} Completion after forced cancellation and job cleanup. */
  public cancel(): Promise<void> { return this.client.cancel(); }

  /** Terminates in-flight work when the application owner is destroyed. */
  public ngOnDestroy(): void {
    void this.client.cancel();
    this.updates.complete();
  }
}
