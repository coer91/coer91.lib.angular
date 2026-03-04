import { Component, signal, viewChild } from '@angular/core';   
import { CoerModal, ICallbackItem } from 'coer91.angular/components';
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-grid-page',
    templateUrl: './coer-grid.page.html', 
    standalone: false
})
export class CoerGridPage extends Page {  

    protected readonly grid = viewChild<CoerModal>('grid');

    //Variables 
    protected readonly dataSource = signal<any[]>([]);

    constructor() { 
        super('coer-grid');

        for(let i = 1; i <= 5; i++) { 
            this.dataSource.update(x => x.concat([{ id: i, name: `item ${i}` }]));
        }
    }


    path = (item: ICallbackItem<any>) => { 
        return `/home/${item.row.id}`;
    }
}