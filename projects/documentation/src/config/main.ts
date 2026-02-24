import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router'; 
import { bootstrapApplication } from '@angular/platform-browser'; 
import { ROUTES } from '../app/app.routing';
import { AppRoot } from './app-root';

bootstrapApplication(AppRoot, {
    providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(ROUTES, withHashLocation()), 
    ]
}).catch((err) => console.error(err));