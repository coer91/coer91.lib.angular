import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'coer91.angular/directives';
import { PipesModule } from 'coer91.angular/pipes';

//Components  
import { CoerButton     } from './coer-button/coer-button.component'; 
import { CoerDateBox    } from './coer-datebox/coer-datebox.component';
import { CoerForm       } from './coer-form/coer-form.component';
import { CoerGridBody   } from './coer-grid/coer-grid-body/coer-grid-body.component';
import { CoerGridCell   } from './coer-grid/coer-grid-cell/coer-grid-cell.component';
import { CoerGridFooter } from './coer-grid/coer-grid-footer/coer-grid-footer.component';
import { CoerGridHeader } from './coer-grid/coer-grid-header/coer-grid-header.component';
import { CoerGrid       } from './coer-grid/coer-grid.component';
import { CoerNumberBox  } from './coer-numberbox/coer-numberbox.component';
import { CoerModal      } from './coer-modal/coer-modal.component';
import { CoerPageTitle  } from './coer-page-title/coer-page-title.component';
import { CoerSecretBox  } from './coer-secretbox/coer-secretbox.component'; 
import { CoerSelectBox  } from './coer-selectbox/coer-selectbox.component'; 
import { CoerSwitch     } from './coer-switch/coer-switch.component';
import { CoerTab        } from './coer-tab/coer-tab.component';
import { CoerTextBox    } from './coer-textbox/coer-textbox.component';

@NgModule({
    imports: [
        CommonModule,  
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        PipesModule
    ],
    declarations: [  
        CoerButton,
        CoerDateBox,
        CoerForm,
        CoerGrid,
        CoerGridBody,
        CoerGridCell,
        CoerGridFooter,
        CoerGridHeader,
        CoerModal, 
        CoerNumberBox,
        CoerPageTitle,
        CoerSecretBox,
        CoerSelectBox, 
        CoerSwitch,
        CoerTab,
        CoerTextBox,
    ],
    exports: [   
        CoerButton,
        CoerDateBox,
        CoerForm,
        CoerGrid,
        CoerModal, 
        CoerNumberBox,
        CoerPageTitle,
        CoerSecretBox,
        CoerSelectBox,
        CoerSwitch,
        CoerTab,
        CoerTextBox,
    ]
})
export class ComponentsModule { }