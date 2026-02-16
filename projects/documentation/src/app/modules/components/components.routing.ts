import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { SharedModule } from "../../shared/shared.module";
import { ROUTER_PAGE } from "coer91.angular/tools";

//Pages 
import { CoerButtonPage } from "./pages/coer-button/coer-button.page";  
import { CoerModalPage  } from "./pages/coer-modal/coer-modal.page";
import { CoerTextboxPage } from "./pages/coer-textbox/coer-textbox.page";

export const routes: Routes = [{
    path: '',
    children: [  
        ROUTER_PAGE('coer-button',  CoerButtonPage),  
        ROUTER_PAGE('coer-modal' ,  CoerModalPage),
        ROUTER_PAGE('coer-textbox', CoerTextboxPage),  
    ]
}];

@NgModule({
    declarations: [ 
        CoerButtonPage, 
        CoerModalPage,
        CoerTextboxPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRouting { }