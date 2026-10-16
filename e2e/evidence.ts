/**
 * Keep each engine's generated fixtures available for independent readers.
 * @param {string} browserName Playwright engine name.
 * @returns {string} Directory outside Playwright's per-test cleanup scope.
 */
export function evidenceDirectory(browserName: string): string {
  return browserName === 'chromium' ? 'test-results' : `test-results/acceptance/${browserName}`;
}
