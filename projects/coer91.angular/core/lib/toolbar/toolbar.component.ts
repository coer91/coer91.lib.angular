import { Component, computed, output } from '@angular/core';  
import { environmentSIGNAL, screenSizeSIGNAL, userSIGNAL, userImageSIGNAL } from 'coer91.angular/signals';
import { Tools } from 'coer91.angular/tools';
declare const appSettings: any;

@Component({
    selector: 'coer-toolbar',
    templateUrl: './toolbar.component.html', 
    styleUrl: './toolbar.component.scss', 
    standalone: false
})
export class Toolbar {   

    //Elements 

    //Variables 
    protected readonly user = userSIGNAL;  
    protected readonly userImage = userImageSIGNAL;    
    protected readonly title = appSettings?.appInfo?.title;

    //Inputs  

    //Output 
    protected readonly onClickToogle = output<void>();
 
    constructor() {     
         
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
}