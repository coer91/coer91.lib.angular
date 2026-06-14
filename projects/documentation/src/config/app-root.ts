import { IAuthService } from 'coer91.angular/interfaces';
import { environmentSIGNAL } from 'coer91.angular/signals';
import { NAVIGATION } from '../app.sidenav';  
import { appSettings } from '@appSettings';
import { Component } from '@angular/core';   
import { AppModule } from '../app/app.routing';

environmentSIGNAL.set(appSettings.environment); 

@Component({
    selector: 'app-root',
    imports: [AppModule], 
    template: `
        <coer91-root 
            [authService]="authService" 
            [staticNavigation]="staticNavigation"
        ></coer91-root>
    `
})
export class AppRoot {   
    
    protected staticNavigation = NAVIGATION; 

    protected authService: IAuthService = { 
            
        Login: {
            UserId: 0,
            User: 'COER91', 
            PartnerId: 0,
            Partner: '',
            FullName: '',
            Email: '',
            JWT: '',
            Roles: [],
            Language: '',
            Message: ''
        } 
    }
}