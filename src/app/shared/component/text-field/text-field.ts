import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';

/** Material input for short metadata, never a file-content editor. */
@Component({selector: 'bhw-text-field', imports: [MatInputModule], templateUrl: './text-field.html', styleUrl: './text-field.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class TextField {
  /** @type {InputSignal<string>} */
  public readonly label = input.required<string>();
  /** @type {InputSignal<string>} */
  public readonly value = input('');
  /** @type {InputSignal<boolean>} */
  public readonly disabled = input(false);
  /** @type {OutputEmitterRef<string>} */
  public readonly changed = output<string>();
}
