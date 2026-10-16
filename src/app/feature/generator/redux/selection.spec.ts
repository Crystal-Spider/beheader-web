import '@angular/compiler';
import {describe, expect, it} from 'vitest';

import {InputDescription} from '~bhw/polyglot/model/contract';
import {inputAvailability, acceptedInputTypes} from '~bhw/polyglot/logic/availability';
import {selectionActions, selectionFeature} from './selection';

const input = (id: string, role: InputDescription['role']): InputDescription => ({id, role, name: `${id}.fixture`, size: 10, candidates: []});

describe('selection-dependent input availability', () => {
  it('disables both media kinds for an occupied slot, excludes their chooser hints, and re-enables after removal', () => {
    const before = inputAvailability([], {audio: true});
    expect(before.every(item => item.enabled)).toBe(true);
    const selected = inputAvailability([input('video', 'media')], {audio: true});
    expect(selected.filter(item => !item.enabled).map(item => item.kind)).toEqual(['audio', 'video']);
    expect(acceptedInputTypes(selected)).not.toContain('.mp3');
    expect(acceptedInputTypes(selected)).not.toContain('.mp4');
    expect(inputAvailability([], {audio: true})).toEqual(before);
  });

  it('updates selectors for replacement, reassignment, removal, and archive reordering without persisting files', () => {
    const reducer = selectionFeature.reducer;
    let state = reducer(undefined, {type: 'init'});
    const select = (): ReturnType<typeof inputAvailability> => selectionFeature.selectAvailability.projector(state.inputs);
    expect(select().find(item => item.kind === 'audio')).toMatchObject({enabled: false, reason: 'IMPLEMENTATION_UNAVAILABLE'});
    state = reducer(state, selectionActions.changed({inputs: [input('first', 'image'), input('zip1', 'archive'), input('zip2', 'archive')]}));
    expect(select().find(item => item.kind === 'image')?.enabled).toBe(false);
    expect(select().find(item => item.kind === 'archive')?.enabled).toBe(true);
    state = reducer(state, selectionActions.changed({inputs: [input('zip2', 'archive'), input('replacement', 'image'), input('zip1', 'archive')]}));
    expect(select().find(item => item.kind === 'image')?.enabled).toBe(false);
    expect(state.inputs.map(input => input.id)).toEqual(['zip2', 'replacement', 'zip1']);
    state = reducer(state, selectionActions.changed({inputs: [input('replacement', 'pdf')]}));
    expect(select().find(item => item.kind === 'image')?.enabled).toBe(true);
    expect(select().find(item => item.kind === 'pdf')?.enabled).toBe(false);
    state = reducer(state, selectionActions.changed({inputs: []}));
    expect(state.inputs).toEqual([]);
    expect(reducer(undefined, {type: 'init'})).toEqual(state);
  });

  it('disables additions until ambiguity or the total-size limit is resolved', () => {
    expect(inputAvailability([input('unknown', null)]).every(item => item.reason === 'INPUT_AMBIGUOUS')).toBe(true);
    expect(inputAvailability([{...input('full', 'archive'), size: 2 * 1024 ** 3}]).every(item => item.reason === 'TOTAL_TOO_LARGE')).toBe(true);
  });
});
