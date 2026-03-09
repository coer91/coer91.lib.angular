import { Component } from '@angular/core';
import { CONTROL_VALUE } from 'coer91.angular/tools';
import { CoerTextBox } from '../coer-textbox/coer-textbox.component';

@Component({
    selector: 'coer-datebox',
    templateUrl: '../coer-textbox/coer-textbox.component.html', 
    styleUrl: '../coer-textbox/coer-textbox.component.scss', 
    providers: [CONTROL_VALUE(CoerDateBox)],
    standalone: false
})
export class CoerDateBox extends CoerTextBox {   

    
}