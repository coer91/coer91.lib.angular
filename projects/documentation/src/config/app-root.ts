import { IAuthService, ILogin, ILoginResponse, IMenu, IUserRole } from 'coer91.angular/interfaces';
import { environmentSIGNAL } from 'coer91.angular/signals';
import { NAVIGATION } from '../app/app.sidenav'; 
import { AppModule } from '../app/app.module'; 
import { HTTP } from 'coer91.angular/tools';
import { appSettings } from '@appSettings';
import { Component } from '@angular/core';   

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

    private readonly AuthController = `${appSettings.webAPI.mySystem}/api/Auth`; 
    private readonly UsersRoleController = `${appSettings.webAPI.mySystem}/api/UsersRole`;  
    private readonly NavigationController = `${appSettings.webAPI.mySystem}/api/Navigation`; 
    
    protected staticNavigation = NAVIGATION; 

    // protected authService: IAuthService = { 
    //     Login: {
    //         userId: 1,
    //         user: 'COER',
    //         userNumber: '',
    //         role: 'Developer',
    //         partner: '',
    //         fullName: 'Christian',
    //         email: '',
    //         jwt: '',
    //         roles: ['Developer'],
    //         message: ''
    //     } 
    // }

    protected authService: IAuthService = { 
            
        /** HTTP POST */
        Login: (login: ILogin) => HTTP.POST<ILoginResponse>({
            url: `${this.AuthController}/Login`,
            body: login
        }),
    
    
        /** HTTP POST */
        RecoveryPassword: (userEmail: string) => HTTP.POST<ILogin>({
            url: `${this.AuthController}/RecoveryPasswordEmail/${userEmail}` 
        }),
    
    
        /** HTTP PUT */
        SetPassword: (login: ILogin) => HTTP.PUT<string>({
            url: `${this.AuthController}/SetPassword`,
            body: login,
            responseType: 'text'  
        }),
    
    
        /** HTTP PUT */
        UpdateJWT: () => HTTP.PUT<string>({
            url: `${this.AuthController}/UpdateJWT`,
            responseType: 'text' 
        }),
    
    
        /** HTTP PUT */
        SetMainUsersRole: (userId: number, roleId: number | string) => HTTP.PUT<IUserRole>({
            url: `${this.UsersRoleController}/SetMainUsersRole/${userId}/${roleId}` 
        }),
    
    
        /** HTTP GET */
        GetNavigationByRole: (project: string, role: string) => HTTP.GET<IMenu[]>({
            url: `${this.NavigationController}/GetNavigationByRole`,
            queryParams: [
                { param: 'project', value: project },
                { param: 'role',    value: role    }
            ]
        }),
    }
}