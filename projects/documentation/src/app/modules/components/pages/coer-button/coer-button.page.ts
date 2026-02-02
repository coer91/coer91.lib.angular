import { Component, signal } from '@angular/core';   

@Component({
    selector: 'coer-button-page',
    templateUrl: './coer-button.page.html', 
    standalone: false
})
export class CoerButtonPage {  

    //Variables
    protected typeList  = signal<any>(['filled', 'outline', 'icon-filled', 'icon-filled-rounded', 'icon-outline', 'icon-outline-rounded', 'icon', 'icon-rounded']);
    protected colorList = signal<any>(['primary', 'secondary', 'success', 'warning', 'danger', 'navigation', 'information', 'dark', 'light']);

    //Function
    protected Log(type: string, color: string) {
        console.log(`Click on: [${type}][${color}]`);
    }
}