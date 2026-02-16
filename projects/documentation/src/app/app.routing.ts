import { Routes } from '@angular/router';
import { ROUTES_91 } from 'coer91.angular/core';
import { InstallPage } from './pages/install/install.page';
import { ROUTER_PAGE } from 'coer91.angular/tools';

export const ROUTES: Routes = [
    {
        path: 'components',
        loadChildren: () => import('./modules/components/components.routing').then(module => module.ComponentsRouting)
    },
    ROUTER_PAGE('install', InstallPage) 
].concat(ROUTES_91); 