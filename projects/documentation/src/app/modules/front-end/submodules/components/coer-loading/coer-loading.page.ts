import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-loading-page',
    templateUrl: './coer-loading.page.html', 
    standalone: false
})
export class CoerLoadingPage extends Page {  

    constructor() { super('coer-loading') }  
}