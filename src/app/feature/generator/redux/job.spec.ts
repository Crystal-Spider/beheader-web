import '@angular/compiler';
import {readFileSync} from 'node:fs';
import {describe, expect, it, vi} from 'vitest';

import {diagnosticReport, issueUrl, outputName} from '../logic/diagnostics';
import {jobActions, jobFeature} from './job';

describe('generator lifecycle and safe diagnostics', () => {
  it('does not allow stale progress to revive a terminal failure', () => {
    const reducer = jobFeature.reducer;
    let state = reducer(undefined, jobActions.requested({operation: 'generate'}));
    state = reducer(state, jobActions.failed({diagnostic: {code: 'CANCELLED', severity: 'error'}}));
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
