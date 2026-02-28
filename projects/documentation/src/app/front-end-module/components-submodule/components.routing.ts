import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { ROUTER_PAGE } from "coer91.angular/tools";
import { SharedModule } from "../../../shared/shared.module";

//Pages 
import { CoerButtonPage } from "./coer-button-page/coer-button.page";  
import { CoerModalPage  } from "./coer-modal-page/coer-modal.page";
import { CoerSecretBoxPage } from "./coer-secretbox-page/coer-secretbox.page";
import { CoerSelectBoxPage } from "./coer-selectbox-page/coer-selectbox.page"; 
import { CoerTextBoxPage } from "./coer-textbox-page/coer-textbox.page";

export const routes: Routes = [{
    path: '',
    children: [  
        ROUTER_PAGE('coer-button',    CoerButtonPage),  
        ROUTER_PAGE('coer-modal' ,    CoerModalPage),
        ROUTER_PAGE('coer-secretbox', CoerSecretBoxPage),  
        ROUTER_PAGE('coer-selectbox', CoerSelectBoxPage),  
        ROUTER_PAGE('coer-textbox',   CoerTextBoxPage), 
    ]
}];

@NgModule({
    declarations: [ 
        CoerButtonPage, 
        CoerModalPage,
        CoerSecretBoxPage,
        CoerSelectBoxPage,
        CoerTextBoxPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRouting { }