import { Routes } from '@angular/router';
import { ROUTES_91 } from 'coer91.angular/core';

export const ROUTES: Routes = [
    {
        path: 'components',
        loadChildren: () => import('./modules/components/components.routing').then(module => module.ComponentsRouting)
    },
].concat(ROUTES_91); 