import { Component } from '@angular/core';   
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-textbox-page',
    templateUrl: './coer-textbox.page.html', 
    standalone: false
})
export class CoerTextboxPage extends Page {   
    
    //Variables
    protected value1 = 'hello';

    constructor() {
        super('coer-textbox'); 
    }

    //Function
    protected Log(event: any, value: any) {
        console.log({ value, event })
    }
}