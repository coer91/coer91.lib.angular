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
            loadChildren: () => import('./about-library-submodule/about-library.routing').then(routing => routing.AboutLibraryRouting)
        },   
        {
            path: 'components',
            loadChildren: () => import('./components-submodule/components.routing').then(routing => routing.ComponentsRouting)
        }, 
    ]
}];  

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    declarations: [   
         
    ],
    exports: [RouterModule]
})
export class FrontEndRouting { }