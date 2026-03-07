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
    protected readonly drop = signal<any>(null);

    constructor() { 
        super('coer-grid');

        for(let i = 1; i <= 5; i++) { 
            this.dataSource.update(x => x.concat([{ id: i, name: `item ${i}`, is: true }]));
        }

        this.dataSource.update(x => x.concat([{ id: 999999, name: `dfg` }]));
    }


    path = (item: ICallbackItem<any>) => { 
        return `/home/${item.row.id}`;
    }


    Log(event: string, value: any) {
        console.log({ event, value })
    }


    color = (item: ICallbackItem<any>) => {
        return item.row.id % 2 == 0 ? 'danger' : 'success';
    }
}