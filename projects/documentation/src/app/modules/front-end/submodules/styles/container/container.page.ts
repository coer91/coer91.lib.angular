import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'container-page',
    templateUrl: './container.page.html', 
    standalone: false
})
export class ContainerPage extends Page {  

    constructor() { super('container') }  
}