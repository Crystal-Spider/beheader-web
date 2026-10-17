import {ChangeDetectionStrategy, Component} from '@angular/core';

import {version} from '../../../../../package.json';
import {LanguagePicker} from '~bhw/shared/component/language-picker/language-picker';

/** Application icon/wordmark, explicitly maintained version and language preference. */
@Component({selector: 'bhw-header', imports: [LanguagePicker], templateUrl: './header.html', styleUrl: './header.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class Header {
  /** @type {string} Package version; change only when explicitly requested. */
  public readonly version = version;
}
