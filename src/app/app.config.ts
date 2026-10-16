import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideStore} from '@ngrx/store';
import {provideTransloco} from '@jsverse/transloco';

import {LANGUAGES} from '~bhw/core/model/language';
import {Translations} from '~bhw/core/service/translations';

import {routes} from './app.routes';

/**
 * Application-wide providers; job state is introduced with the worker pipeline.
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideTransloco({
      config: {
        availableLangs: LANGUAGES.map(language => language.code),
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        missingHandler: {useFallbackTranslation: true}
      },
      loader: Translations
    })
  ]
};
