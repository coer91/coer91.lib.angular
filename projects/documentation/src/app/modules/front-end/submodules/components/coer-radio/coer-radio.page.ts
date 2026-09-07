import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-radio-page',
    templateUrl: './coer-radio.page.html', 
    standalone: false
})
export class CoerRadioPage extends Page {  

    constructor() { super('coer-radio') }  
}