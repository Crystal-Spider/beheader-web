import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

import {ArtifactReference, JobProgress, OperationRequest, OperationResult} from '~bhw/polyglot/model/contract';
import {cleanupJob, resolveArtifact} from '~bhw/polyglot/io/temporary-storage';
import {WorkerClient} from '~bhw/polyglot/worker/worker-client';

/** Runtime worker ownership; files, streams, and handles never enter the application store. */
@Injectable({providedIn: 'root'})
export class Processing implements OnDestroy {
  /** @type {Subject<JobProgress>} */
  private readonly updates = new Subject<JobProgress>();
  /** @type {Observable<JobProgress>} */
  public readonly progress = this.updates.asObservable();
  /** @type {Set<string>} */
  private readonly retained = new Set<string>();
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
  public async run(request: OperationRequest): Promise<OperationResult> {
    const result = await this.client.run(request, progress => { this.updates.next(progress); });
    if (result.operation === 'generate') { this.retained.add(result.artifact.jobId); }
    return result;
  }

  /**
   * @param {ArtifactReference} artifact Retained output reference.
   * @returns {Promise<File>} File-backed download source.
   */
  public resolve(artifact: ArtifactReference): Promise<File> { return resolveArtifact(artifact); }

  /**
   * @param {ArtifactReference} artifact Output no longer needed by the interface.
   * @returns {Promise<void>} Completion of explicit result disposal.
   */
  public async release(artifact: ArtifactReference): Promise<void> {
    await cleanupJob(artifact.jobId);
    this.retained.delete(artifact.jobId);
  }

  /** @returns {Promise<void>} Completion after forced cancellation and job cleanup. */
  public cancel(): Promise<void> { return this.client.cancel(); }

  /** Terminates in-flight work when the application owner is destroyed. */
  public ngOnDestroy(): void {
    void this.client.cancel();
    void Promise.allSettled([...this.retained].map(jobId => cleanupJob(jobId)));
    this.retained.clear();
    this.updates.complete();
  }
}
