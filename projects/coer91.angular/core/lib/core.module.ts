//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ComponentsModule } from 'coer91.angular/components';
import { PipesModule } from 'coer91.angular/pipes';
import { CoerAlert } from 'coer91.angular/tools';

//Components
import { MenuPage         } from './menu/menu.component';
import { Coer91           } from './coer91/coer91.component'; 
import { HomePage         } from './home/home.component';
import { LoginPage        } from './login/login.component';
import { Sidenav          } from './sidenav/sidenav.component';
import { SidenavAccordion } from './sidenav/coer-sidenav-accordion/coer-sidenav-accordion.component'; 
import { Toolbar          } from './toolbar/toolbar.component';   

//Routes
export const ROUTES_91: any = [  
    { path: 'home', component: HomePage, data: { activeKey: '' }},
    { path: 'menu', component: MenuPage, data: { activeKey: '' }},
    { path: '**'  , redirectTo: 'home' }     
]; 

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentsModule,
        PipesModule,
        CoerAlert 
    ],
    declarations: [  
        MenuPage,
        Coer91,
        HomePage, 
        LoginPage,
        Sidenav,
        SidenavAccordion,
        Toolbar,
    ],
    exports: [Coer91]
})
export class CoreModule { }