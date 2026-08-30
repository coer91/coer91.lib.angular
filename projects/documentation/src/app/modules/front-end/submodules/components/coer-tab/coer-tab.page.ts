import { Component, signal } from '@angular/core';   
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-tab-page',
    templateUrl: './coer-tab.page.html', 
    standalone: false
})
export class CoerTabPage extends Page {  

    constructor() { super('coer-tab') }

    protected readonly dataSource = signal<any[]>([]);

    protected override StartPage(): void {
        for(let i = 1; i <= 100; i++) { 
            this.dataSource.update(x => x.concat([{ 
                id: i, 
                name: `item ${i}`,  
                option: null
            }]));
        }
    }

}