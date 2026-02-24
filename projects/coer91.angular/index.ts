import { NgModule } from '@angular/core';   
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import 'coer91.angular/extensions';  

//Modules    
import * as components from 'coer91.angular/components';
import * as core       from 'coer91.angular/core'; 
import * as directives from 'coer91.angular/directives'; 
import * as pipes      from 'coer91.angular/pipes'; 
import * as tools      from 'coer91.angular/tools';

@NgModule({    
    imports: [  
        CommonModule,
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule, 
        components.ComponentsModule,
        core.CoreModule, 
        directives.DirectivesModule,
        pipes.PipesModule,
        tools.CoerAlert, 
    ], 
    providers: [
        tools.CoerAlert
    ],
    exports: [ 
        CommonModule, 
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,  
        components.CoerButton,
        components.CoerForm,
        components.CoerModal, 
        components.CoerPageTitle, 
        components.CoerSecretBox,
        components.CoerSelectBox,
        components.CoerTextBox,
        core.Coer91Root,
        directives.TemplateRefDirective,  
        pipes.DatePipe,
        pipes.DateTimePipe,
        pipes.CurrencyPipe,
        pipes.HtmlPipe,
        pipes.NoImagePipe,
        pipes.NumericFormatPipe,
        pipes.TimePipe, 
        tools.CoerAlert,
    ]
})
export class coer91Module { }   