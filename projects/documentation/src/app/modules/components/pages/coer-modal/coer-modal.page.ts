import { Component, viewChild } from '@angular/core';   
import { CoerModal } from 'coer91.angular/components';
import { Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-modal-page',
    templateUrl: './coer-modal.page.html', 
    standalone: false
})
export class CoerModalPage {  

    protected readonly modal = viewChild<CoerModal>('modal');

    constructor() { 
    }
}