import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule), ...appConfig.providers, provideEffects()],
}).catch(err => console.error(err));
