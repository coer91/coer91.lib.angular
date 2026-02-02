import { NgModule } from '@angular/core';   
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'coer91.angular/extensions';  

//Modules    
import * as components from 'coer91.angular/components';
import * as core       from 'coer91.angular/core'; 
import * as pipes      from 'coer91.angular/pipes'; 
import * as tools      from 'coer91.angular/tools';
// import * as directives from 'coer91.angular/directives'; 

@NgModule({    
    imports: [  
        CommonModule,
        RouterModule, 
        RouterOutlet,
        // FormsModule,
        // ReactiveFormsModule, 
        components.ComponentsModule,
        core.CoreModule, 
        pipes.PipesModule,
        tools.CoerAlert 
        // directives.DirectivesModule,
    ], 
    providers: [
        tools.CoerAlert
    ],
    exports: [ 
        CommonModule, 
        RouterModule, 
        RouterOutlet,
        // FormsModule,
        // ReactiveFormsModule,  
        components.CoerButton,
        // components.CoerGrid,
        // components.CoerPageTitle,
        // components.CoerSelectBox, 
        // components.CoerSwitch,
        // components.CoerTextBox, 
        // components.CoerAccordion,
        // directives.ElementRefDirective,  
        core.Coer91,
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