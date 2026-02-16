import { Component, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';  
import { ILogin, ILoginResponse, IMenu, IToolbarMenu, IUser } from 'coer91.angular/interfaces';
import { Access, CoerAlert, Dates, Screen, Tools } from 'coer91.angular/tools';
import { screenSizeSIGNAL, userSIGNAL } from 'coer91.angular/signals';
import { LoginPage } from '../login/login.component';
import { Router } from '@angular/router'; 
declare const appSettings: any;

@Component({
    selector: 'coer91',
    templateUrl: './coer91.component.html', 
    styleUrl: './coer91.component.scss', 
    standalone: false
})
export class Coer91 {   

    //Injection
    protected readonly _alert  = inject(CoerAlert); 
    protected readonly _router = inject(Router); 

    //Elements
    protected readonly _login = viewChild<LoginPage>('login');

    //Variables
    public readonly alert = this._alert;    
    protected readonly isOpenSidenav = signal<boolean>(true);
    protected _watchJWT$!: any; 

    //Inputs  
    public readonly navigation = input.required<IMenu[]>();
    public readonly navigationShowHomeOption = input<boolean>(true);
    public readonly toolbarMenu = input<IToolbarMenu[]>([]);
    public readonly toolbarShowProfileMenu = input<boolean>(true); 
    public readonly toolbarPreventProfileMenu = input<boolean>(false); 
    public readonly toolbarShowPasswordMenu = input<boolean>(true); 
    public readonly toolbarPreventPasswordMenu = input<boolean>(false);  
    public readonly toolbarShowLogOutMenu = input<boolean>(true);  
    public readonly toolbarPreventLogOutMenu = input<boolean>(false);

    //Output
    protected readonly onLogin            = output<ILogin>();
    protected readonly onRecoveryPassword = output<string>(); 
    protected readonly onUpdateJWT        = output<void>();
    protected readonly onClickToolbarMenu = output<IToolbarMenu>();
 
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
            && Tools.IsNotOnlyWhiteSpace(userSIGNAL()?.user);
    }); 


    //Computed
    protected _showBackdrop = computed(() => {
        return this._isLogin() 
            && this.isOpenSidenav() 
            && ['mv', 'xs', 'sm', 'md', 'lg'].includes(screenSizeSIGNAL().breakpoint);
    });
    
    
    /** */
    public Login(response: ILoginResponse | IUser): boolean {  
        const _response = response as ILoginResponse;

        if(Tools.IsBooleanTrue(appSettings.security.useJWT)) {
            if(Tools.IsNotOnlyWhiteSpace(_response?.jwt)) {
                Access.SetUser(_response.jwt);
                userSIGNAL.set(_response); 

                if(Tools.HasProperty(_response, 'message')) { 
                    this._alert.Information(_response.message, 'Welcome', 'i91-logo-coer91');
                    this._router.navigateByUrl('/home'); 
                } 

                return Access.IsLogin();
            }
        }

        else {
            if(Tools.IsNotOnlyWhiteSpace(_response?.user)) {
                Access.SetUser(_response);
                userSIGNAL.set(_response); 

                if(Tools.HasProperty(_response, 'message')) { 
                    this._alert.Information(_response.message, 'Welcome', 'i91-logo-coer91');
                    this._router.navigateByUrl('/home'); 
                }

                return Access.IsLogin();
            }
        }  
         
        Access.SetUser(null);
        userSIGNAL.set(null);
        this._alert.Warning(_response.message, 'No access', 'i91-hand-stop-fill');
        this._login()?.FocusPassword();
        return false;  
    } 


    //Function 
    private _WatchJWT(): void {  
        clearInterval(this._watchJWT$);
        const VALIDATE_EVERY: number = 60000;
        const DIFERENCE_TO_UPDATE: number = 30;

        if(Tools.IsBooleanTrue(appSettings.security.useJWT)) {
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
                if(Tools.IsOnlyWhiteSpace(Access.GetUser()?.user)) {  
                    Access.LogOut(userSIGNAL);
                    clearInterval(this._watchJWT$);  
                }  
            }, VALIDATE_EVERY);   
        }
    }     
}