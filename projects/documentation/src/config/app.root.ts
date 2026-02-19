import { Component, signal, viewChild } from '@angular/core';  
import { environmentSIGNAL, isLoadingSIGNAL, userSIGNAL } from 'coer91.angular/signals';
import { AppModule } from '../app/app.module';
import { NAVIGATION } from '../app/app.sidenav'; 
import { ILogin, IMenu } from 'coer91.angular/interfaces';
import { Coer91 } from 'coer91.angular/core';
import { Access } from 'coer91.angular/tools'; 
import { appSettings, AuthService } from '@appSettings';

@Component({
    selector: 'app-root',
    imports: [AppModule], 
    template: `
        <coer91
            #coer91 
            [navigation]="navigation()" 
            (onLogin)="Login($event)"
            (onRecoveryPassword)="RecoveryPassword($event)"
            (onUpdatePassword)="SetPassword($event)"
            (onUpdateJWT)="UpdateJWT()"
        ></coer91>
    `
})
export class AppRoot { 

    //Elements
    protected readonly _coer91 = viewChild.required<Coer91>('coer91');

    //Variables  
    protected readonly navigation = signal<IMenu[]>([]); 

    //Start
    constructor(private authService: AuthService) { 
        environmentSIGNAL.set(appSettings.environment);   
         
        if(Access.IsLogin()) {  
            isLoadingSIGNAL.set(true);
            userSIGNAL.set(Access.GetUser());
            this.GetNavigation().then(() => isLoadingSIGNAL.set(false));  
        }  
    }


    /** */
    protected async GetNavigation(): Promise<void> {
        if(appSettings.navigation.static) {
            this.navigation.set(NAVIGATION);
        }                     

        else {
            const project = appSettings.appInfo.project;   
            const role = userSIGNAL()?.role || '';
            const navigation = await this.authService.GetNavigationByRole(project, role);   
            
            if(navigation.ok) this.navigation.set(navigation.body);
             
            else {
                console.error(navigation.message);
                this._coer91().alert.Error('GetNavigation');
            }
        } 
    }


    /** */
    protected async RecoveryPassword(user: string): Promise<void> {   
        isLoadingSIGNAL.set(true);

        const response = await this.authService.RecoveryPassword(user);   

        if(response.ok) {
            this._coer91().alert.Information(response.body.password);
            this._coer91().Show('LOGIN'); 
        }

        else {
            this._coer91().alert.Warning(response.message);
            this._coer91().FocusUser();
        } 

        isLoadingSIGNAL.set(false);
    }


    /** */
    protected async SetPassword(password: string): Promise<void> {   
        isLoadingSIGNAL.set(true);

        const user = userSIGNAL()?.user || '';
        const response = await this.authService.SetPassword({ user, password });   

        if(response.ok) {
            this._coer91().alert.Success(response.body, 'Change Password', 'i91-lock-fill');
            this._coer91().CloseModal();
        }

        else {
            this._coer91().alert.Warning(response.message, 'Change Password', 'i91-lock-fill'); 
        } 

        isLoadingSIGNAL.set(false);
    }


    /** */
    protected async UpdateJWT(): Promise<void> {      
        const JWT = await this.authService.UpdateJWT();   
        if(JWT.ok) Access.SetUser(JWT.body);
        
        else {
            console.error(JWT.message);
            this._coer91().alert.Error('UpdateJWT');
        } 
    }


    /** */
    protected async Login(login: ILogin): Promise<void> { 
        const loginResponse = await this.authService.Login(login); 

        if(loginResponse.ok) {
            const access = this._coer91().SetAccess(loginResponse.body);

            if(access) {
                this.GetNavigation();
            } 
        }

        else {
            console.error(loginResponse.message);
            this._coer91().alert.Error('Login');
        } 

        isLoadingSIGNAL.set(false);
    } 


    
}