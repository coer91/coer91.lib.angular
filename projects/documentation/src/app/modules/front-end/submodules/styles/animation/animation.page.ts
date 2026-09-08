import { Component } from '@angular/core';    
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'animation-page',
    templateUrl: './animation.page.html', 
    standalone: false
})
export class AnimationPage extends Page {  

    constructor() { super('animation') }  
}