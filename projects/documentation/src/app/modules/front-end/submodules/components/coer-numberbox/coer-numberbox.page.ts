import { Component } from '@angular/core';     
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-numberbox-page',
    templateUrl: './coer-numberbox.page.html', 
    standalone: false
})
export class CoerNumberBoxPage extends Page {   

    constructor() { 
        super('coer-numberbox')  
    } 
}