//Modules
import { NgModule } from '@angular/core';   
import { SharedModule } from './shared/shared.module';

//Pages
import { InstallPage } from './pages/install/install.page';

@NgModule({ 
    declarations: [
        InstallPage
    ],
    imports: [SharedModule],
    exports: [SharedModule]
})
export class AppModule { }