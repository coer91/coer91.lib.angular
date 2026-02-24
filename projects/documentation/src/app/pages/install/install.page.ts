import { Component, computed } from '@angular/core';   
import { Page, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'install-page',
    templateUrl: './install.page.html', 
    styleUrl: './install.page.scss',  
    standalone: false
})
export class InstallPage extends Page {  

    //Variables
    protected Clipboard = Tools.Clipboard;
 
    constructor() {
        super('Install')
    }   


    protected stepList = computed(() => [
        {
            subject: 'Crea el proyecto',
            target: 'El primer paso es crear el proyecto angular, asegurate que utilice SCSS', 
        },
        {
            subject: 'Descargar la libreria',
            target: 'Lo que sigue es instalar la libreria',
            code: 'npm i coer91.angular' 
        },
        {
            subject: 'Estructurar el proyecto',
            target: 'Genera la siguiente estructura como la imagen, mas adelante configuraremos los archivos',
            code: 'structure-coer91.png'
        },
        {
            subject: 'shared.module.ts',
            target: 'El objetivo es crear un modulo para gestionar componentes y librerias',
            code: 'shared.module.ts' 
        },
        {
            subject: 'app.module.ts',
            target: 'El objetivo es crear el módulo principal',
            code: 'app.module.ts' 
        },
        {
            subject: 'app.routing.ts',
            target: 'El objetivo es incorporar las rutas y paginas que provee la libreria coer91.lib.angular',
            code: 'app.routing.ts'
        },
        {
            subject: 'app.sidenav.ts',
            target: 'El objetivo es configurar el sidenav',
            code: 'app.sidenav.ts'
        },
        {
            subject: 'Environments',
            target: 'El objetivo es configurar los ambientes de la aplicación',
            code: 'environments'
        },
        {
            subject: 'app-root.ts',
            target: 'El objetivo es preparar los valores de login a la aplicación',
            code: 'app-root.ts'
        },
        {
            subject: 'appSetings.js',
            target: 'El objetivo es configurar los parametros generales de la aplicación',
            code: 'appSetings.js'
        },
        {
            subject: 'index.html',
            target: 'El objetivo es incorporar el objeto appSettings a nivel global',
            code: 'index.html'
        },
        {
            subject: 'main.ts',
            target: 'El objetivo es configurar los providers de la aplicación',
            code: 'main.ts'
        }, 
        {
            subject: 'angular.json',
            target: 'El objetivo es configurar los estilos, ambientes y assets',
            directions: ['Identifica las propiedades "sourceRoot", "options", "configurations" y "serve"'],
            code: 'angular.json'
        }, 
        {
            subject: 'tsconfig.json',
            target: 'El objetivo es configurar el typescript',
            directions: ['Dentro de la propiedad "compilerOptions" agrega lel objeto "paths"'],
            code: 'tsconfig.json'
        },
    ]);


    /** */
    protected installLibrary = computed<string>(() => `npm i coer91.angular`);


    /** */
    protected sharedModuleTS = computed<string>(() => 
`
//Modules
import { NgModule } from '@angular/core'; 
import { coer91Module } from 'coer91.angular'; 
 
@NgModule({
    imports: [coer91Module],
    exports: [coer91Module]
})
export class SharedModule { }
    `.trim());


    /** */
    protected appModuleTS = computed<string>(() => 
`
//Modules
import { NgModule } from '@angular/core';   
import { SharedModule } from './shared/shared.module';

@NgModule({ 
    declarations: [
        
    ],
    imports: [SharedModule],
    exports: [SharedModule]
})
export class AppModule { }
    `.trim());


    /** */
    protected appRoutingTS = computed<string>(() => 
`
import { Routes } from '@angular/router';
import { ROUTES_91 } from 'coer91.angular/core'; 

export const ROUTES: Routes = [ 

].concat(ROUTES_91); 
    `.trim());


    /** */
    protected appSidenavTS = computed<string>(() => 
`
import { IMenu } from "coer91.angular/interfaces";

export const NAVIGATION: IMenu[] = [  
  
];
    `.trim());


    /** */
    protected environmentTS = computed<string>(() => 
`
import { GetAppSettings } from "coer91.angular/tools";
import { IAppSettings } from "coer91.angular/interfaces"; 
import { ENVIRONMENT } from "./env.development";

interface IAppEnvironment extends IAppSettings { 
    webAPI: {}
} 

export const appSettings = GetAppSettings<IAppEnvironment>(ENVIRONMENT);
    `.trim());


    /** */
    protected appRootTS = computed<string>(() => 
    ` 
import { environmentSIGNAL } from 'coer91.angular/signals';
import { IAuthService } from 'coer91.angular/interfaces';
import { NAVIGATION } from '../app/app.sidenav'; 
import { AppModule } from '../app/app.module';  
import { appSettings } from '@appSettings';
import { Component } from '@angular/core';  

environmentSIGNAL.set(appSettings.environment); 

@Component({
    selector: 'app-root',
    imports: [AppModule], 
    template: '''
        <coer91-root 
            [authService]="authService" 
            [staticNavigation]="staticNavigation"
        ></coer91-root>
    ''' 
})
export class AppRoot {  
    
    protected staticNavigation = NAVIGATION; 

    protected authService: IAuthService = { 
        Login: {
            userId: 0,
            user: '',
            userNumber: '',
            role: '',
            partner: '',
            fullName: '',
            email: '',
            jwt: '',
            roles: [],
            message: ''
        } 
    }
} 
    `.replaceAll("'''", "`").trim()); 


    /** */
    protected appSetingsJS = computed<string>(() => 
    `
const appSettings = { 
    appInfo: {
        id: 0,
        project: '',
        title: 'COER 91',
        version: '0.0.0', 
        forCompany: ''
    },
    webAPI: {
        development: {},
        staging: {},
        production: {}
    }  
}
    `.trim());


    /** */
    protected indexHTML = computed<string>(() => 
    `
<!doctype html>
<html lang="en">
    <head>
        <base href="/">
        <meta charset="utf-8">
        <meta name="author"   content="Christian Omar Escamilla Rodriguez">
        <meta name="email"    content="coer0408@gmail.com">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon"      type="image/x-icon" href="/coer91/images/coer91.ico">
        <title>My System</title>
    </head>

    <body>
        <app-root></app-root>
        <script src="config/appSettings.js"></script> 
    </body>
</html>
    `.trim()); 


    /** */
    protected mainTS = computed<string>(() => 
    `
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
    `.trim()); 


    /** */
    protected angularSourceRootJSON = computed<string>(() => `"sourceRoot": "src/config",`);


    /** */
    protected angularOptionsJSON = computed<string>(() => 
    `
"options": {
    "browser": "src/config/main.ts",
    "tsConfig": "tsconfig.app.json",
    "inlineStyleLanguage": "scss",
    "assets": [
        { "glob": "**/*", "input": "public" },
        { "glob": "**/*", "input": "./node_modules/coer91.angular/images", "output": "/coer91/images" },
        { "glob": "appSettings.js", "input": "./src/config", "output": "/config" }
    ],
    "styles": ["./node_modules/coer91.angular/styles/lib/coer91.css"],
    "stylePreprocessorOptions": {
        "includePaths": ["."]
    }
},
    `.trim());


    /** */
    protected angularConfigurationsJSON = computed<string>(() => 
    `
"configurations": {
    "development": { 
        "optimization": false, 
        "extractLicenses": false, 
        "sourceMap": true 
    },
    "staging": {
        "budgets": [
            { "type": "initial", "maximumWarning": "10mb", "maximumError": "10mb" },
            { "type": "anyComponentStyle", "maximumWarning": "10kb", "maximumError": "10kb" }
        ],
        "fileReplacements": [{
            "replace": "src/config/environments/env.development.ts",
            "with": "src/config/environments/env.staging.ts"
        }],
        "outputHashing": "all"
    },
    "production": {
        "budgets": [
            { "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" },
            { "type": "anyComponentStyle", "maximumWarning": "4kB", "maximumError": "8kB" }
        ],
        "fileReplacements": [{
            "replace": "src/config/environments/env.development.ts",
            "with": "src/config/environments/env.production.ts"
        }],
        "outputHashing": "all"
    }            
},
"defaultConfiguration": "staging"
    `.trim());


    /** */
    protected angularServeJSON = computed<string>(() => 
    `
"serve": {
    "builder": "@angular/build:dev-server",
    "configurations": {
        "development": { "buildTarget": "YOUR_PROJECT_NAME:build:development" },
        "staging": { "buildTarget": "YOUR_PROJECT_NAME:build:staging" },
        "production": { "buildTarget": "YOUR_PROJECT_NAME:build:production" } 
    },
    "defaultConfiguration": "development"
},
    `.trim());


    /** */
    protected tsconfigJSON = computed<string>(() => 
    `
"paths": { 
    "@appSettings": ["./src/config/environments/index.ts"],  
}
    `.trim());
}