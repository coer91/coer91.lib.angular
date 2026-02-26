import { Routes } from '@angular/router';
import { ROUTES_91 } from 'coer91.angular/core'; 

export const ROUTES = ([ 
    {
        path: 'front-end',
        loadChildren: () => import('./modules/front-end/front-end.routing').then(module => module.FrontEndRouting)
    }, 
] as Routes).concat(ROUTES_91); 