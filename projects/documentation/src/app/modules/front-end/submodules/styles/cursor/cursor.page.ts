import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'cursor-page',
    templateUrl: './cursor.page.html',  
    standalone: false
})
export class CursorPage extends Page {  

    constructor() { super('cursor') }  
}