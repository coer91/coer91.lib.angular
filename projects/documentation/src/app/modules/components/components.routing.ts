import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { SharedModule } from "../../shared/shared.module";
import { ROUTER_PAGE } from "coer91.angular/tools";

//Pages 
import { CoerButtonPage } from "./pages/coer-button/coer-button.page";  

export const routes: Routes = [{
    path: '',
    children: [  
        ROUTER_PAGE('coer-button', CoerButtonPage),  
    ]
}];

@NgModule({
    declarations: [ 
        CoerButtonPage, 
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRouting { }