import {Injectable, OnDestroy, signal} from '@angular/core';
import {Subject} from 'rxjs';

import {ArtifactReference, Diagnostic, JobProgress, OperationRequest, OperationResult} from '~bhw/polyglot/model/contract';
import {cleanupJob, resolveArtifact} from '~bhw/polyglot/io/temporary-storage';
import {WorkerClient} from '~bhw/polyglot/worker/worker-client';
import {startStorageSession} from '~bhw/polyglot/io/storage-session';
import {diagnose, ProcessingError} from '~bhw/polyglot/logic/diagnostic';

/** Runtime worker ownership; files, streams, and handles never enter the application store. */
@Injectable({providedIn: 'root'})
export class Processing implements OnDestroy {
  /** @type {WritableSignal<Diagnostic | null>} */
  private readonly maintenance = signal<Diagnostic | null>(null);
  /** @type {Signal<Diagnostic | null>} */
  public readonly storageDiagnostic = this.maintenance.asReadonly();
  /** @type {number} */
  private revision = 0;
  /** @type {Promise<StorageSession>} */
  private readonly storageSession = startStorageSession().catch(error => ({release: () => {}, diagnostic: diagnose(error, 'CLEANUP_FAILED')}));
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
    const revision = this.revision;
    const session = await this.storageSession;
    if (session.diagnostic) { this.maintenance.set(session.diagnostic); }
    if (revision !== this.revision) { throw new ProcessingError({code: 'CANCELLED', severity: 'info'}); }
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
  public cancel(): Promise<void> { this.revision++; return this.client.cancel(); }

  /** Terminates in-flight work when the application owner is destroyed. */
  public ngOnDestroy(): void {
    const retained = [...this.retained];
    // Keep the cross-tab lease until teardown has stopped workers and attempted owned cleanup.
    void this.cancel().then(() => Promise.allSettled(retained.map(jobId => cleanupJob(jobId))))
      .finally(async() => { (await this.storageSession).release(); }).catch(() => {});
    this.retained.clear();
    this.updates.complete();
  }
}
