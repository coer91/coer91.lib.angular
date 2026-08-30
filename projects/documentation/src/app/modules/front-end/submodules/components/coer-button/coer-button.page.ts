import { Component, signal } from '@angular/core';   
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-button-page',
    templateUrl: './coer-button.page.html', 
    standalone: false
})
export class CoerButtonPage extends Page {  

    constructor() { super('coer-button') } 

    //Variables
    protected typeList  = signal<any>(['filled', 'outline', 'icon-filled', 'icon-filled-rounded', 'icon-outline', 'icon-outline-rounded', 'icon', 'icon-rounded']);
    protected colorList = signal<any>(['primary', 'secondary', 'success', 'warning', 'danger', 'navigation', 'information', 'dark', 'light']);
}