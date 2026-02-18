import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

//Components  
import { CoerButton    } from './coer-button/coer-button.component'; 
import { CoerModal     } from './coer-modal/coer-modal.component';
import { CoerPageTitle } from './coer-page-title/coer-page-title.component';
import { CoerSecretBox } from './coer-secretbox/coer-secretbox.component';
import { CoerTextBox   } from './coer-textbox/coer-textbox.component';

@NgModule({
    imports: [
        CommonModule,  
        RouterModule,
    ],
    declarations: [  
        CoerButton,
        CoerModal, 
        CoerPageTitle,
        CoerSecretBox,
        CoerTextBox,
    ],
    exports: [   
        CoerButton,
        CoerModal, 
        CoerPageTitle,
        CoerSecretBox,
        CoerTextBox,
    ]
})
export class ComponentsModule { }