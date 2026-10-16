import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';

import {Icon} from '~bhw/shared/component/icon/icon';

/** Upstream attribution, non-affiliation, source and funding destinations. */
@Component({selector: 'bhw-footer', imports: [TranslocoDirective, Icon], templateUrl: './footer.html', styleUrl: './footer.scss', changeDetection: ChangeDetectionStrategy.OnPush})
export class Footer {}
