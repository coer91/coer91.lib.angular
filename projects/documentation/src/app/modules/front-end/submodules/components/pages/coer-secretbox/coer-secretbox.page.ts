import { Component, signal } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-secretbox-page',
    templateUrl: './coer-secretbox.page.html', 
    standalone: false
})
export class CoerSecretBoxPage extends Page {  
    
    protected value1 = signal<string>('hello');

    constructor() { super('coer-secretbox') }

    Log(value: any) {
        console.log(value)
    }
}