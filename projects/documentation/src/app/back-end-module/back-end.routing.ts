//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '@appShared'; 
 
const routes: Routes = [{
    path: '',
    data: { project: 'MySystem', module: 'System' }, 
    children: [
        {
            path: 'about-library',
            loadChildren: () => import('./about-library-submodule/about-library.routing').then(routing => routing.AboutLibraryRouting)
        }
    ]
}];  

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    declarations: [   
         
    ],
    exports: [RouterModule]
})
export class BackEndRouting { }