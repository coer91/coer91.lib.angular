import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-page-title-page',
    templateUrl: './coer-page-title.page.html', 
    standalone: false
})
export class CoerPageTitlePage extends Page {  

    constructor() { super('coer-page-title') }  
}