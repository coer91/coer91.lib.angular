import { AfterViewInit, Component, computed, output, signal, viewChild } from '@angular/core';  
import { CoerButton } from 'coer91.angular/components';
import { isLoadingSIGNAL } from 'coer91.angular/signals';
import { Tools } from 'coer91.angular/tools';
import { ILogin } from 'coer91.angular/interfaces'; 
declare const appSettings: any;

@Component({
    selector: 'login',
    templateUrl: './login.component.html', 
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginPage implements AfterViewInit { 

    //Elements
    // protected readonly _inputUser      = viewChild.required<CoerTextBox>('inputUser');
    // protected readonly _inputPassword  = viewChild.required<CoerTextBox>('inputPassword');
    // protected readonly _inputRecovery  = viewChild.required<CoerTextBox>('inputRecovery');
    // protected readonly _loginButton    = viewChild.required<CoerButton>('loginButton');
    // protected readonly _recoveryButton = viewChild.required<CoerButton>('recoveryButton');

    //Variables
    protected readonly title     = appSettings.appInfo.title;
    protected readonly isLoading = isLoadingSIGNAL; 
    protected readonly view      = signal<'LOGIN' | 'RECOVERY'>('LOGIN');  
    protected readonly user      = signal<string>(''); 
    protected readonly password  = signal<string>('');
    protected readonly clip      = signal<string>('./clip.mp4'); 

    //Outputs 
    protected readonly onLogin = output<ILogin>();
    protected readonly onRecoveryPassword = output<string>();

    async ngAfterViewInit() {
        // await Tools.Sleep(1000);
        // if(this.user().length < 6) this.FocusUser();
        // else this.FocusPassword(); 
    } 



    //Function
    protected _Toggle(): void {
        if(this.view() === 'LOGIN') this.Show('RECOVERY');
        else this.Show('LOGIN');
    }


    //Function
    protected _Click(): void {
        this.isLoading.set(true);

        if(this.view() === 'LOGIN') {
            this.onLogin.emit({
                user: '',
                password: ''
            });
        }

        else {
            this.onRecoveryPassword.emit('');
        }
    }
      


    /** */
    public Show(view: 'LOGIN' | 'RECOVERY') {
        this.view.set(view);  
        
        // Tools.Sleep(250).then(_ => {    
        //     if(view === 'RECOVERY') {    
        //         if(this._enableRecoveryButton()) this._recoveryButton().Focus();       
        //         else this.FocusUser();
        //     }
    
        //     else if (view === 'LOGIN') {
        //         if(this.user().length >= 6) this.FocusPassword();       
        //         else this.FocusUser();
        //     } 
        // });
    }


    /** */
    public FocusUser(): void { 
        // Tools.Sleep(100).then(() => {
        //     if(this.show().equals('LOGIN')) this._inputUser().Focus();
        //     else this._inputRecovery().Focus();
        // });
    }


    /** */
    public FocusPassword(): void {  
        //Tools.Sleep(100).then(() => this._inputPassword().Focus(true));
    }


    /** */
    public SetUser(user: string): void {
        console.log(user)
        this.user.set(user);
    } 
}