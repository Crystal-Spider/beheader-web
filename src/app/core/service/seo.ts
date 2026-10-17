import {DOCUMENT} from '@angular/common';
import {DestroyRef, Inject, Injectable} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Meta, Title} from '@angular/platform-browser';
import {TranslocoService} from '@jsverse/transloco';
import {EMPTY, Subject, catchError, map, switchMap} from 'rxjs';

import {LanguageCode} from '../model/language';

/** Localized public copy, never derived from selected files or job metadata. */
interface SeoCopy {
  readonly title: string;
  readonly description: string;
  readonly imageAlt: string;
}

/** Keeps runtime metadata localized while the initial HTML remains readable without JavaScript. */
@Injectable({providedIn: 'root'})
export class Seo {
  /** @type {Subject<LanguageCode>} */
  private readonly languages = new Subject<LanguageCode>();

  /**
   * Cancels stale catalog loads so rapid language changes cannot restore the wrong metadata.
   * @param {TranslocoService} translations Bundled language catalogs.
   * @param {Title} title Document title writer.
   * @param {Meta} meta Existing document metadata writer.
   * @param {Document} document Public structured-data element.
   * @param {DestroyRef} destroyRef Application lifetime for the language subscription.
   */
  public constructor(translations: TranslocoService, private readonly title: Title, private readonly meta: Meta, @Inject(DOCUMENT) private readonly document: Document, destroyRef: DestroyRef) {
    this.languages.pipe(
      switchMap(language => translations.selectTranslateObject<SeoCopy>('seo', {}, language).pipe(
        map(copy => ({language, copy})),
        catchError(() => EMPTY)
      )),
      takeUntilDestroyed(destroyRef)
    ).subscribe(({language, copy}) => this.apply(language, copy));
  }

  /**
   * Updates public copy only; canonical identity stays fixed across runtime language choices.
   * @param {LanguageCode} language Supported locale selected by the application.
   */
  public localize(language: LanguageCode): void { this.languages.next(language); }

  /**
   * @param {LanguageCode} language Loaded catalog's locale.
   * @param {SeoCopy} copy Translated search and sharing descriptions.
   */
  private apply(language: LanguageCode, copy: SeoCopy): void {
    this.title.setTitle(copy.title);
    this.meta.updateTag({name: 'description', content: copy.description});
    this.meta.updateTag({property: 'og:title', content: copy.title});
    this.meta.updateTag({property: 'og:description', content: copy.description});
    this.meta.updateTag({property: 'og:image:alt', content: copy.imageAlt});
    this.meta.updateTag({property: 'og:locale', content: language === 'it' ? 'it_IT' : 'en_GB'});
    this.meta.updateTag({property: 'og:locale:alternate', content: language === 'it' ? 'en_GB' : 'it_IT'});
    this.meta.updateTag({name: 'twitter:title', content: copy.title});
    this.meta.updateTag({name: 'twitter:description', content: copy.description});
    this.meta.updateTag({name: 'twitter:image:alt', content: copy.imageAlt});
    const schema = this.document.getElementById('application-schema');
    if (schema) {
      const data = JSON.parse(schema.textContent ?? '{}') as Record<string, unknown>;
      schema.textContent = JSON.stringify({...data, description: copy.description});
    }
  }
}
