import { IAuthService, IHttpResponse, ILogin, ILoginResponse, IMenu, IToolbarMenu } from 'coer91.angular/interfaces'; 
import { Component, input, output, signal, viewChild } from '@angular/core'; 
import { isLoadingSIGNAL, userSIGNAL } from 'coer91.angular/signals';  
import { Access, Tools } from 'coer91.angular/tools'; 
import { COER91Component } from './coer.component';
declare const appSettings: any;

@Component({
    selector: 'coer91-root', 
    standalone: false,
    template: `
        <coer-component
            #COER91Component 
            [navigation]="_navigation()"  
            [toolbarShowUserData]="IsFunction(this.authService().Login)"
            [toolbarShowProfileMenu]="true"
            [toolbarShowPasswordMenu]="IsNotNull(authService().RecoveryPassword)"
            [toolbarShowLogOutMenu]="true" 
            (onLogin)="Login($event)"
            (onRecoveryPassword)="RecoveryPassword($event)"
            (onUpdatePassword)="SetPassword($event)" 
            (onUpdateJWT)="UpdateJWT()"
            (onClickToolbarMenu)="ToolbarMenu($event)"
        ></coer-component>
    `
})
export class COER91Root { 

    //Elements
    protected readonly _coer91 = viewChild.required<COER91Component>('COER91Component');

    //Variables  
    protected readonly _navigation = signal<IMenu[]>([]);  
    protected readonly IsNotNull = Tools.IsNotNull; 
    protected readonly IsFunction = Tools.IsFunction; 

    //Inputs
    public authService = input.required<IAuthService>(); 
    public staticNavigation = input<IMenu[]>([]); 

    //Output
    protected readonly onLogin            = output<ILogin>();
    protected readonly onRecoveryPassword = output<string>(); 
    protected readonly onUpdatePassword   = output<string>();
    protected readonly onUpdateRole       = output<string>();
    protected readonly onUpdateJWT        = output<void>();
    protected readonly onClickToolbarMenu = output<IToolbarMenu>();

    //Start
    constructor() {          
        if(Access.IsLogin()) {  
            isLoadingSIGNAL.set(true);
            userSIGNAL.set(Access.GetUser()); 
            this.GetNavigation().then(() => isLoadingSIGNAL.set(false));  
        }   

        else Tools.Sleep().then(() => {
            if(!Tools.IsFunction(this.authService().Login)) {
                this.Login();
            }
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
                    this._coer91().alert.Warning(loginResponse.message, 'Not Access', 'iw-hand-stop-fill');
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
            const access = this._coer91().SetAccess(this.authService().Login as ILoginResponse);
    
            if(access) {
                this.GetNavigation();
            } 
        } 
    } 


    /** */
    protected async GetNavigation(): Promise<void> {
        this._navigation.set([]);

        await Tools.Sleep(); 
         
        if(!Tools.IsBooleanFalse(appSettings?.navigation?.static)) { 
            this._navigation.set(this.staticNavigation());
        }                     

        else {
            if(Tools.IsFunction(this.authService()?.GetNavigation)) {
                const FUNCTION = this.authService().GetNavigation as (projectId: number) => Promise<IHttpResponse<IMenu[]>>;
    
                const project = Number(appSettings?.appInfo?.id || 0); 
                const response = await FUNCTION(project);   
                
                if(response.ok) this._navigation.set(response.data);
                 
                else {
                    console.error(response.message);
                    this._coer91().alert.Danger('GetNavigation');
                }
            }

            else this._navigation.set(this.staticNavigation());
        } 
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
                this._coer91().alert.Success(response.data, 'Change Password', 'iw-lock-fill');
                this._coer91().CloseModal();
            }
    
            else {
                this._coer91().alert.Warning(response.message, 'Change Password', 'iw-lock-fill'); 
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
            if(JWT.ok) Access.SetUser(JWT.data);
            
            else {
                console.error(JWT.message);
                this._coer91().alert.Danger('UpdateJWT');
            }
        } 

        this.onUpdateJWT.emit();
    } 


    /** */
    protected ToolbarMenu(menu: IToolbarMenu): void {
        if(menu.label === 'Log Out') {
            if(!Tools.IsFunction(this.authService().Login)) {
                this.Login();
            }
        }

        this.onClickToolbarMenu.emit(menu);
    }
}