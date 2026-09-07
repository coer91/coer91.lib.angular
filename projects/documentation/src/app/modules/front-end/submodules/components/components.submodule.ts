import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { SharedModule } from "@appShared";
import { ROUTER_PAGE } from "coer91.angular/core";

//Pages 
import { CoerAccordionPage } from "./coer-accordion/coer-accordion.page";
import { CoerButtonPage    } from "./coer-button/coer-button.page";  
import { CoerDateBoxPage   } from "./coer-datebox/coer-datebox.page";
import { CoerFormPage      } from "./coer-form/coer-form.page";
import { CoerGridPage      } from "./coer-grid/coer-grid.page";
import { CoerLoadingPage   } from "./coer-loading/coer-loading.page";
import { CoerModalPage     } from "./coer-modal/coer-modal.page";
import { CoerNumberBoxPage } from "./coer-numberbox/coer-numberbox.page";
import { CoerPageTitlePage } from "./coer-page-title/coer-page-title.page";
import { CoerRadioPage     } from "./coer-radio/coer-radio.page";
import { CoerSecretBoxPage } from "./coer-secretbox/coer-secretbox.page";
import { CoerSelectBoxPage } from "./coer-selectbox/coer-selectbox.page"; 
import { CoerSwitchPage    } from "./coer-switch/coer-switch.page";
import { CoerTabPage       } from "./coer-tab/coer-tab.page";
import { CoerTextAreaPage  } from "./coer-textarea/coer-textarea.page";
import { CoerTextBoxPage   } from "./coer-textbox/coer-textbox.page";

export const routes: Routes = [{
    path: '',
    children: [  
        ROUTER_PAGE('coer-accordion' , CoerAccordionPage),
        ROUTER_PAGE('coer-button'    , CoerButtonPage),  
        ROUTER_PAGE('coer-datebox'   , CoerDateBoxPage),  
        ROUTER_PAGE('coer-form'      , CoerFormPage),  
        ROUTER_PAGE('coer-grid'      , CoerGridPage),        
        ROUTER_PAGE('coer-loading'   , CoerLoadingPage),         
        ROUTER_PAGE('coer-modal'     , CoerModalPage),
        ROUTER_PAGE('coer-numberbox' , CoerNumberBoxPage),
        ROUTER_PAGE('coer-page-title', CoerPageTitlePage), 
        ROUTER_PAGE('coer-radio'     , CoerRadioPage),         
        ROUTER_PAGE('coer-secretbox' , CoerSecretBoxPage),  
        ROUTER_PAGE('coer-selectbox' , CoerSelectBoxPage),  
        ROUTER_PAGE('coer-switch'    , CoerSwitchPage), 
        ROUTER_PAGE('coer-tab'       , CoerTabPage),  
        ROUTER_PAGE('coer-textarea'  , CoerTextAreaPage),  
        ROUTER_PAGE('coer-textbox'   , CoerTextBoxPage), 
    ]
}];

@NgModule({
    declarations: [ 
        CoerAccordionPage,
        CoerButtonPage, 
        CoerDateBoxPage,
        CoerFormPage,
        CoerGridPage,
        CoerLoadingPage,
        CoerModalPage,
        CoerNumberBoxPage,
        CoerPageTitlePage,
        CoerRadioPage,
        CoerSecretBoxPage,
        CoerSelectBoxPage,
        CoerSwitchPage,
        CoerTabPage,
        CoerTextAreaPage,
        CoerTextBoxPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsSubmodule { }