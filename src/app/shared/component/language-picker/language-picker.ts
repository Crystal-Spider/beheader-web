import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {TranslocoDirective} from '@jsverse/transloco';

import {SelectCursor} from '~bhw/shared/directive/select-cursor';
import {LANGUAGES, LanguageCode} from '~bhw/core/model/language';
import {LanguagePreferences} from '~bhw/core/service/language-preferences';

import {Flag} from '../flag/flag';

/** Registry-driven Material picker with flags in the trigger and every option. */
@Component({
  selector: 'bhw-language-picker',
  imports: [MatSelectModule, SelectCursor, TranslocoDirective, Flag],
  templateUrl: './language-picker.html',
  styleUrl: './language-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagePicker {
  /**
   * Available language names and flags.
   * @type {typeof LANGUAGES}
   */
  public readonly languages = LANGUAGES;

  /**
   * @param {LanguagePreferences} preferences Shared locale state and persistence.
   */
  public constructor(public readonly preferences: LanguagePreferences) {}

  /**
   * Resolves trigger metadata through the registry.
   * @returns {typeof LANGUAGES[number]} Selected language entry.
   */
  public get selected(): typeof LANGUAGES[number] {
    return this.languages.find(language => language.code === this.preferences.language()) ?? this.languages[0];
  }

  /**
   * Receives a supported value from an option declared below.
   * @param {LanguageCode} code Selected option code.
   */
  public select(code: LanguageCode): void {
    this.preferences.select(code);
  }
}
