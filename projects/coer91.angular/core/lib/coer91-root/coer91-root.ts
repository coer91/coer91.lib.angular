import { IAppSettings, IAuthService, IHttpResponse, ILogin, ILoginResponse, IMenu, IToolbarMenu } from 'coer91.angular/interfaces'; 
import { Component, input, output, signal, viewChild } from '@angular/core'; 
import { isLoadingSIGNAL, navigationSIGNAL, userSIGNAL } from 'coer91.angular/signals';  
import { Access, Tools } from 'coer91.angular/tools'; 
import { Coer91Component } from './coer.component';
declare const appSettings: any;

@Component({
    selector: 'coer91', 
    standalone: false,
    template: `
        <coer-component
            #Coer91Component 
            [toolbarShowUserData]="showUserData()"
            [toolbarShowProfileMenu]="true"
            [toolbarShowPasswordMenu]="IsNotNull(authService().RecoveryPassword)"
            [toolbarShowLogOutMenu]="true" 
            (onLogin)="Login($event)"
            (onRecoveryPassword)="RecoveryPassword($event)"
            (onUpdatePassword)="SetPassword($event)" 
            (onUpdateJWT)="UpdateJWT()"
            (onClickToolbarMenu)="ClickToolbarMenu($event)"
        ></coer-component>
    `
})
export class Coer91Root { 

    //Elements
    protected readonly _coer91 = viewChild.required<Coer91Component>('Coer91Component');

    //Variables  
    private readonly appSettings: IAppSettings = appSettings; 
    protected readonly IsNotNull = Tools.IsNotNull; 
    protected readonly IsFunction = Tools.IsFunction; 

    //Inputs
    public authService      = input.required<IAuthService>(); 
    public staticNavigation = input<IMenu[]>([]);
    public showUserData     = input<boolean>(true); 

    //Output
    protected readonly onLogin            = output<ILogin>();
    protected readonly onRecoveryPassword = output<string>(); 
    protected readonly onUpdatePassword   = output<string>();
    protected readonly onUpdateRole       = output<string>();
    protected readonly onUpdateJWT        = output<void>();
    protected readonly onClickToolbarMenu = output<IToolbarMenu>();


    /** */
    constructor() {        
        if(Access.IsLogin()) {  
            isLoadingSIGNAL.set(true);
            userSIGNAL.set(Access.GetUser()); 
            this.GetNavigation().then(() => isLoadingSIGNAL.set(false));  
        }   

        else Tools.Sleep().then(() => {
            if(!Tools.IsFunction(this.authService().Login)) this.Login();
        }); 
    } 


    /** */
    protected async Login(login?: ILogin): Promise<void> { 
        
        if(login && Tools.IsFunction(this.authService().Login)) {            
            const FUNCTION = this.authService().Login as (login: ILogin) => Promise<IHttpResponse<ILoginResponse>>;
            
            const loginResponse = await FUNCTION(login); 
    
            if(loginResponse.ok) {
                const access = this._coer91().SetAccess(loginResponse.data);
    
                if(access) {
                    this.GetNavigation();
                } 
            }
    
            else {
                if(loginResponse.status < 500) {
                    this._coer91().alert.Warning(loginResponse.message, 'Not Access', 'i91-hand-stop-fill');
                }

                else {
                    console.error(loginResponse.message);
                    this._coer91().alert.Danger('Login');
                }
            } 
    
            isLoadingSIGNAL.set(false);
            this.onLogin.emit(login);
        }

        else {  
            const user   = this.authService().Login as ILoginResponse;
            const access = this._coer91().SetAccess(user);    
            if(access) this.GetNavigation();
        } 
    } 


    /** */
    protected async GetNavigation(): Promise<void> {
        let NAVIGATION: IMenu[] = [];
        await Tools.Sleep();
        
        //Add home option
        const HOME: IMenu[] = [];
        if(this.appSettings.navigation.showHome) {
            HOME.push({ Id: 1, Label: 'Home', Icon: 'i91-home-door-fill', Path: '/home' }); 
        } 
        
        //Is static?
        if(this.appSettings.navigation.static) { 
            NAVIGATION = this.staticNavigation();
        }                     

        else {
            if(Tools.IsFunction(this.authService()?.GetNavigation)) {
                const FUNCTION = this.authService().GetNavigation as (projectId: number) => Promise<IHttpResponse<IMenu[]>>;    
                const response = await FUNCTION(this.appSettings.appInfo.id);   
                
                if(response.ok) {
                    NAVIGATION = response.data;
                }
                 
                else {
                    this._coer91().alert.Danger('GetNavigation');
                    console.error(response.message);
                }
            }

            else this._coer91().alert.DangerOk('Navigation is not static');
        }  

        navigationSIGNAL.set(([] as IMenu[]).concat(HOME).concat(NAVIGATION));
    }


    /** */
    protected async RecoveryPassword(user: string): Promise<void> { 
        if(Tools.IsFunction(this.authService()?.RecoveryPassword)) {
            const FUNCTION = this.authService().RecoveryPassword as (userEmail: string) => Promise<IHttpResponse<ILogin>>;
            
            isLoadingSIGNAL.set(true);
            const response = await FUNCTION(user);   
    
            if(response.ok) {
                this._coer91().alert.Information(response.data.Password);
                this._coer91().Show('LOGIN'); 
            }
    
            else {
                this._coer91().alert.Warning(response.message);
                this._coer91().FocusUser();
            } 
    
            isLoadingSIGNAL.set(false);
        } 

        this.onRecoveryPassword.emit(user);
    }


    /** */
    protected async SetPassword(Password: string): Promise<void> { 
        if(Tools.IsFunction(this.authService()?.SetPassword)) {
            const FUNCTION = this.authService().SetPassword as (login: ILogin) => Promise<IHttpResponse<string>>;
    
            isLoadingSIGNAL.set(true);
            const User = userSIGNAL()?.User || '';
            const response = await FUNCTION({ User, Password });   
    
            if(response.ok) {
                this._coer91().alert.Success(response.data, 'Change Password', 'i91-lock-fill');
                this._coer91().CloseModal();
            }
    
            else {
                this._coer91().alert.Warning(response.message, 'Change Password', 'i91-lock-fill'); 
            } 
    
            isLoadingSIGNAL.set(false);
        }

        this.onUpdatePassword.emit(Password);
    }


    /** */
    // protected async UpdateRole(roleId: string): Promise<void> {
    //     if(Tools.IsFunction(this.authService()?.SetUserRoleMain)) {
    //         const FUNCTION = this.authService().SetUserRoleMain as (userId: number, roleId: string | number) => Promise<IHttpResponse<IUserRole>>;
            
    //         isLoadingSIGNAL.set(true); 
    //         const userId = userSIGNAL()?.UserId || 0;
    //         const response = await FUNCTION(userId, roleId);   
    
    //         if(response.ok) {
    //             if(Tools.IsBooleanTrue(appSettings?.security?.useJWT)) { 
    //                 await this.UpdateJWT();
    //             }

    //             else {
    //                 const ACCESS_USER = Access.GetUser() as IUser;
    //                 ACCESS_USER.RoleId = response.data.RoleId;
    //                 ACCESS_USER.Role = response.data.Role;

    //                 Access.SetUser({ ...ACCESS_USER });
    //             }
                
    //             userSIGNAL.set(Access.GetUser());
    //             this._coer91().CloseModal();
    //             this._coer91().alert.Success('The rol has been updated', response.data.Role); 
    //             await this.GetNavigation(); 
    //             this._coer91().router.navigateByUrl(appSettings?.navigation?.redirectTo);
    //         }
    
    //         else {
    //             this._coer91().alert.Warning(response.message);
    //         } 
    
    //         isLoadingSIGNAL.set(false);
    //     } 

    //     this.onUpdateRole.emit(roleId);
    // }


    /** */
    protected async UpdateJWT(): Promise<void> {      
        if(Tools.IsFunction(this.authService()?.UpdateJWT)) {
            const FUNCTION = this.authService().UpdateJWT as () => Promise<IHttpResponse<string>>;
    
            const JWT = await FUNCTION();   
            if(JWT.ok) this._coer91().SetUser(JWT.data);
            
            else {
                console.error(JWT.message);
                this._coer91().alert.Danger('UpdateJWT');
            }
        } 

        this.onUpdateJWT.emit();
    } 


    /** */
    protected ClickToolbarMenu(menu: IToolbarMenu): void {
        if(menu.label === 'Log Out' && !Tools.IsFunction(this.authService().Login)) {
            this.Login();
        }

        this.onClickToolbarMenu.emit(menu);
    }
}