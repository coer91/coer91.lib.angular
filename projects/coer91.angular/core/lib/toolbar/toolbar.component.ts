import { environmentSIGNAL, screenSizeSIGNAL, userSIGNAL, userImageSIGNAL } from 'coer91.angular/signals';
import { AfterViewInit, Component, computed, input, output, signal, viewChild } from '@angular/core';  
import { Access, Collections, HTMLElements, Tools } from 'coer91.angular/tools';
import { IToolbarMenu } from 'coer91.angular/interfaces';
import { CoerModal } from 'coer91.angular/components';
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

    //Variables 
    protected readonly user = userSIGNAL;  
    protected readonly userImage = userImageSIGNAL;    
    protected readonly title = appSettings?.appInfo?.title; 
    protected readonly _isCollapsed = signal<boolean>(true); 

    //Inputs
    public readonly menu                = input.required<IToolbarMenu[]>();
    public readonly showProfileMenu     = input.required<boolean>(); 
    public readonly preventProfileMenu  = input.required<boolean>(); 
    public readonly showPasswordMenu    = input.required<boolean>(); 
    public readonly preventPasswordMenu = input.required<boolean>();  
    public readonly showLogOutMenu      = input.required<boolean>();  
    public readonly preventLogOutMenu   = input.required<boolean>();

    //Output 
    protected readonly onClickToogle = output<void>(); 
    protected readonly onClickToolbarMenu = output<IToolbarMenu>();


    ngAfterViewInit(): void {
        Tools.Sleep().then(() => {
            HTMLElements.OnMouseLeave('#coer91-toolbar-user')?.subscribe(() => {
                if(!this._isCollapsed()) this._isCollapsed.set(true);
            });
        });
    } 
    
    
    //Computed
    protected _icon = computed(() => { 
        switch(environmentSIGNAL().info) {           
            case 'DEVELOPMENT': return 'i91-developer-fill';
            case 'STAGING'    : return 'i91-quality-fill'; 
        }  

        return '';
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
                        userSIGNAL.set(null);
                        break;
                    }
                }                        
            }
            
            this.onClickToolbarMenu.emit(menu);
        }
    }
}