import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {IconName} from '~bhw/core/model/icon';

/** Decorative local SVG icon; action labels belong on the enclosing control. */
@Component({
  selector: 'bhw-icon',
  imports: [MatIconModule],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'aria-hidden': 'true'}
})
export class Icon {
  /**
   * Registered application icon.
   * @type {InputSignal<IconName>}
   */
  public readonly name = input.required<IconName>();
}
