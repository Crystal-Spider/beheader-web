import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import {IconName} from '~bhw/core/model/icon';

import {Icon} from '../icon/icon';

/** Material-based button with shared app sizing and signal bindings. */
@Component({
  selector: 'bhw-button',
  imports: [MatButtonModule, Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'[class.block]': 'block()', '[class.compact]': 'compact()', '[class.small]': 'size() === "small"'}
})
export class Button {
  /**
   * Visible action label.
   * @type {InputSignal<string>}
   */
  public readonly label = input.required<string>();

  /**
   * Whether interaction is currently available.
   * @type {InputSignal<boolean>}
   */
  public readonly disabled = input(false);

  /** @type {InputSignal<string | null>} Optional external destination, retaining native link semantics. */
  public readonly href = input<string | null>(null);

  /**
   * Optional decorative icon.
   * @type {InputSignal<IconName | null>}
   */
  public readonly icon = input<IconName | null>(null);

  /** @type {InputSignal<string | null>} Optional action crossfaded within the same native button. */
  public readonly alternateLabel = input<string | null>(null);
  /** @type {InputSignal<IconName | null>} */
  public readonly alternateIcon = input<IconName | null>(null);
  /** @type {InputSignal<boolean>} */
  public readonly alternateShown = input(false);

  /**
   * Material button appearance.
   * @type {InputSignal<'filled' | 'outlined'>}
   */
  public readonly appearance = input<'filled' | 'outlined'>('filled');

  /**
   * Visual size for primary and secondary actions.
   * @type {InputSignal<'normal' | 'small'>}
   */
  public readonly size = input<'normal' | 'small'>('normal');

  /**
   * Whether to fill the available width.
   * @type {InputSignal<boolean>}
   */
  public readonly block = input(false);
  /** @type {InputSignal<boolean>} */
  public readonly compact = input(false);

  /**
   * Native click propagated only by the enabled button.
   * @type {OutputEmitterRef<void>}
   */
  public readonly clicked = output<void>();
}
