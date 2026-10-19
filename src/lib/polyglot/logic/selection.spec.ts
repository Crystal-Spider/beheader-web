import {describe, expect, it} from 'vitest';

import {InputDescription} from '../model/contract';
import {checkSelection} from './selection';

const input = (id: string, role: InputDescription['role']): InputDescription => ({id, name: id, role, size: 1024, candidates: []});

describe('provisional selection checks', () => {
  it('allows a two-family attempt without advertising validated interpretations', () => {
    const selection = checkSelection({inputs: [input('audio', 'media'), input('html', 'html')], diagnostics: []});
    expect(selection.canCombine).toBe(true);
    expect(selection.families).toEqual(['media', 'html']);
    expect(selection).not.toHaveProperty('ready');
    expect(selection).not.toHaveProperty('interpretations');
  });

  it('blocks role conflicts and unresolved detection while allowing multiple independent archives', () => {
    expect(checkSelection({inputs: [input('a', 'media'), input('b', 'media')], diagnostics: []}).diagnostics).toContainEqual(expect.objectContaining({code: 'ROLE_CONFLICT'}));
    expect(checkSelection({inputs: [input('a', 'archive'), input('b', 'archive'), input('html', 'html')], diagnostics: []}).canCombine).toBe(true);
    expect(checkSelection({inputs: [input('a', 'html-assets'), input('b', 'archive')], diagnostics: []}).canCombine).toBe(false);
    expect(checkSelection({inputs: [input('a', null), input('b', 'archive')], diagnostics: [{code: 'INPUT_AMBIGUOUS', severity: 'error'}]}).canCombine).toBe(false);
  });
});
