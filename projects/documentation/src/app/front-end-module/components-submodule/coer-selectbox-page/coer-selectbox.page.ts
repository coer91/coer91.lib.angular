import { Component, signal, viewChild } from '@angular/core';    
import { CoerSecretBox, CoerSelectBox } from 'coer91.angular/components';
import { Page, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-selectbox-page',
    templateUrl: './coer-selectbox.page.html', 
    standalone: false
})
export class CoerSelectBoxPage extends Page {  
    
    protected _selectbox = viewChild<CoerSelectBox<any>>('selectbox');
    protected value1 = signal<any>({ id: 4, name: 'option 4' });

    constructor() { 
        super('coer-selectbox') 
    
        Tools.Sleep(3000).then(() => {
             
        });

        // Tools.Sleep(6000).then(() => {
        //     this.value1.set(null);
        // });
    }

    Log(value: any) {
        console.log(value)
    }
}