import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, catchError, defer, exhaustMap, from, map, of} from 'rxjs';

import {Processing} from '~bhw/core/service/processing';
import {diagnose} from '~bhw/polyglot/logic/diagnostic';
import {GeneratorSession} from '../service/generator-session';
import {jobActions} from './job';

/** Serializes UI operations and maps worker events to serializable NgRx actions. */
@Injectable()
export class JobEffects {
  /** @type {Observable<Action>} */
  public readonly run;
  /** @type {Observable<Action>} */
  public readonly progress;
  /** @type {Observable<Action>} */
  public readonly cancel;

  /**
   * @param {Actions} actions User intents.
   * @param {GeneratorSession} session Runtime file owner.
   * @param {Processing} processing Worker lifecycle.
   */
  public constructor(actions: Actions, session: GeneratorSession, processing: Processing) {
    this.run = createEffect(() => actions.pipe(ofType(jobActions.requested), exhaustMap(({operation}) => defer(() => session.run(operation)).pipe(map(result => jobActions.finished({result})), catchError(error => of(jobActions.failed({diagnostic: diagnose(error, 'WORKER_FAILED')})))))));
    this.progress = createEffect(() => processing.progress.pipe(map(progress => jobActions.progressed({progress}))));
    // The owning run effect receives cancellation/cleanup failures through its rejected operation.
    this.cancel = createEffect(() => actions.pipe(ofType(jobActions.cancelRequested), exhaustMap(() => from(session.cancel()).pipe(catchError(() => EMPTY)))), {dispatch: false});
  }
}
