import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-textarea-page',
    templateUrl: './coer-textarea.page.html', 
    standalone: false
})
export class CoerTextAreaPage extends Page {  

    constructor() { super('coer-textarea') }  
}