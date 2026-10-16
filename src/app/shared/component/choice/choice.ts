import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

/** Shared Material select for translated metadata choices. */
@Component({selector: 'bhw-choice', imports: [MatSelectModule], templateUrl: './choice.html', styleUrl: './choice.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class Choice {
  /** @type {InputSignal<string>} */
  public readonly label = input.required<string>();
  /** @type {InputSignal<string>} */
  public readonly value = input('');
  /** @type {InputSignal<readonly {value: string; label: string}[]>} */
  public readonly options = input.required<readonly {value: string; label: string}[]>();
  /** @type {InputSignal<boolean>} */
  public readonly disabled = input(false);
  /** @type {OutputEmitterRef<string>} */
  public readonly changed = output<string>();
}
