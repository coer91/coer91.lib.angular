import { Component } from '@angular/core';   
import { Page, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'install-page',
    templateUrl: './install.page.html', 
    styleUrl: './install.page.scss',  
    standalone: false
})
export class InstallPage extends Page {  

    //Variables
    protected Clipboard = Tools.Clipboard;
 
    constructor() {
        super('Install')
    }  
}