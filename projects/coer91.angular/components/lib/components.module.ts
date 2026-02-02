import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

//Components  
import { CoerButton } from './coer-button/coer-button.component'; 

@NgModule({
    imports: [
        CommonModule,  
        RouterModule,
    ],
    declarations: [  
        CoerButton 
    ],
    exports: [   
        CoerButton 
    ]
})
export class ComponentsModule { }