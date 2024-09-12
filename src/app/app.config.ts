import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import {BrowserAnimationsModule, provideAnimations}from'@angular/platform-browser/animations'
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptor/headers.interceptor';
import { catchErorrInterceptor } from './core/interceptor/catch-erorr.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
    routes,
    withHashLocation(),
    withViewTransitions(),
    withInMemoryScrolling({scrollPositionRestoration:'top'})),
    provideHttpClient(withFetch(),
    withInterceptors([headersInterceptor,
      catchErorrInterceptor,
      loadingInterceptor])),
    importProvidersFrom(
      RouterModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        defaultLanguage:'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideAnimations(),  
    provideToastr(),]
};
