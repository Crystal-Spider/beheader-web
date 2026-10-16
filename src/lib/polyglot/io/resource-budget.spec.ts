import {describe, expect, it, vi} from 'vitest';

import {checkStorageCapacity, ResourceBudget} from './resource-budget';

describe('aggregate workspace and storage headroom', () => {
  it('counts live high-water sizes, without counting patches twice, and releases discarded intermediates', () => {
    const budget = new ResourceBudget(100);
    budget.reserve('audio', 60); budget.reserve('audio', 20); budget.reserve('output', 40);
    expect(() => budget.reserve('archive', 1)).toThrow('FORMAT_RESOURCE_LIMIT');
    budget.release('audio'); budget.reserve('archive', 60);
    expect(() => budget.reserve('output', 41)).toThrow('FORMAT_RESOURCE_LIMIT');
  });
  it('rejects unsafe offsets before committing a budget reservation', () => {
    const budget = new ResourceBudget(100);
    for (const size of [-1, NaN, Infinity, 1.5, Number.MAX_SAFE_INTEGER + 1]) { expect(() => budget.reserve('file', size)).toThrow('INVALID_SIZE'); }
    budget.reserve('file', 100);
  });
  it('rejects a known headroom deficit but permits an unavailable estimate to attempt bounded writes', async() => {
    vi.stubGlobal('navigator', {storage: {estimate: () => Promise.resolve({quota: 100, usage: 80})}});
    await expect(checkStorageCapacity(21)).rejects.toMatchObject({diagnostic: {code: 'STORAGE_FULL'}});
    await expect(checkStorageCapacity(20)).resolves.toBeUndefined();
    vi.stubGlobal('navigator', {storage: {estimate: () => Promise.reject(new Error('estimate unavailable'))}});
    await expect(checkStorageCapacity(21)).resolves.toBeUndefined();
    vi.unstubAllGlobals();
  });
});
