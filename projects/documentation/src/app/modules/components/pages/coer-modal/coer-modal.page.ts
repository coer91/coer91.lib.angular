import { Component, viewChild } from '@angular/core';   
import { CoerModal } from 'coer91.angular/components';
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-modal-page',
    templateUrl: './coer-modal.page.html', 
    standalone: false
})
export class CoerModalPage extends Page {  

    protected readonly modal = viewChild<CoerModal>('modal');

    //Variables 

    constructor() { 
        super('coer-modal')
    }
}