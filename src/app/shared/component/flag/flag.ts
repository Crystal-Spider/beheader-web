import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

/** Flag asset shared between the picker trigger and its option panel. */
@Component({
  selector: 'bhw-flag',
  templateUrl: './flag.html',
  styleUrl: './flag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'aria-hidden': 'true'}
})
export class Flag {
  /**
   * Country code from the supported-language registry.
   * @type {InputSignal<string>}
   */
  public readonly country = input.required<string>();

  /**
   * Local flag URL, independent of platform emoji support.
   * @type {Signal<string>}
   */
  public readonly source = computed(() => `assets/flag/${this.country()}.svg`);
}
