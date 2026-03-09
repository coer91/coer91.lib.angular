import { Component, signal, viewChild } from '@angular/core';   
import { CoerModal, ICallbackItem, ICellSelectBox } from 'coer91.angular/components';
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

     protected readonly dataSourceSELECTION = signal<any[]>([
        { id: 1, name: 'option 1' },
        { id: 2, name: 'option 2' },
        { id: 3, name: 'option 3' },
        { id: 4, name: 'option 4' },
        { id: 5, name: 'option 5' },
        { id: 6, name: 'option 6' },
        { id: 7, name: 'option 7' },
        { id: 8, name: 'option 8' },
        { id: 9, name: 'option 9' },
     ]);

    constructor() { 
        super('coer-grid');

        // for(let i = 1; i <= 10; i++) { 
        //     this.dataSource.update(x => x.concat([{ 
        //         id: i, 
        //         name: `item ${i}`,  
        //         case: new Date(),
        //         case2: new Date(),
        //         case3: new Date(), 
        //     }]));
        // }

        this.dataSource.set([
            { id: 1, name: 'First',  case: '2026-03-01 00:00:00', case2: '2026-03-01 00:00:00', case3: '2026-03-01 00:00:00' },
            { id: 2, name: 'Second', case: '2026-03-01 12:00:00', case2: '2026-03-01 12:00:00', case3: '2026-03-01 12:00:00' },
            { id: 3, name: 'Third',  case: '2026-03-01 00:00:00', case2: '2026-03-01 00:00:00', case3: '2026-03-01 00:00:00' },
            { id: 4, name: 'Fourth', case: '2026-04-01 00:00:00', case2: '2026-04-01 00:00:00', case3: '2026-04-01 00:00:00' },
            { id: 5, name: 'Fifth',  case: '2026-03-01 00:00:00', case2: '2026-03-01 00:00:00', case3: '2026-03-01 00:00:00' }
        ]);

        //this.dataSource.update(x => x.concat([{ id: 999999, name: `dfg` }]));
    }


    path = (item: ICallbackItem<any>) => { 
        return `/home/${item.row.id}`;
    }


    Log(event: string, value: any) {
        console.log({ event, value })
    }


    color = (item: ICallbackItem<any>) => {
        return item.row.id % 2 == 0 ? 'dark' : null;
    }

    inputTextbox = (item: ICallbackItem<any>) => ({
        showInput: true,
        isValid: item.value.length > 5,
        isInvalid: item.value.length < 5,
        selectOnFocus: true
    })


    inputSelectbox = (item: ICallbackItem<any>): ICellSelectBox<any> => ({
        showInput: true,
        dataSource: this.dataSourceSELECTION(),
        // isValid: false,
         isInvalid: item.value == null,
        // placeholder: '',
        // textPosition: 'center',
        // displayProperty: 'name',
        // useIconProperty: true,
    })
}