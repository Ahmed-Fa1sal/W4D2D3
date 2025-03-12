import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { taskReducer } from './state/task.reducer';  // Import the taskReducer
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './state/task.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideEffects(TaskEffects),
    provideStore({ tasks: taskReducer })  // Set up the NgRx store for tasks
  ]
};