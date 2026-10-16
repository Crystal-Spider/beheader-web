import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import {Icon} from '../icon/icon';

/** Keeps content mounted so both expansion and collapse animate, with hidden controls inert. */
@Component({selector: 'bhw-expansion', imports: [MatButtonModule, Icon], templateUrl: './expansion.html', styleUrl: './expansion.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class Expansion {
  /** @type {number} */
  private static nextId = 0;
  /** @type {string} */
  public readonly contentId = `bhw-expansion-${Expansion.nextId++}`;
  /** @type {InputSignal<string>} */
  public readonly label = input.required<string>();
  /** @type {WritableSignal<boolean>} */
  public readonly expanded = signal(false);
}
