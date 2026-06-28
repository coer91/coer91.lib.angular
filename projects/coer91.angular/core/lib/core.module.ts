//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ComponentsModule } from 'coer91.angular/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'coer91.angular/directives';
import { PipesModule } from 'coer91.angular/pipes';
import { CoerAlert } from 'coer91.angular/tools';

//Components
import { MenuPage         } from './menu/menu.component';
import { Coer91Component  } from './coer91-root/coer.component'; 
import { HomePage         } from './home/home.component';
import { LoginPage        } from './login/login.component';
import { Sidenav          } from './sidenav/sidenav.component';
import { SidenavAccordion } from './sidenav/coer-sidenav-accordion/coer-sidenav-accordion.component'; 
import { Toolbar          } from './toolbar/toolbar.component';  
import { Coer91Root       } from './coer91-root/coer91-root'; 

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