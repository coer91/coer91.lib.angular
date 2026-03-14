import { Component, signal } from '@angular/core';   
import { HTTP, Page, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-button-page',
    templateUrl: './coer-button.page.html', 
    standalone: false
})
export class CoerButtonPage extends Page {  

    //Variables
    protected typeList  = signal<any>(['filled', 'outline', 'icon-filled', 'icon-filled-rounded', 'icon-outline', 'icon-outline-rounded', 'icon', 'icon-rounded']);
    protected colorList = signal<any>(['primary', 'secondary', 'success', 'warning', 'danger', 'navigation', 'information', 'dark', 'light']);

    constructor() {
        super('coer-button')
    } 


    protected override StartPage(): void {   

        HTTP.DELETE<void>({
            url: `https://localhost:5001/api/ProjectsModules/DeleteModule/${5}` 
        }); 
    }
}