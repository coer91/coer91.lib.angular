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
            UserId: 1,
            User: 'coer91', 
            PartnerId: 1,
            Partner: 'COER System',
            FullName: 'Christian Omar Escamilla Rodriguez',
            Email: 'coer0408@gmail.com',
            JWT: '',
            Roles: ['Developer', 'Admin'],
            Language: '',
            Message: ''
        } 
    }
}