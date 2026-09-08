//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'coer91.angular/core';
import { SharedModule } from '@appShared';

//Pages
import { InstallPage } from './pages/install/install.page';
 
const routes: Routes = [{
    path: '',
    data: { project: 'MySystem', module: 'System' }, 
    children: [
        ROUTER_PAGE('install' , InstallPage),   
        {
            path: 'components',
            loadChildren: () => import('./submodules/components/components.submodule').then(submodule => submodule.ComponentsSubmodule)
        },
        {
            path: 'styles',
            loadChildren: () => import('./submodules/styles/styles.submodule').then(submodule => submodule.StylesSubmodule)
        }, 
    ]
}];  

@NgModule({
    declarations: [   
        InstallPage
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrontEndModule { }