import {createActionGroup, createFeature, createReducer, on, props} from '@ngrx/store';

import {ArtifactReference, CompositionPlan, Diagnostic, Interpretation, JobProgress, OperationResult} from '~bhw/polyglot/model/contract';

/** Serializable lifecycle state; runtime files and download URLs live in GeneratorSession. */
export interface JobState {
  readonly busy: boolean;
  readonly plan: CompositionPlan | null;
  readonly progress: JobProgress | null;
  readonly diagnostics: readonly Diagnostic[];
  readonly artifact: ArtifactReference | null;
  readonly interpretations: readonly Interpretation[];
}

/** UI intent and safe worker outcomes contain no File/stream/worker objects. */
export const jobActions = createActionGroup({source: 'Generator job', events: {
  'Requested': props<{operation: 'refresh' | 'generate'}>(),
  'Progressed': props<{progress: JobProgress}>(),
  'Finished': props<{result: OperationResult | null}>(),
  'Failed': props<{diagnostic: Diagnostic}>(),
  'Cancel requested': props<Record<string, never>>()
}});

/** Fresh visits have no saved selection or output artifact. */
const initial: JobState = {busy: false, plan: null, progress: null, diagnostics: [], artifact: null, interpretations: []};

/** Terminal failures retain a valid plan for retry; changed selections clear stale artifacts immediately. */
export const jobFeature = createFeature({name: 'job', reducer: createReducer(initial,
  on(jobActions.requested, (state, {operation}) => ({...state, busy: true, progress: null, diagnostics: [], artifact: null, interpretations: [], ...(operation === 'refresh' ? {plan: null} : {})})),
  on(jobActions.progressed, (state, {progress}) => state.busy ? {...state, progress} : state),
  on(jobActions.finished, (state, {result}) => ({...state, busy: false, progress: null,
    ...(result?.operation === 'plan' ? {plan: result.plan, diagnostics: result.plan.diagnostics} : {}),
    ...(result?.operation === 'generate' ? {artifact: result.artifact, interpretations: result.interpretations} : {})})),
  on(jobActions.failed, (state, {diagnostic}) => ({...state, busy: false, progress: null, diagnostics: [diagnostic]}))
)});
