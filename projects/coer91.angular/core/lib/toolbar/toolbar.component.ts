import { environmentSIGNAL, screenSizeSIGNAL, userSIGNAL, userImageSIGNAL, isLoadingSIGNAL } from 'coer91.angular/signals';
import { AfterViewInit, Component, computed, effect, input, output, signal, viewChild } from '@angular/core';  
import { Access, Collections, HTMLElements, Tools } from 'coer91.angular/tools';
import { IToolbarMenu } from 'coer91.angular/interfaces';
import { CoerButton, CoerModal, CoerSecretBox } from 'coer91.angular/components';
declare const appSettings: any;

@Component({
    selector: 'coer-toolbar',
    templateUrl: './toolbar.component.html', 
    styleUrl: './toolbar.component.scss', 
    standalone: false
})
export class Toolbar implements AfterViewInit { 

    //Elements
    protected readonly _profileModal = viewChild<CoerModal>('profileModal');
    protected readonly _passwordModal = viewChild<CoerModal>('passwordModal');
    protected readonly passwordRef = viewChild<CoerSecretBox>('passwordRef');
    protected readonly confirmRef = viewChild<CoerSecretBox>('confirmRef');
    protected readonly buttonRef = viewChild<CoerButton>('buttonRef');

    //Variables 
    protected readonly user = userSIGNAL;  
    protected readonly userImage = userImageSIGNAL;   
    protected readonly _isLoading = isLoadingSIGNAL;    
    protected readonly title = appSettings?.appInfo?.title; 
    protected readonly _isCollapsed = signal<boolean>(true); 
    protected readonly _password = signal<string>(''); 
    protected readonly _confirm = signal<string>(''); 
    protected readonly _role = signal<any>(null); 
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;

    //Inputs
    public readonly menu                = input.required<IToolbarMenu[]>();
    public readonly showUserData        = input.required<boolean>();
    public readonly showProfileMenu     = input.required<boolean>(); 
    public readonly preventProfileMenu  = input.required<boolean>(); 
    public readonly showPasswordMenu    = input.required<boolean>(); 
    public readonly preventPasswordMenu = input.required<boolean>();  
    public readonly showLogOutMenu      = input.required<boolean>();  
    public readonly preventLogOutMenu   = input.required<boolean>();

    //Output 
    protected readonly onClickToogle = output<void>(); 
    protected readonly onClickToolbarMenu = output<IToolbarMenu>();
    protected readonly onUpdatePassword  = output<string>();
    protected readonly onUpdateRole = output<string>();


    constructor() {
        effect(() => {
            const USER = userSIGNAL();
            this._role.set(USER?.role); 
        });
    }


    ngAfterViewInit(): void {
        Tools.Sleep().then(() => {
            HTMLElements.OnMouseLeave('#coer91-toolbar-user')?.subscribe(() => {
                if(!this._isCollapsed()) this._isCollapsed.set(true);
            });
        });
    } 
     
     
    //Computed
    protected _roleList = computed<any[]>(() => {  
        return this.user()?.roles || [];
    });

    
    //Computed
    protected _icon = computed(() => { 
        switch(environmentSIGNAL().info) {           
            case 'DEVELOPMENT': return 'i91-developer-fill';
            case 'STAGING'    : return 'i91-quality-fill'; 
        }  

        return '';
    });


    //Computed
    protected _isInvalidPassword = computed<boolean>(() => {
        return this.passwordRef()!.isTouched() 
            && this._password().length <= 5
    });


    //Computed
    protected _isInvalidConfirm = computed<boolean>(() => {
        return this.confirmRef()!.isTouched()
            && (this._confirm().length <= 5 || this._confirm() != this._password());
    });


    //Computed
    protected _disableUpdatePassword = computed(() => {
        return this._isInvalidPassword() 
            || this._isInvalidConfirm()
            || this._password().length <= 5
            || this._confirm().length <= 5
            || this._confirm() != this._password();
    });


    //Computed
    protected _showIdentity = computed(() => {
        return ['sm', 'md', 'lg', 'xl', 'xxl'].includes(screenSizeSIGNAL().breakpoint)
            && (Tools.IsNotOnlyWhiteSpace(this.user()?.fullName) || Tools.IsNotOnlyWhiteSpace(this.user()?.role));
    });


    //Computed
    protected _menu = computed<any[]>(() => {
        return Collections.SetIndex(
            this.menu()
                .concat(this.showProfileMenu()  ? [{ label: 'Profile'        , preventDefault: this.preventProfileMenu() , icon: 'i91-user-fill'      }] : [])
                .concat(this.showPasswordMenu() ? [{ label: 'Change Password', preventDefault: this.preventPasswordMenu(), icon: 'i91-lock-fill'      }] : [])
                .concat(this.showLogOutMenu()   ? [{ label: 'Log Out'        , preventDefault: this.preventLogOutMenu()  , icon: 'i91-door-open-fill' }] : [])
        )
    }); 


    //Function
    protected _SelectMenu(menu: IToolbarMenu) {
        if(menu) {
            if(!Tools.IsBooleanTrue(menu.preventDefault)) {
                switch(menu.label) {
                    case 'Profile': {
                        this._profileModal()?.Open();
                        break;
                    }
    
                    case 'Change Password': {
                        this._passwordModal()?.Open();
                        break;
                    }
    
                    case 'Log Out': {
                        Access.LogOut(userSIGNAL); 
                        break;
                    }
                }                        
            }
            
            this.onClickToolbarMenu.emit(menu);
        }
    }


    //Function
    protected _UpdateRole(role: string) { 
        if(Tools.IsNotOnlyWhiteSpace(role) && Tools.IsNotNull(this.user())) { 
            if(this.user()?.role != role) this.onUpdateRole.emit(role);
        }       
    }


    //Function
    protected _ResetPassword() {     
        this._password.set('');
        this._confirm.set('');        
        this.passwordRef()?.SetTouched(false);
        this.confirmRef()?.SetTouched(false);
    } 


    /** */
    public CloseModal() {
        this._profileModal()?.Close();  
        this._passwordModal()?.Close();          
    } 
}