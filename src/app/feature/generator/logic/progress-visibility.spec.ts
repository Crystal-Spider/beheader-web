import {afterEach, describe, expect, it, vi} from 'vitest';

import {ProgressVisibility} from './progress-visibility';

afterEach(() => vi.useRealTimers());

describe('progress presentation lifetime', () => {
  it('never shows a job that finishes before 250ms', () => {
    vi.useFakeTimers();
    const changed = vi.fn();
    const visibility = new ProgressVisibility(changed);
    visibility.update(1, true, false);
    vi.advanceTimersByTime(249);
    visibility.update(1, false, false);
    vi.advanceTimersByTime(1000);
    expect(visibility.visible).toBe(false);
    expect(changed).not.toHaveBeenCalledWith(true);
  });

  it('keeps a shown success visible for at least 500ms', () => {
    vi.useFakeTimers();
    const visibility = new ProgressVisibility(() => {});
    visibility.update(1, true, false);
    vi.advanceTimersByTime(250);
    expect(visibility.visible).toBe(true);
    vi.advanceTimersByTime(50);
    visibility.update(1, false, false);
    vi.advanceTimersByTime(449);
    expect(visibility.visible).toBe(true);
    vi.advanceTimersByTime(1);
    expect(visibility.visible).toBe(false);
  });

  it('shows errors/cancellation immediately and prevents an older completion from hiding a new job', () => {
    vi.useFakeTimers();
    const visibility = new ProgressVisibility(() => {});
    visibility.update(1, true, false);
    vi.advanceTimersByTime(250);
    visibility.update(1, false, false);
    visibility.update(2, true, false);
    vi.advanceTimersByTime(250);
    expect(visibility.visible).toBe(true);
    vi.advanceTimersByTime(300);
    expect(visibility.visible).toBe(true);
    visibility.update(2, false, true);
    expect(visibility.visible).toBe(false);
    visibility.dispose();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('releases a pending appearance on teardown', () => {
    vi.useFakeTimers();
    const changed = vi.fn();
    const visibility = new ProgressVisibility(changed);
    visibility.update(1, true, false);
    visibility.dispose();
    vi.advanceTimersByTime(1000);
    expect(changed).not.toHaveBeenCalledWith(true);
    expect(vi.getTimerCount()).toBe(0);
  });
});
