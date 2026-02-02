import { bootstrapApplication } from '@angular/platform-browser'; 
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router'; 
import { ROUTES } from '../app/app.routing';
import { AppRoot } from './app.root';

bootstrapApplication(AppRoot, {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(ROUTES, withHashLocation()), 
    ]
}).catch((err) => console.error(err));