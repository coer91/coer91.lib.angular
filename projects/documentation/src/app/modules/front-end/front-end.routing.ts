//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { ROUTER_PAGE } from 'coer91.angular/tools';
import { SharedModule } from '@appShared';

//Pages
import { InstallPage } from './pages/install/install.page';
 
const routes: Routes = [{
    path: '',
    data: { project: 'MySystem', module: 'System' }, 
    children: [ 
        ROUTER_PAGE('install', InstallPage),
        {
            path: 'components',
            loadChildren: () => import('./submodules/components/components.routing').then(module => module.ComponentsRouting)
        }, 
    ]
}];  

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    declarations: [   
        InstallPage
    ],
    exports: [RouterModule]
})
export class FrontEndRouting { }