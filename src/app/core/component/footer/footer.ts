import {ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, signal} from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';

import {Icon} from '~bhw/shared/component/icon/icon';

/** Upstream attribution, non-affiliation, source and funding destinations. */
@Component({selector: 'bhw-footer', imports: [TranslocoDirective, Icon], templateUrl: './footer.html', styleUrl: './footer.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class Footer {
  /** @type {WritableSignal<boolean>} */
  public readonly wrapped = signal(false);

  /**
   * Detects actual flex wrapping in either language, rather than guessing a viewport breakpoint.
   * @param {ElementRef<HTMLElement>} host Footer elements.
   * @param {DestroyRef} destroy Disconnect the size observer.
   */
  public constructor(host: ElementRef<HTMLElement>, destroy: DestroyRef) {
    afterNextRender(() => {
      const footer = host.nativeElement.querySelector<HTMLElement>('footer')!;
      const credit = footer.querySelector<HTMLElement>('.credit')!;
      const links = footer.querySelector<HTMLElement>('nav')!;
      const observer = new ResizeObserver(() => this.wrapped.set(links.getBoundingClientRect().top >= credit.getBoundingClientRect().bottom - 1));
      for (const element of [footer, credit, links]) { observer.observe(element); }
      destroy.onDestroy(() => observer.disconnect());
    });
  }
}
