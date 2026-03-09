import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { ROUTER_PAGE } from "coer91.angular/tools";
import { SharedModule } from "../../../shared/shared.module";

//Pages 
import { CoerButtonPage    } from "./coer-button/coer-button.page";  
import { CoerDateBoxPage  } from "./coer-datebox/coer-datebox.page";
import { CoerGridPage      } from "./coer-grid/coer-grid.page";
import { CoerModalPage     } from "./coer-modal/coer-modal.page";
import { CoerNumberBoxPage } from "./coer-numberbox/coer-numberbox.page";
import { CoerSecretBoxPage } from "./coer-secretbox/coer-secretbox.page";
import { CoerSelectBoxPage } from "./coer-selectbox/coer-selectbox.page"; 
import { CoerSwitchPage    } from "./coer-switch/coer-switch.page";
import { CoerTextBoxPage   } from "./coer-textbox/coer-textbox.page";

export const routes: Routes = [{
    path: '',
    children: [  
        ROUTER_PAGE('coer-button'   , CoerButtonPage),  
        ROUTER_PAGE('coer-datebox'  , CoerDateBoxPage),  
        ROUTER_PAGE('coer-grid'     , CoerGridPage),  
        ROUTER_PAGE('coer-modal'    , CoerModalPage),
        ROUTER_PAGE('coer-numberbox', CoerNumberBoxPage),
        ROUTER_PAGE('coer-secretbox', CoerSecretBoxPage),  
        ROUTER_PAGE('coer-selectbox', CoerSelectBoxPage),  
        ROUTER_PAGE('coer-switch'   , CoerSwitchPage),  
        ROUTER_PAGE('coer-textbox'  , CoerTextBoxPage), 
    ]
}];

@NgModule({
    declarations: [ 
        CoerButtonPage, 
        CoerDateBoxPage,
        CoerGridPage,
        CoerModalPage,
        CoerNumberBoxPage,
        CoerSecretBoxPage,
        CoerSelectBoxPage,
        CoerSwitchPage,
        CoerTextBoxPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsSubmodule { }