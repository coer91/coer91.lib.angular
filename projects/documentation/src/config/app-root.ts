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