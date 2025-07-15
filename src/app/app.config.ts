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
          semantic: {
            primary: {
              50: '{emerald.50}',
              100: '{emerald.100}',
              200: '{emerald.200}',
              300: '{emerald.300}',
              400: '{emerald.400}',
              500: '{emerald.500}',
              600: '{emerald.600}',
              700: '{emerald.700}',
              800: '{emerald.800}',
              900: '{emerald.900}',
              950: '{emerald.950}',
            },
            colorScheme: {
              light: {
                surface: {
                  0: '#ffffff',
                  50: '{slate.50}',
                  100: '{slate.100}',
                  200: '{slate.200}',
                  300: '{slate.300}',
                  400: '{slate.400}',
                  500: '{slate.500}',
                  600: '{slate.600}',
                  700: '{slate.700}',
                  800: '{slate.800}',
                  900: '{slate.900}',
                  950: '{slate.950}',
                },
              },
              dark: {
                surface: {
                  0: '#ffffff',
                  50: '{stone.50}',
                  100: '{stone.100}',
                  200: '{stone.200}',
                  300: '{stone.300}',
                  400: '{stone.400}',
                  500: '{stone.500}',
                  600: '{stone.600}',
                  700: '{stone.700}',
                  800: '{stone.800}',
                  900: '{stone.900}',
                  950: '{stone.950}',
                },
              },
            },
          },
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
