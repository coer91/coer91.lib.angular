import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'border-page',
    templateUrl: './border.page.html', 
    standalone: false
})
export class BorderPage extends Page {  

    constructor() { super('border') }  
}