import { IAuthService, IHttpResponse, ILogin, ILoginResponse, IMenu, IToolbarMenu, IUserRole } from 'coer91.angular/interfaces'; 
import { Component, input, output, signal, viewChild } from '@angular/core'; 
import { isLoadingSIGNAL, userSIGNAL } from 'coer91.angular/signals';  
import { Access, Tools } from 'coer91.angular/tools'; 
import { Coer91Component } from './coer91.component';
declare const appSettings: any;

@Component({
    selector: 'coer91-root', 
    standalone: false,
    template: `
        <coer91-component
            #coer91Component 
            [navigation]="_navigation()"  
            [toolbarShowUserData]="IsFunction(this.authService().Login)"
            [toolbarShowProfileMenu]="true"
            [toolbarShowPasswordMenu]="IsNotNull(authService().RecoveryPassword)"
            [toolbarShowLogOutMenu]="true" 
            (onLogin)="Login($event)"
            (onRecoveryPassword)="RecoveryPassword($event)"
            (onUpdatePassword)="SetPassword($event)"
            (onUpdateRole)="UpdateRole($event)"
            (onUpdateJWT)="UpdateJWT()"
            (onClickToolbarMenu)="ToolbarMenu($event)"
        ></coer91-component>
    `
})
export class Coer91Root { 

    //Elements
    protected readonly _coer91 = viewChild.required<Coer91Component>('coer91Component');

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

        if(!Tools.IsBooleanFalse(appSettings?.navigation?.static) || !Tools.IsFunction(this.authService()?.GetNavigationByRole)) { 
            await Tools.Sleep();
            this._navigation.set(this.staticNavigation());
        }                     

        else {
            const FUNCTION = this.authService().GetNavigationByRole as (project: string, role: string) => Promise<IHttpResponse<IMenu[]>>;

            const project = appSettings?.appInfo?.project || '';
            const role = userSIGNAL()?.role || '';
            const response = await FUNCTION(project, role);   
            
            if(response.ok) this._navigation.set(response.body);
             
            else {
                console.error(response.message);
                this._coer91().alert.Error('GetNavigation');
            }
        } 
    }


    /** */
    protected async RecoveryPassword(user: string): Promise<void> { 
        if(Tools.IsFunction(this.authService()?.RecoveryPassword)) {
            const FUNCTION = this.authService().RecoveryPassword as (userEmail: string) => Promise<IHttpResponse<ILogin>>;
            
            isLoadingSIGNAL.set(true);
            const response = await FUNCTION(user);   
    
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

        this.onRecoveryPassword.emit(user);
    }


    /** */
    protected async SetPassword(password: string): Promise<void> { 
        if(Tools.IsFunction(this.authService()?.SetPassword)) {
            const FUNCTION = this.authService().SetPassword as (login: ILogin) => Promise<IHttpResponse<string>>;
    
            isLoadingSIGNAL.set(true);
            const user = userSIGNAL()?.user || '';
            const response = await FUNCTION({ user, password });   
    
            if(response.ok) {
                this._coer91().alert.Success(response.body, 'Change Password', 'i91-lock-fill');
                this._coer91().CloseModal();
            }
    
            else {
                this._coer91().alert.Warning(response.message, 'Change Password', 'i91-lock-fill'); 
            } 
    
            isLoadingSIGNAL.set(false);
        }

        this.onUpdatePassword.emit(password);
    }


    /** */
    protected async UpdateRole(roleId: string): Promise<void> {
        if(Tools.IsFunction(this.authService()?.SetMainUsersRole)) {
            const FUNCTION = this.authService().SetMainUsersRole as (userId: number, roleId: string | number) => Promise<IHttpResponse<IUserRole>>;
            
            isLoadingSIGNAL.set(true); 
            const userId = userSIGNAL()?.userId || 0;
            const response = await FUNCTION(userId, roleId);   
    
            if(response.ok) {
                await this.UpdateJWT();
                userSIGNAL.set(Access.GetUser());
                this._coer91().CloseModal();
                this._coer91().alert.Success('The rol has been updated', response.body.role); 
                await this.GetNavigation(); 
            }
    
            else {
                this._coer91().alert.Warning(response.message);
            } 
    
            isLoadingSIGNAL.set(false);
        } 

        this.onUpdateRole.emit(roleId);
    }


    /** */
    protected async UpdateJWT(): Promise<void> {      
        if(Tools.IsFunction(this.authService()?.UpdateJWT)) {
            const FUNCTION = this.authService().UpdateJWT as () => Promise<IHttpResponse<string>>;
    
            const JWT = await FUNCTION();   
            if(JWT.ok) Access.SetUser(JWT.body);
            
            else {
                console.error(JWT.message);
                this._coer91().alert.Error('UpdateJWT');
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