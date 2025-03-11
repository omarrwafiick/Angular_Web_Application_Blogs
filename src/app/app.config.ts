import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InterceptorService } from './_services/interceptor.service';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { BlurbReducer } from './store/blurb.reducer';
import { BlurbEffect } from './store/blurb.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
    }, provideStore({BlurbStore:BlurbReducer},{
      runtimeChecks:{
        strictActionImmutability:true,
        strictActionTypeUniqueness:true,
        strictActionWithinNgZone:true,
        strictStateImmutability:true,
        strictStateSerializability:true
      }
    }),
    provideEffects(BlurbEffect),
]
};
