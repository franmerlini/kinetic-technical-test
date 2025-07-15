import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';

import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { ROOT_EFFECTS, ROOT_REDUCERS } from '@core/data-access';
import { FeatureKeys } from '@core/domain';
import { routes } from '@core/shell';
import { CustomSerializer } from '@core/util';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: definePreset(Aura, {
          components: {
            toast: {
              text: {
                gap: '0',
              },
            },
          },
        }),
        options: {
          prefix: 'p',
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    MessageService,
    DialogService,
    provideStore(ROOT_REDUCERS),
    provideEffects(ROOT_EFFECTS),
    provideRouterStore({ stateKey: FeatureKeys.ROUTER, serializer: CustomSerializer }),
  ],
};
