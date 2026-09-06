import { Component, signal } from '@angular/core';   
import { IDocInput } from '@appShared/interfaces';
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-accordion-page',
    templateUrl: './coer-accordion.page.html', 
    standalone: false
})
export class CoerAccordionPage extends Page {  

    constructor() { super('coer-accordion') } 

    
    protected inputs = signal<IDocInput[]>([]);


    protected override StartPage(): void {
        this.inputs.set([
            { Name: 'icon' , Description: '' },
            { Name: 'type' , Description: '' },
            { Name: 'bodyColor', Description: '' },
            { Name: 'scrollOnOpen', Description: '' },
            { Name: 'minWidth', Description: '' },
            { Name: 'maxWidth', Description: '' },
            { Name: 'minHeight', Description: '' },
            { Name: 'maxHeight', Description: '' },
            { Name: 'padding', Description: '' },

        ]);
    }
}