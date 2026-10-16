import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

import {IconName} from '~bhw/core/model/icon';
import {Icon} from '../icon/icon';

/** Compact Material action with an explicit accessible name and a hover/focus tooltip. */
@Component({selector: 'bhw-icon-button', imports: [MatButtonModule, MatTooltipModule, Icon], templateUrl: './icon-button.html', styleUrl: './icon-button.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class IconButton {
  /** @type {InputSignal<IconName>} */
  public readonly icon = input.required<IconName>();
  /** @type {InputSignal<string>} */
  public readonly label = input.required<string>();
  /** @type {InputSignal<string>} */
  public readonly description = input('');
  /** @type {InputSignal<boolean>} */
  public readonly disabled = input(false);
  /** @type {OutputEmitterRef<void>} */
  public readonly clicked = output<void>();
}
