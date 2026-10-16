import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';

import {Button} from '~bhw/shared/component/button/button';
import {Icon} from '~bhw/shared/component/icon/icon';
import {LanguagePicker} from '~bhw/shared/component/language-picker/language-picker';
import {Processing} from '~bhw/core/service/processing';

/** Responsive shell. File selection and processing remain intentionally unavailable. */
@Component({
  selector: 'bhw-generator',
  imports: [TranslocoDirective, Button, Icon, LanguagePicker],
  templateUrl: './generator.html',
  styleUrl: './generator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Generator {
  /**
   * Keeps the processing boundary available without enabling unfinished controls.
   * @param {Processing} processing Runtime worker owner; workers start only on demand.
   */
  public constructor(public readonly processing: Processing) {}
}
