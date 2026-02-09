import { NgModule } from '@angular/core'; 

//Directives
import { TemplateRefDirective } from './template-ref.directive'; 

@NgModule({
    declarations: [
        TemplateRefDirective, 
    ],
    exports: [
        TemplateRefDirective, 
    ]
})
export class DirectivesModule { }