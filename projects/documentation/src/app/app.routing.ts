import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';   
import { ROUTES_91 } from 'coer91.angular/core'; 
import { SharedModule } from '../shared/shared.module';

export const ROUTES = ([ 
    {
        path: 'back-end',
        loadChildren: () => import('./back-end-module/back-end.routing').then(routing => routing.BackEndRouting)
    }, 
    {
        path: 'front-end',
        loadChildren: () => import('./front-end-module/front-end.routing').then(routing => routing.FrontEndRouting)
    }, 
] as Routes).concat(ROUTES_91); 


@NgModule({ 
    declarations: [],
    imports: [SharedModule],
    exports: [SharedModule]
})
export class AppModule { }