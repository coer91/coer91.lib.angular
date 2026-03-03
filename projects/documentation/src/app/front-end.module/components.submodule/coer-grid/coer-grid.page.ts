import { Component, signal, viewChild } from '@angular/core';   
import { CoerModal } from 'coer91.angular/components';
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.page.html', 
    standalone: false
})
export class CoerGridPage extends Page {  

    protected readonly grid = viewChild<CoerModal>('grid');

    //Variables 
    protected readonly dataSource = signal<any[]>([
        { id: 1, name: 'One'   },
        { id: 2, name: 'Two'   },
        { id: 3, name: 'Three' }
    ]);

    constructor() { 
        super('coer-grid')
    }
}