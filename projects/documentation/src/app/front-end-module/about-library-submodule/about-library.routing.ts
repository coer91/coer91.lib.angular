import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { ROUTER_PAGE } from "coer91.angular/tools";
import { SharedModule } from "../../../shared/shared.module";

//Pages  
import { InstallPage } from "./install-page/install.page";

export const routes: Routes = [{
    path: '',
    children: [  
        ROUTER_PAGE('install', InstallPage),
    ]
}];

@NgModule({
    declarations: [ 
        InstallPage, 
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AboutLibraryRouting { }