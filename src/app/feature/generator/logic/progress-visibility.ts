/** Presentation timing only: fast work stays hidden and completed work never blocks the next job. */
export class ProgressVisibility {
  /** @type {boolean} */
  public visible = false;
  /** @type {number} */
  private revision = -1;
  /** @type {number} */
  private shown = 0;
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  private opening: ReturnType<typeof setTimeout> | undefined;
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  private closing: ReturnType<typeof setTimeout> | undefined;

  /** @param {(visible: boolean) => void} changed Presentation visibility observer. */
  public constructor(private readonly changed: (visible: boolean) => void) {}

  /**
   * @param {number} revision New user operation, including consecutive jobs of the same kind.
   * @param {boolean} busy Actual processing state.
   * @param {boolean} failed Errors/cancellation must never be hidden behind a finishing timer.
   */
  public update(revision: number, busy: boolean, failed: boolean): void {
    if (revision !== this.revision) { this.dispose(); this.revision = revision; this.set(false); }
    if (busy) {
      clearTimeout(this.closing); this.closing = undefined;
      if (!this.visible && this.opening === undefined) {
        this.opening = setTimeout(() => { this.opening = undefined; this.shown = Date.now(); this.set(true); }, 250);
      }
    } else {
      clearTimeout(this.opening); this.opening = undefined;
      if (failed) { clearTimeout(this.closing); this.closing = undefined; this.set(false); }
      else if (this.visible && this.closing === undefined) {
        this.closing = setTimeout(() => { this.closing = undefined; this.set(false); }, Math.max(0, 500 - (Date.now() - this.shown)));
      }
    }
  }

  /** Releases all presentation timers when the component owner is destroyed. */
  public dispose(): void { clearTimeout(this.opening); clearTimeout(this.closing); this.opening = undefined; this.closing = undefined; }

  /** @param {boolean} visible Current presentation state. */
  private set(visible: boolean): void { this.visible = visible; this.changed(visible); }
}
