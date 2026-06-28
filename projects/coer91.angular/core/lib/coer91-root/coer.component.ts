import { Component, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';  
import { IAppSettings, ILogin, ILoginResponse, IToolbarMenu, IUser } from 'coer91.angular/interfaces';
import { Access, CoerAlert, Dates, Screen, Tools } from 'coer91.angular/tools';
import { screenSizeSIGNAL, userSIGNAL } from 'coer91.angular/signals';
import { Toolbar } from '../toolbar/toolbar.component';
import { LoginPage } from '../login/login.component';
import { Router } from '@angular/router'; 

import { Sidenav } from '../sidenav/sidenav.component';
declare const appSettings: any;

@Component({
    selector: 'coer-component',
    templateUrl: './coer.component.html', 
    styleUrl: './coer.component.scss', 
    standalone: false
})
export class Coer91Component {   

    //Injection
    protected readonly _alert  = inject(CoerAlert); 
    protected readonly _router = inject(Router); 

    //Elements
    protected readonly _toolbar = viewChild<Toolbar>('toolbar');
    protected readonly _sidenav = viewChild<Sidenav>('sidenav');
    protected readonly _login = viewChild<LoginPage>('login');

    //Variables
    private readonly appSettings: IAppSettings = appSettings;
    public readonly alert  = this._alert; 
    public readonly router = this._router;   
    protected readonly isOpenSidenav = signal<boolean>(true);
    protected _watchJWT$!: any; 

    //Inputs  
    public readonly toolbarMenu                = input<IToolbarMenu[]>([]);
    public readonly toolbarShowUserData        = input<boolean>(false);
    public readonly toolbarShowProfileMenu     = input<boolean>(true); 
    public readonly toolbarPreventProfileMenu  = input<boolean>(false); 
    public readonly toolbarShowPasswordMenu    = input<boolean>(true); 
    public readonly toolbarPreventPasswordMenu = input<boolean>(false);  
    public readonly toolbarShowLogOutMenu      = input<boolean>(true);  
    public readonly toolbarPreventLogOutMenu   = input<boolean>(false); 

    //Output
    protected readonly onLogin            = output<ILogin>();
    protected readonly onRecoveryPassword = output<string>(); 
    protected readonly onUpdateJWT        = output<void>();
    protected readonly onClickToolbarMenu = output<IToolbarMenu>();
    protected readonly onUpdatePassword   = output<string>();
    protected readonly onUpdateRole       = output<string>();
 
    constructor() {    
        Screen.Resize.subscribe(screenSizeSIGNAL.set);  

        effect(() => { 
            if(this._isLogin()) this._WatchJWT(); 
            
            else {
                clearInterval(this._watchJWT$);
                Tools.Sleep().then(() => this._login()?.SetUser(Access.RememberUser()));
            }
        });    
    } 


    //Computed
    protected _isLogin = computed(() => { 
        return Tools.IsNotNull(userSIGNAL()) 
            && Tools.IsNotOnlyWhiteSpace(userSIGNAL()?.User);
    }); 


    //Computed
    protected _showBackdrop = computed(() => {
        return this._isLogin() 
            && this.isOpenSidenav() 
            && ['mv', 'xs', 'sm', 'md', 'lg'].includes(screenSizeSIGNAL().breakpoint);
    });


    /** */
    public FocusUser(): void { 
        this._login()?.FocusUser();
    }


    /** */
    public FocusPassword(select: boolean = false): void {  
        this._login()?.FocusPassword(select);
    }


    /** */
    public Show(view: 'LOGIN' | 'RECOVERY'): void {  
        this._login()?.Show(view);
    }


    /** */
    public CloseModal() {
        this._toolbar()?.CloseModal();         
    } 
    
    
    /** */
    public SetAccess(response: ILoginResponse | IUser): boolean {  
        const user = response as ILoginResponse;
        this.SetUser(null);
        userSIGNAL.set(null);  

        //Set Response
        if(this.appSettings.security.useJWT) {
            if(Tools.IsNotOnlyWhiteSpace(user?.JWT)) {
                this.SetUser(user.JWT);
                userSIGNAL.set(user);  
            }
        }

        else {
            if(Tools.IsNotOnlyWhiteSpace(user?.User)) {
                this.SetUser(user);
                userSIGNAL.set(user);  
            }
        }  
         
        //Has Access
        if(Access.IsLogin()) {
            if(Tools.HasProperty(user, 'Message')) { 
                this._alert.Information(user.Message, 'Welcome', this.appSettings.appInfo.icon);

                let path = this.appSettings.navigation.redirectTo;
                if(!path.startsWith('/')) path = `/${path}`;    
                this._router.navigateByUrl(path); 
            } 

            return true;
        }

        this._alert.Warning(user.Message, 'No access', 'i91-hand-stop-fill'); 
        this._login()?.FocusPassword();
        return false;
    } 


    //Function   
    public SetUser(User: string | IUser | null): void {  
        const storage = this.appSettings.appInfo.project;

        if(Tools.IsNotNull(User) && !Tools.IsString(User)) {
            const _user = { ...User as any }
            delete _user['message'];
            localStorage.setItem(storage, JSON.stringify({ User: _user }));
        }

        else {
            localStorage.setItem(storage, JSON.stringify({ User }));
        }
    }


    //Function 
    private _WatchJWT(): void {  
        clearInterval(this._watchJWT$);
        const VALIDATE_EVERY: number = 60000;
        const DIFERENCE_TO_UPDATE: number = 30;

        if(Tools.IsBooleanTrue(this.appSettings?.security?.useJWT)) {
            let JWT = Access.GetJWTInfo(); 
    
            if(Tools.IsOnlyWhiteSpace(JWT.claims?.ExpirationDate)) {
                console.warn('ExpirationDate not provided in JWT. Watching JWT is not working');
                return;
            } 
            
            if (JWT.minutes <= 0) {
                Access.LogOut(userSIGNAL); 
                return;
            } 
    
            this.onUpdateJWT.emit();   
    
            this._watchJWT$ = setInterval(() => { 
                JWT = Access.GetJWTInfo(); 
                
                if(Tools.IsNotOnlyWhiteSpace(JWT.claims?.ExpirationDate)) {   
                    if (Dates.GetDiff(JWT.claims.ExpirationDate, Dates.GetCurrentUTCDate(), 'minutes') <= DIFERENCE_TO_UPDATE) {
                        this._WatchJWT();   
                    }
                } 
    
                else {
                    Access.LogOut(userSIGNAL);
                    clearInterval(this._watchJWT$); 
                } 
            }, VALIDATE_EVERY);   
        }

        else { 
            this._watchJWT$ = setInterval(() => {    
                if(Tools.IsOnlyWhiteSpace(Access.GetUser()?.User)) {  
                    Access.LogOut(userSIGNAL);
                    clearInterval(this._watchJWT$);  
                }  
            }, VALIDATE_EVERY);   
        }
    }     
}