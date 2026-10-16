import {DestroyRef, Directive, ElementRef, Injector, Renderer2, afterNextRender} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatSelect} from '@angular/material/select';
import {EMPTY, fromEvent, merge, of, switchMap, tap} from 'rxjs';

/** Keeps the dismissing backdrop neutral, with a pointer only over the still-clickable trigger. */
@Directive({selector: 'mat-select[bhwSelectCursor]'})
export class SelectCursor {
  /**
   * Repositions the transparent trigger area only while this select is open.
   * @param {MatSelect} select Owned Material overlay.
   * @param {ElementRef<HTMLElement>} host Complete visible trigger bounds.
   * @param {Renderer2} renderer Scoped backdrop decoration.
   * @param {Injector} injector Schedules geometry after the overlay view is attached.
   * @param {DestroyRef} destroyRef Component-scoped subscription cleanup.
   */
  public constructor(private readonly select: MatSelect, private readonly host: ElementRef<HTMLElement>, private readonly renderer: Renderer2, private readonly injector: Injector, destroyRef: DestroyRef) {
    select.openedChange.pipe(
      switchMap(open => open ? merge(of(null), fromEvent(window, 'resize'), fromEvent(document, 'scroll', {capture: true})).pipe(tap(() => afterNextRender(() => this.position(), {injector: this.injector}))) : EMPTY),
      takeUntilDestroyed(destroyRef)
    ).subscribe();
  }

  /** The transparent child bubbles clicks to CDK's existing close handler and never enters tab order. */
  private position(): void {
    if (!this.select.panelOpen) { return; }
    const panel = this.select.panel?.nativeElement as HTMLElement | undefined;
    const root = panel?.closest('.cdk-overlay-popover') ?? panel?.closest('.cdk-overlay-container');
    const backdrop = root?.querySelector<HTMLElement>('.cdk-overlay-backdrop');
    if (!backdrop) { return; }
    this.renderer.addClass(backdrop, 'bhw-select-backdrop');
    let area = backdrop.querySelector<HTMLElement>('.bhw-select-trigger-area');
    if (!area) {
      area = this.renderer.createElement('span') as HTMLElement;
      this.renderer.addClass(area, 'bhw-select-trigger-area');
      this.renderer.setAttribute(area, 'aria-hidden', 'true');
      this.renderer.appendChild(backdrop, area);
    }
    const trigger = this.host.nativeElement.getBoundingClientRect();
    const bounds = backdrop.getBoundingClientRect();
    for (const [name, value] of Object.entries({left: trigger.left - bounds.left, top: trigger.top - bounds.top, width: trigger.width, height: trigger.height})) {
      this.renderer.setStyle(area, name, `${value}px`);
    }
  }
}
