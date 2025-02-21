import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes'; // Use routes

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule),
    provideRouter(routes), // Use standalone routing
  ],
};
