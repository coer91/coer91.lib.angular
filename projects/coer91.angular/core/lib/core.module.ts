//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { ComponentsModule } from 'coer91.angular/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'coer91.angular/directives';
import { PipesModule } from 'coer91.angular/pipes';
import { CoerAlert, ROUTER_PAGE, Tools } from 'coer91.angular/tools';
declare const appSettings: any;

//Components
import { MenuPage         } from './menu/menu.component';
import { Coer91Component  } from './coer91/coer91.component'; 
import { HomePage         } from './home/home.component';
import { LoginPage        } from './login/login.component';
import { Sidenav          } from './sidenav/sidenav.component';
import { SidenavAccordion } from './sidenav/coer-sidenav-accordion/coer-sidenav-accordion.component'; 
import { Toolbar          } from './toolbar/toolbar.component';  
import { Coer91Root       } from './coer91/coer91-root';

//Routes
const redirectTo = Tools.IsNotOnlyWhiteSpace(appSettings?.navigation?.redirectTo) ? appSettings?.navigation?.redirectTo : 'home';

export const ROUTES_91 = ([] as Routes)
    .concat([ROUTER_PAGE('menu', MenuPage)])
    .concat(!Tools.IsBooleanFalse(appSettings?.navigation?.showHome) ? [ROUTER_PAGE('home', HomePage)] : [])
    .concat([{ path: '**', redirectTo }]); 
  

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        DirectivesModule,
        PipesModule,
        CoerAlert 
    ],
    declarations: [  
        MenuPage,
        Coer91Component,
        Coer91Root, 
        HomePage, 
        LoginPage,
        Sidenav,
        SidenavAccordion,
        Toolbar,
    ],
    exports: [Coer91Root]
})
export class CoreModule { }