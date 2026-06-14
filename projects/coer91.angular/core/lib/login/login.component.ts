import { AfterViewInit, Component, computed, inject, output, signal, viewChild } from '@angular/core';   
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { CoerButton, CoerForm, CoerSecretBox, CoerTextBox } from 'coer91.angular/components';
import { ILogin } from 'coer91.angular/interfaces';
import { environmentSIGNAL, isLoadingSIGNAL } from 'coer91.angular/signals';
import { Tools } from 'coer91.angular/tools';
declare const appSettings: any;

@Component({
    selector: 'login',
    templateUrl: './login.component.html', 
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginPage implements AfterViewInit { 

    //Inject
    protected formBulder = inject(FormBuilder);

    //Elements
    protected readonly _form          = viewChild.required<CoerForm>('form');
    protected readonly _inputUser     = viewChild.required<CoerTextBox>('userRef');
    protected readonly _inputPassword = viewChild.required<CoerSecretBox>('passwordRef');
    protected readonly _loginButton   = viewChild.required<CoerButton>('loginRef');

    //Variables
    protected readonly title      = appSettings?.appInfo?.title || '';
    protected readonly isLoading  = isLoadingSIGNAL; 
    protected readonly background = ''; 
    protected readonly view       = signal<'LOGIN' | 'RECOVERY'>('LOGIN');  

    //form
    protected formGroup: FormGroup = this.formBulder.group({
        user:     ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]], 
    });

    //Outputs 
    protected readonly onLogin = output<ILogin>();
    protected readonly onRecoveryPassword = output<string>();


    constructor() {
        if(Tools.IsNotOnlyWhiteSpace(appSettings?.background?.login)) this.background = appSettings?.background?.login; 
    }


    async ngAfterViewInit() {
        await Tools.Sleep();
        if(this._form().GetControlValue<string>('user', '').length < 6) this.FocusUser();
        else this.FocusPassword(); 
    } 


    //Computed
    protected _icon = computed(() => { 
        switch(environmentSIGNAL().info) {           
            case 'DEVELOPMENT': return 'i91-developer-fill';
            case 'STAGING'    : return 'i91-quality-fill'; 
        }  

        return '';
    });


    //Function
    protected _Toggle(): void {
        if(this.view() === 'LOGIN') this.Show('RECOVERY');
        else this.Show('LOGIN');
    }


    //Function
    protected _Click(): void {
        this.isLoading.set(true);
        const { user, password } = this._form().GetValue<any>(); 

        if(this.view() === 'LOGIN') {
            this.onLogin.emit({ User: user, Password: password });
        }

        else {
            this.onRecoveryPassword.emit(user);
        }
    }


    //Function
    protected _ShowButton = () => {
        return (this.view() === 'LOGIN' && this._form().IsValid())
            || (this.view() === 'RECOVERY' && this._form().IsValidControl('user'))
    }
      


    /** */
    public Show(view: 'LOGIN' | 'RECOVERY') {
        this.view.set(view);  
        
        Tools.Sleep().then(_ => {    
            if(view === 'RECOVERY') {    
                if(this._form().IsValidControl('user')) this._loginButton().Focus();       
                else this.FocusUser(); 
            }
    
            else if (view === 'LOGIN') { 
                if(this._form().IsValidControl('user')) this.FocusPassword(true);       
                else this.FocusUser();
            } 
        });
    }


    /** */
    public FocusUser(): void { 
        Tools.Sleep(200).then(() => this._inputUser().Focus());
    }


    /** */
    public FocusPassword(select: boolean = false): void {  
        Tools.Sleep(200).then(() => this._inputPassword().Focus(select));
    }


    /** */
    public SetUser(user: string): void { 
        this._form().SetControlValue('user', user);
    } 
}