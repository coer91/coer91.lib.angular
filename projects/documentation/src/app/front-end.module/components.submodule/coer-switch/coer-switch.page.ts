import { Component } from '@angular/core';   
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-switch-page',
    templateUrl: './coer-switch.page.html', 
    standalone: false
})
export class CoerSwitchPage extends Page {  

    //Variables
    

    constructor() {
        super('coer-switch')
    } 
}