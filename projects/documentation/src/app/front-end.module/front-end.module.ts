//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '../../shared/shared.module'; 
 
const routes: Routes = [{
    path: '',
    data: { project: 'MySystem', module: 'System' }, 
    children: [
        {
            path: 'about-library',
            loadChildren: () => import('./about.submodule/about.submodule').then(submodule => submodule.AboutSubmodule)
        },   
        {
            path: 'components',
            loadChildren: () => import('./components.submodule/components.submodule').then(submodule => submodule.ComponentsSubmodule)
        }, 
    ]
}];  

@NgModule({
    declarations: [   
         
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrontEndModule { }