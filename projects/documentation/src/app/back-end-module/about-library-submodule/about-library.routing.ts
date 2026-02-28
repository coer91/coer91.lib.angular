import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { ROUTER_PAGE } from "coer91.angular/tools";
import { SharedModule } from "@appShared";

//Pages   

export const routes: Routes = [{
    path: '',
    children: [   
    ]
}];

@NgModule({
    declarations: [  
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AboutLibraryRouting { }