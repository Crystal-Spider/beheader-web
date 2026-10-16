import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideStore} from '@ngrx/store';
import {provideTransloco} from '@jsverse/transloco';
import {provideServiceWorker} from '@angular/service-worker';

import {LANGUAGES} from '~bhw/core/model/language';
import {Translations} from '~bhw/core/service/translations';
import {selectionFeature} from '~bhw/feature/generator/redux/selection';
import {jobFeature} from '~bhw/feature/generator/redux/job';
import {JobEffects} from '~bhw/feature/generator/redux/job-effects';

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
    provideStore({[selectionFeature.name]: selectionFeature.reducer, [jobFeature.name]: jobFeature.reducer}),
    provideEffects(JobEffects),
    provideServiceWorker('ngsw-worker.js', {enabled: !isDevMode(), registrationStrategy: 'registerImmediately'}),
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
