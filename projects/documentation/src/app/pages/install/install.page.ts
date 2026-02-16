import { Component } from '@angular/core';   
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'install-page',
    templateUrl: './install.page.html',  
    standalone: false
})
export class InstallPage extends Page {  

    //Variables
 
    constructor() {
        super('Install')
    } 
}