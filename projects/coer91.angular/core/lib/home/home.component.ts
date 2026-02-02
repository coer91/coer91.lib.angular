import { Component, computed } from '@angular/core';  
import { environmentSIGNAL } from 'coer91.angular/signals';
import { Dates, Tools } from 'coer91.angular/tools'; 
declare const appSettings: any;

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html', 
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomePage {   
  
    protected readonly img = 'coer91/images/coer91.png';
    protected readonly version = '0.0.0'; 

    constructor() {
        if(Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.imageURL)) this.img = appSettings?.appInfo?.imageURL;
        if(Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.version)) this.version = appSettings?.appInfo?.version;
    } 


    //Computed
    protected _environment = computed(() => {
        return environmentSIGNAL().info === 'PRODUCTION'
            ? `${appSettings?.appInfo?.byCompany} © ${Dates.GetCurrentDate().getFullYear()}` 
            : environmentSIGNAL().info;
    });
}
