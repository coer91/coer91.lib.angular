import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

//Components  
import { CoerButton } from './coer-button/coer-button.component'; 
import { CoerModal } from './coer-modal/coer-modal.component';
import { CoerPageTitle } from './coer-page-title/coer-page-title.component';
import { CoerTextBox } from './coer-textbox/coer-textbox.component';

@NgModule({
    imports: [
        CommonModule,  
        RouterModule,
    ],
    declarations: [  
        CoerButton,
        CoerModal, 
        CoerPageTitle,
        CoerTextBox,
    ],
    exports: [   
        CoerButton,
        CoerModal, 
        CoerPageTitle,
        CoerTextBox,
    ]
})
export class ComponentsModule { }