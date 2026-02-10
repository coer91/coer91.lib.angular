import { Component, computed } from '@angular/core';  
import { environmentSIGNAL } from 'coer91.angular/signals';
import { Dates, Page, Tools } from 'coer91.angular/tools'; 
declare const appSettings: any;

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html', 
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomePage extends Page {   
  
    protected readonly version = '0.0.0'; 
    protected readonly img = 'coer91/images/coer-system.png';

    constructor() {
        super('home');
        if(Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.version)) this.version = appSettings?.appInfo?.version; 
        if(Tools.IsNotOnlyWhiteSpace(appSettings?.background?.home)) this.img = appSettings?.background?.home;
    } 


    //Computed
    protected _environment = computed(() => {
        return environmentSIGNAL().info === 'PRODUCTION'
            ? `${appSettings?.appInfo?.forCompany} © ${Dates.GetCurrentDate().getFullYear()}` 
            : environmentSIGNAL().info;
    });
}
