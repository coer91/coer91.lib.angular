//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '../../shared/shared.module'; 
 
const routes: Routes = [{
    path: '', 
    children: [
    ]
}];  

@NgModule({
    declarations: [   
         
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackEndModule { }