import '@angular/compiler';
import {readFileSync} from 'node:fs';
import {describe, expect, it, vi} from 'vitest';
import {Diagnostic} from '~bhw/polyglot/model/contract';

import {diagnosticReport, issueUrl, outputName} from '../logic/diagnostics';
import {jobActions, jobFeature} from './job';

describe('generator lifecycle and safe diagnostics', () => {
  it('keeps quick selection readiness distinct from full validity and stores all blocking feedback', () => {
    const reducer = jobFeature.reducer;
    const inputs = [{id: 'pdf', name: 'document.pdf', size: 100, role: 'pdf' as const, candidates: []}, {id: 'html', name: 'page.html', size: 100, role: 'html' as const, candidates: []}];
    let state = reducer(undefined, jobActions.finished({result: {operation: 'inspect', inspection: {inputs, diagnostics: []}}}));
    expect(state.selection?.canCombine).toBe(true);
    expect(state.plan).toBeNull();
    const diagnostics = [{code: 'PDF_INVALID' as const, severity: 'error' as const}, {code: 'HTML_ENCODING' as const, severity: 'error' as const}];
    state = reducer(state, jobActions.failed({diagnostic: diagnostics[0]!, plan: {inputs, diagnostics, families: ['pdf', 'html'], interpretations: [], ready: false}}));
    expect(state.diagnostics).toEqual(diagnostics);
    expect(state.failed).toBe(true);
    state = reducer(state, jobActions.requested({operation: 'refresh'}));
    expect(state.plan).toBeNull(); expect(state.selection).toBeNull(); expect(state.failed).toBe(false);
  });
  it('does not allow stale progress to revive a terminal failure', () => {
    const reducer = jobFeature.reducer;
    let state = reducer(undefined, jobActions.requested({operation: 'generate'}));
    state = reducer(state, jobActions.failed({diagnostic: {code: 'CANCELLED', severity: 'info'}}));
    state = reducer(state, jobActions.progressed({progress: {stage: 'generate', completed: 1, total: 2, unit: 'bytes'}}));
    expect(state.busy).toBe(false);
    expect(state.progress).toBeNull();
    expect(state.diagnostics[0]?.code).toBe('CANCELLED');
  });

  it('clears old artifacts and plans when selection changes', () => {
    const reducer = jobFeature.reducer;
    const result = {operation: 'generate' as const, artifact: {jobId: 'job', id: 'result', size: 42, mediaType: ''}, interpretations: [{family: 'html' as const, extensions: ['html']}]};
    const state = reducer(reducer(undefined, jobActions.finished({result})), jobActions.requested({operation: 'refresh'}));
    expect(state.artifact).toBeNull(); expect(state.plan).toBeNull(); expect(state.busy).toBe(true);
  });

  it('keeps overall work moving forward across repeated inspection and reset stage counters', () => {
    const reducer = jobFeature.reducer;
    const plan = {inputs: [{id: 'audio', name: 'audio.mp3', size: 1000, role: 'media' as const, candidates: [{family: 'media' as const, format: 'mp3', evidence: 'signature' as const}]}], families: ['media' as const, 'archive' as const], interpretations: [], diagnostics: [], ready: true};
    let state = reducer(reducer(undefined, jobActions.finished({result: {operation: 'plan', plan}})), jobActions.requested({operation: 'generate'}));
    const values = [state.percentage];
    for (const stage of ['inspect', 'plan', 'convert', 'generate', 'extract', 'pack', 'cleanup'] as const) {
      for (const completed of [0, 25, 80, 100]) {
        state = reducer(state, jobActions.progressed({progress: {stage, completed, total: 100, unit: 'bytes'}}));
        values.push(state.percentage);
      }
    }
    expect(values.every((value, index) => !index || value >= values[index - 1]!)).toBe(true);
    expect(values.at(-1)).toBe(99);
    state = reducer(state, jobActions.finished({result: null}));
    expect(state.percentage).toBe(100);
    state = reducer(state, jobActions.requested({operation: 'refresh'}));
    expect(state.percentage).toBe(0);
    state = reducer(state, jobActions.progressed({progress: {stage: 'inspect', completed: 2, total: 2, unit: 'inputs'}}));
    const initial = state.percentage;
    state = reducer(state, jobActions.progressed({progress: {stage: 'inspect', completed: 0, total: 2, unit: 'inputs'}}));
    expect(state.percentage).toBe(initial);
  });

  it('omits private diagnostic details and keeps issue URLs within budget', () => {
    vi.stubGlobal('navigator', {userAgent: 'Test browser'});
    const diagnostics = [{code: 'IO_FAILURE' as const, severity: 'error' as const, inputId: 'private-name', details: {path: 'secret.txt', content: 'private-content'}}];
    const report = diagnosticReport(diagnostics);
    expect(report).not.toMatch(/private|secret/);
    expect(issueUrl(diagnostics)).not.toMatch(/private-name|secret.txt|private-content/);
    expect(issueUrl(diagnostics).length).toBeLessThan(1800);
    expect(outputName('../bad:name')).toBe('.._bad_name');
    vi.unstubAllGlobals();
  });

  it('exports only allowlisted PDF reasons and catalog explanations', () => {
    vi.stubGlobal('navigator', {userAgent: 'Test browser'});
    const diagnostics: readonly Diagnostic[] = [
      {code: 'PDF_INVALID' as const, severity: 'error' as const, inputId: 'private.pdf', details: {reason: 'OBJECT_HEADER', content: 'private-content'}},
      {code: 'PDF_INVALID' as const, severity: 'error' as const, details: {reason: 'private-content'}},
      {code: 'IO_FAILURE' as const, severity: 'error' as const, details: {reason: 'OBJECT_HEADER', path: 'secret.txt'}}
    ];
    const explain = vi.fn((diagnostic: Diagnostic) => `Explanation: ${String(diagnostic.details?.['reason'] ?? diagnostic.code)}`);
    const report = diagnosticReport(diagnostics, explain);
    expect((JSON.parse(report) as {diagnostics: unknown}).diagnostics).toEqual([
      {code: 'PDF_INVALID', severity: 'error', reason: 'OBJECT_HEADER', message: 'Explanation: OBJECT_HEADER'},
      {code: 'PDF_INVALID', severity: 'error', message: 'Explanation: PDF_INVALID'},
      {code: 'IO_FAILURE', severity: 'error', message: 'Explanation: IO_FAILURE'}
    ]);
    expect(explain).toHaveBeenCalledTimes(3);
    expect(explain.mock.calls[0]?.[0]).toEqual({code: 'PDF_INVALID', severity: 'error', details: {reason: 'OBJECT_HEADER'}});
    expect(explain.mock.calls.flat()).not.toMatchObject(expect.arrayContaining([expect.objectContaining({inputId: 'private.pdf'})]));
    expect(report).not.toMatch(/private|secret/);
    expect(decodeURIComponent(issueUrl(diagnostics))).toContain('OBJECT_HEADER');
    expect(issueUrl(diagnostics)).not.toMatch(/private\.pdf|private-content|secret\.txt/);
    expect(issueUrl(Array.from({length: 30}, () => diagnostics[0]!)).length).toBeLessThan(1800);
    vi.unstubAllGlobals();
  });

  it('keeps all diagnostic codes translated in both catalogs without damaged text', () => {
    const contract = readFileSync('src/lib/polyglot/model/contract.ts', 'utf8').split('export type DiagnosticCode =')[1]!.split(';')[0]!;
    const codes = [...contract.matchAll(/'([A-Z_]+)'/g)].map(match => match[1]!);
    for (const lang of ['en', 'it']) {
      const text = readFileSync(`src/app/core/i18n/${lang}.json`, 'utf8');
      const catalog = JSON.parse(text) as {diagnostic: Record<string, string>};
      expect(codes.filter(code => !catalog.diagnostic[code])).toEqual([]);
      expect(text).not.toMatch(/\uFFFD|\u00C3|\u00E2\u20AC/);
    }
  });
});
