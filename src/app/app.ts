import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {Icons} from '~bhw/core/service/icons';
import {LanguagePreferences} from '~bhw/core/service/language-preferences';

/** Application entry point. */
@Component({
  selector: 'bhw-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  /**
   * Initializes local assets and locale before rendering the first page.
   * @param {Icons} icons Local SVG registry.
   * @param {LanguagePreferences} preferences Saved/browser language resolution.
   */
  public constructor(icons: Icons, preferences: LanguagePreferences) {
    icons.initialize();
    preferences.initialize();
  }
}
