import { Component, computed } from '@angular/core';   
import { Page, Tools } from 'coer91.angular/tools';
import { IStep } from './interface';

@Component({
    selector: 'install-page',
    templateUrl: './install.page.html', 
    styleUrl: './install.page.scss',  
    standalone: false
})
export class InstallPage extends Page {  

    //Variables
    protected IsNotNull = Tools.IsNotNull;
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected Clipboard = Tools.Clipboard;
 
    constructor() {
        super('Install')
    }   

    protected stepList = computed<IStep[]>(() => [
        this.createProject(),
        this.installLibrary(),
        this.projectStructure(),
        this.sharedModule(), 
        this.appRouting(), 
        this.appSidenav(),  
        this.environmentTS(),
        this.appRoot(),
        this.appSettings(),
        this.indexHTML(), 
        this.mainTS(),
        this.angularJSON(),
        this.tsconfigJSON(),
    ]);


    /** */
    protected createProject = computed<IStep>(() => ({
        title: 'Crea el proyecto',
        target: 'El primer paso es crear el proyecto angular',
        image: '',
        directions: [
            `Asegurate que utilice SCSS`,
        ],
        codes: [
            {
                copyMessage: '',
                description: '',
                code: `ng new [YOUR_PROJECT_NAME]`
            }
        ]
    }));


    /** */
    protected installLibrary = computed<IStep>(() => ({
        title: 'Descargar la libreria',
        target: 'El siguiente paso es descargar e instalar la libreria',
        image: '',
        directions: [
            `Abre la consola, asegurate de estar posicionado en el proyecto, posteriormente ejecuta el siguiente comando`,
            `Puedes obtener mas información del paquete en: <a href="https://www.npmjs.com/package/coer91.angular" target="_blank">npm</a>`
        ],
        codes: [
            {
                copyMessage: 'npm i coer91.angular',
                description: '',
                code: `npm i coer91.angular`
            }
        ]
    }));


    /** */
    protected projectStructure = computed<IStep>(() => ({
        title: 'Estructura del proyecto',
        target: 'El objetivo es crear una arquitectura limpia y escalable',
        image: 'structure-coer91.png',
        directions: [
            `Puedes descargar la carpeta <a href="src.zip" download="src.zip">src</a> previamente configurada y solo sustituirla`,
            `Si lo prefieres puedes estructurar las carpetas y archivos manualmente como la <a href="structure-coer91.png" download="structure-coer91.png">imagen</a>`,
            `Si optas por descargar la carpeta <a href="src.zip" download="src.zip">src</a> puedes pasarte hasta el <b>Step angular.json</b>`
        ],
        codes: []
    }));


    /** */
    protected sharedModule = computed<IStep>(() => ({
        title: 'shared.module.ts',
        target: 'El objetivo es crear un modulo para gestionar componentes y librerias',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'shared.module.ts',
                description: '',
                code: `
import { NgModule } from '@angular/core';
import { coer91Module } from 'coer91.angular';
 
@NgModule({
    imports: [coer91Module],
    exports: [coer91Module]
})
export class SharedModule { }
    `.trim()
            }
        ] 
    }));    


    /** */
    protected appRouting = computed<IStep>(() => ({
        title: 'app.routing.ts',
        target: 'El objetivo es incorporar las rutas y paginas que provee la libreria',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'app.routing.ts',
                description: '',
                code: `
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';   
import { ROUTES_91 } from 'coer91.angular/core'; 
import { SharedModule } from './shared/shared.module';

export const ROUTES = ([

] as Routes).concat(ROUTES_91);

@NgModule({ 
    declarations: [
        
    ],
    imports: [SharedModule],
    exports: [SharedModule]
})
export class AppModule { }
    `.trim()
            }
        ] 
    }));  
    
    
    /** */
    protected appSidenav = computed<IStep>(() => ({
        title: 'app.sidenav.ts',
        target: 'El objetivo es configurar el sidenav',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'app.sidenav.ts',
                description: '',
                code: `
import { IMenu } from "coer91.angular/interfaces";

export const NAVIGATION: IMenu[] = [
  
];
    `.trim()
            }
        ] 
    })); 


    /** */
    protected environmentTS = computed<IStep>(() => ({
        title: 'Environments',
        target: 'El objetivo es configurar los ambientes de la aplicación',
        image: '',
        directions: [],
        codes: [
            { 
                copyMessage: 'env.development.ts',
                description: 'Para el archivo env.development.ts',
                code: `export const ENVIRONMENT = 'DEVELOPMENT';` 
            },
            { 
                copyMessage: 'env.production.ts',
                description: 'Para el archivo env.production.ts',
                code: `export const ENVIRONMENT = 'PRODUCTION';` 
            },
            { 
                copyMessage: 'env.staging.ts',
                description: 'Para el archivo env.staging.ts',
                code: `export const ENVIRONMENT = 'STAGING';` 
            },            
            { 
                copyMessage: 'index.ts',
                description: 'Para el archivo index.ts',
                code: `
import { GetAppSettings } from "coer91.angular/tools";
import { IAppSettings } from "coer91.angular/interfaces";
import { ENVIRONMENT } from "./env.development";

interface IAppEnvironment extends IAppSettings {
    webAPI: {}
}

export const appSettings = GetAppSettings<IAppEnvironment>(ENVIRONMENT);
    `.trim() 
            }
        ]
    }));
  


    /** */
    protected appRoot = computed<IStep>(() => ({
        title: 'app-root.ts',
        target: 'El objetivo es generar un usuario dummy para poder ingresar a la aplicación',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'app-root.ts',
                description: '',
                code: ` 
import { environmentSIGNAL } from 'coer91.angular/signals';
import { IAuthService } from 'coer91.angular/interfaces';
import { NAVIGATION } from '../app/app.sidenav';
import { AppModule } from '../app/app.routing';
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
            user: 'COER91',
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
    `.replaceAll("'''", "`").trim()
            }
        ] 
    }));  


    /** */
    protected appSettings = computed<IStep>(() => ({
        title: 'appSetings.js',
        target: 'El objetivo es configurar los parametros generales de la aplicación',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'appSetings.js',
                description: '',
                code: `
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
    `.trim()
            }
        ]  
    })); 


    /** */
    protected indexHTML = computed<IStep>(() => ({
        title: 'index.html',
        target: 'El objetivo es incorporar el objeto appSettings a nivel global',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'index.html',
                description: '',
                code: `
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
    `.trim()
            }
        ] 
    }));  


    /** */
    protected mainTS = computed<IStep>(() => ({
        title: 'main.ts',
        target: 'El objetivo es configurar los providers de la aplicación',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'main.ts',
                description: '',
                code: `
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
    `.trim()
            }
        ] 
    }));  


    /** */
    protected angularJSON = computed<IStep>(() => ({
        title: 'angular.json',
        target: 'El objetivo es configurar los estilos, ambientes y assets',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'sourceRoot',
                description: 'Identifica las propiedad "sourceRoot"',
                code: `"sourceRoot": "src/config",`
            },
            {
                copyMessage: 'options',
                description: 'Identifica las propiedad "options"',
                code: `
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
    `.trim()
            },
            {
                copyMessage: 'configurations',
                description: 'Identifica las propiedad "configurations"',
                code: `
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
    `.trim()
            },
            {
                copyMessage: 'serve',
                description: 'Identifica las propiedad "serve", remplaza <b>[YOUR_PROJECT_NAME]</b> por el nombre de tu proyecto',
                code: `
"serve": {
    "builder": "@angular/build:dev-server",
    "configurations": {
        "development": { "buildTarget": "[YOUR_PROJECT_NAME]:build:development" },
        "staging": { "buildTarget": "[YOUR_PROJECT_NAME]:build:staging" },
        "production": { "buildTarget": "[YOUR_PROJECT_NAME]:build:production" } 
    },
    "defaultConfiguration": "development"
},
    `.trim()
            }
        ] 
    }));   
 

    /** */
    protected tsconfigJSON = computed<IStep>(() => ({
        title: 'tsconfig.json',
        target: 'El objetivo es configurar el typescript',
        image: '',
        directions: [],
        codes: [
            {
                copyMessage: 'tsconfig.json',
                description: 'Dentro de la propiedad "compilerOptions" agrega el objeto "paths"',
                code: `
"paths": { 
    "@appShared":   ["./src/app/shared/shared.module.ts"   ],
    "@interfaces":  ["./src/app/shared/interfaces/index.ts"],
    "@services":    ["./src/app/shared/services/index.ts"  ],
    "@appSettings": ["./src/config/environments/index.ts"  ],  
},
    `.trim()
            }
        ] 
    })); 
}