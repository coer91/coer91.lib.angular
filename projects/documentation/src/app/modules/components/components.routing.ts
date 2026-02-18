import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { SharedModule } from "../../shared/shared.module";
import { ROUTER_PAGE } from "coer91.angular/tools";

//Pages 
import { CoerButtonPage } from "./pages/coer-button/coer-button.page";  
import { CoerModalPage  } from "./pages/coer-modal/coer-modal.page";
import { CoerSecretBoxPage } from "./pages/coer-secretbox/coer-secretbox.page";
import { CoerTextBoxPage } from "./pages/coer-textbox/coer-textbox.page";

export const routes: Routes = [{
    path: '',
    children: [  
        ROUTER_PAGE('coer-button',    CoerButtonPage),  
        ROUTER_PAGE('coer-modal' ,    CoerModalPage),
        ROUTER_PAGE('coer-secretbox', CoerSecretBoxPage),  
        ROUTER_PAGE('coer-textbox',   CoerTextBoxPage), 
    ]
}];

@NgModule({
    declarations: [ 
        CoerButtonPage, 
        CoerModalPage,
        CoerSecretBoxPage,
        CoerTextBoxPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRouting { }