import {createActionGroup, createFeature, createReducer, createSelector, on, props} from '@ngrx/store';

import {InputDescription} from '~bhw/polyglot/model/contract';
import {acceptedInputTypes, inputAvailability} from '~bhw/polyglot/logic/availability';

/** Metadata only: File objects remain with the runtime owner when selection is connected. */
export interface SelectionState {
  readonly inputs: readonly InputDescription[];
}

/** Inspection/reassignment/removal/reordering all replace one serializable selection snapshot. */
export const selectionActions = createActionGroup({
  source: 'Generator selection',
  events: {'Changed': props<{inputs: readonly InputDescription[]}>(), 'Reordered': props<{ids: readonly string[]}>()}
});

/** Fresh visits start empty; the selection feature has no persistence effect. */
export const selectionFeature = createFeature({
  name: 'selection',
  reducer: createReducer<SelectionState>({inputs: []},
    on(selectionActions.changed, (_state, {inputs}) => ({inputs})),
    on(selectionActions.reordered, (state, {ids}) => {
      const byId = new Map(state.inputs.map(input => [input.id, input]));
      if (ids.length !== state.inputs.length || new Set(ids).size !== ids.length || ids.some(id => !byId.has(id))) { return state; }
      return {inputs: ids.map(id => byId.get(id)!)};
    })
  ),
  extraSelectors: ({selectInputs}) => {
    const selectAvailability = createSelector(selectInputs, inputs => inputAvailability(inputs));
    return {selectAvailability, selectAcceptedTypes: createSelector(selectAvailability, acceptedInputTypes)};
  }
});
