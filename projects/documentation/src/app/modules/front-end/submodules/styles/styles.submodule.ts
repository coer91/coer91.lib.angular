import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { SharedModule } from "@appShared";
import { ROUTER_PAGE } from "coer91.angular/core";

//Pages  
import { AnimationPage } from "./animation/animation.page";
import { BorderPage    } from "./border/border.page";
import { ColorPage     } from "./color/color.page";
import { ContainerPage } from "./container/container.page";
import { CursorPage    } from "./cursor/cursor.page";

export const routes: Routes = [{
    path: '',
    children: [   
        ROUTER_PAGE('animation', AnimationPage),
        ROUTER_PAGE('border'   , BorderPage),
        ROUTER_PAGE('color'    , ColorPage),
        ROUTER_PAGE('container', ContainerPage),
        ROUTER_PAGE('cursor'   , CursorPage),
    ]
}];

@NgModule({
    declarations: [  
        AnimationPage,
        BorderPage,
        ColorPage,
        ContainerPage,
        CursorPage
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StylesSubmodule { }