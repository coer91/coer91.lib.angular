import { Component, input } from '@angular/core'; 

@Component({
    selector: 'coer-loading',
    templateUrl: './coer-loading.component.html', 
    styleUrl: './coer-loading.component.scss', 
    standalone: false
})
export class CoerLoading  {    
    
    //Inputs
    public isLoading = input<boolean>(false);
    public position  = input<'absolute' | 'sticky'>('absolute'); 
}