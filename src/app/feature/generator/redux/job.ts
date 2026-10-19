import {createActionGroup, createFeature, createReducer, on, props} from '@ngrx/store';

import {ArtifactReference, CompositionPlan, Diagnostic, Interpretation, JobProgress, OperationResult, SelectionCheck} from '~bhw/polyglot/model/contract';
import {checkSelection} from '~bhw/polyglot/logic/selection';
import {overallProgress} from '../logic/progress';

/** Serializable lifecycle state; runtime files and download URLs live in GeneratorSession. */
export interface JobState {
  readonly busy: boolean;
  readonly failed: boolean;
  readonly revision: number;
  readonly selection: SelectionCheck | null;
  readonly plan: CompositionPlan | null;
  readonly progress: JobProgress | null;
  readonly operation: 'refresh' | 'generate' | null;
  readonly percentage: number;
  readonly diagnostics: readonly Diagnostic[];
  readonly artifact: ArtifactReference | null;
  readonly interpretations: readonly Interpretation[];
}

/** UI intent and safe worker outcomes contain no File/stream/worker objects. */
export const jobActions = createActionGroup({source: 'Generator job', events: {
  'Requested': props<{operation: 'refresh' | 'generate'}>(),
  'Progressed': props<{progress: JobProgress}>(),
  'Finished': props<{result: OperationResult | null}>(),
  'Failed': props<{diagnostic: Diagnostic; plan?: CompositionPlan}>(),
  'Cancel requested': props<Record<string, never>>()
}});

/** Fresh visits have no saved selection or output artifact. */
const initial: JobState = {busy: false, failed: false, revision: 0, selection: null, plan: null, progress: null, operation: null, percentage: 0, diagnostics: [], artifact: null, interpretations: []};

/** Terminal failures retain validation feedback; selection changes clear stale plans and artifacts. */
export const jobFeature = createFeature({name: 'job', reducer: createReducer(initial,
  on(jobActions.requested, (state, {operation}) => ({...state, busy: true, failed: false, revision: state.revision + 1, operation, percentage: 0, progress: null, diagnostics: [], artifact: null, interpretations: [], ...(operation === 'refresh' ? {plan: null, selection: null} : {})})),
  on(jobActions.progressed, (state, {progress}) => state.busy ? {...state, progress, percentage: Math.max(state.percentage, overallProgress(progress, state.operation, state.plan ?? state.selection))} : state),
  on(jobActions.finished, (state, {result}) => {
    const selection = result?.operation === 'inspect' ? checkSelection(result.inspection) : state.selection;
    return {...state, busy: false, failed: result?.operation === 'inspect' && !!selection?.diagnostics.some(item => item.severity === 'error'), percentage: 100, progress: null,
      ...(result?.operation === 'inspect' ? {selection, diagnostics: selection!.diagnostics} : {}),
      ...(result?.operation === 'plan' ? {plan: result.plan, diagnostics: result.plan.diagnostics} : {}),
      ...(result?.operation === 'generate' ? {artifact: result.artifact, interpretations: result.interpretations, plan: result.plan ?? state.plan, diagnostics: result.plan?.diagnostics ?? []} : {})};
  }),
  on(jobActions.failed, (state, {diagnostic, plan}) => ({...state, busy: false, failed: true, progress: null, diagnostics: plan?.diagnostics ?? [diagnostic], ...(plan ? {plan} : {})}))
)});
