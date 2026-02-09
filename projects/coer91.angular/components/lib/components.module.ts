import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

//Components  
import { CoerButton } from './coer-button/coer-button.component'; 
import { CoerModal } from './coer-modal/coer-modal.component';

@NgModule({
    imports: [
        CommonModule,  
        RouterModule,
    ],
    declarations: [  
        CoerButton,
        CoerModal, 
    ],
    exports: [   
        CoerButton,
        CoerModal, 
    ]
})
export class ComponentsModule { }