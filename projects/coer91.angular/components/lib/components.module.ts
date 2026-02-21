import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'coer91.angular/directives';

//Components  
import { CoerButton    } from './coer-button/coer-button.component'; 
import { CoerForm      } from './coer-form/coer-form.component';
import { CoerModal     } from './coer-modal/coer-modal.component';
import { CoerPageTitle } from './coer-page-title/coer-page-title.component';
import { CoerSecretBox } from './coer-secretbox/coer-secretbox.component'; 
import { CoerSelectBox } from './coer-selectbox/coer-selectbox.component';
import { CoerTextBox   } from './coer-textbox/coer-textbox.component';

@NgModule({
    imports: [
        CommonModule,  
        RouterModule,
        ReactiveFormsModule,
        DirectivesModule,
    ],
    declarations: [  
        CoerButton,
        CoerForm,
        CoerModal, 
        CoerPageTitle,
        CoerSecretBox,
        CoerSelectBox,
        CoerTextBox,
    ],
    exports: [   
        CoerButton,
        CoerForm,
        CoerModal, 
        CoerPageTitle,
        CoerSecretBox,
        CoerSelectBox,
        CoerTextBox,
    ]
})
export class ComponentsModule { }