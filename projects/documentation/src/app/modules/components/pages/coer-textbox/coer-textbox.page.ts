import { Component, inject, signal } from '@angular/core';   
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-textbox-page',
    templateUrl: './coer-textbox.page.html', 
    standalone: false
})
export class CoerTextboxPage extends Page {   

    //
    private formBuilder = inject(FormBuilder);
    
    //Variables
    protected value1 = signal<string>('');
    protected value2 = 'Pre'; 

    public form: FormGroup = this.formBuilder.group({ 
        nombre: ['test', [Validators.required]]
    });


    constructor() { super('coer-textbox') }


    //Start
    protected override async StartPage() {
        this.value1.set('hello world');

        //this.form.get('nombre')?.setValue('updated');

         //this.formGroup().get(formControlName)!.setValue(value);.re

         this.form.reset({
            nombre: 'sfffbddfbdf'
         });

         setTimeout(() =>{
  this.form.reset({
            nombre: 'sfffsssssssssssssssssssbddfbdf'
         });
         }, 3000)
    }


    //Function
    protected Log(event: any, value: any) {
        console.log({ value, event })
    }
}