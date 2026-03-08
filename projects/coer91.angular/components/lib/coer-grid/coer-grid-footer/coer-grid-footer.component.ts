import { Component, input, WritableSignal } from '@angular/core'; 
import { IFooterSettings } from '../coer-grid-interfaces';
import { Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-grid-footer',
    templateUrl: './coer-grid-footer.component.html', 
    styleUrl: './coer-grid-footer.component.scss', 
    standalone: false
})
export class CoerGridFooter<T> {

    //Variables
    protected readonly IsBooleanFalse = Tools.IsBooleanFalse;
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;

    //Inputs
    public readonly value              = input.required<T[]>();
    public readonly dataSourceSelected = input.required<T[]>();
    public readonly dataSourceFiltered = input.required<T[]>();
    public readonly search             = input.required<string>();
    public readonly IdCalculated       = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public readonly footerSettings     = input.required<IFooterSettings<T>>();
    public readonly isLoadingInner     = input.required<WritableSignal<boolean>>();  
    public readonly isLoading          = input.required<boolean>();  
}