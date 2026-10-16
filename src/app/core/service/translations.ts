import {Injectable} from '@angular/core';
import {TranslocoLoader, Translation} from '@jsverse/transloco';
import {Observable, of} from 'rxjs';

import english from '../i18n/en.json';
import italian from '../i18n/it.json';
import {isLanguageCode} from '../logic/language';
import {LanguageCode} from '../model/language';

/** Loads bundled catalogs without a network request or a language-change delay. */
@Injectable({providedIn: 'root'})
export class Translations implements TranslocoLoader {
  /**
   * Catalogs included in the app bundle for predictable offline availability.
   * @type {Record<LanguageCode, Translation>}
   */
  private readonly catalogs: Record<LanguageCode, Translation> = {en: english, it: italian};

  /**
   * Resolves only supported catalogs, with an English fallback.
   * @param {string} language Requested language code.
   * @returns {Observable<Translation>} Bundled translation catalog.
   */
  public getTranslation(language: string): Observable<Translation> {
    return of(this.catalogs[isLanguageCode(language) ? language : 'en']);
  }
}
