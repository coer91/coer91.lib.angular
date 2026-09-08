import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'color-page',
    templateUrl: './color.page.html', 
    standalone: false
})
export class ColorPage extends Page {  

    constructor() { super('color') }  
}