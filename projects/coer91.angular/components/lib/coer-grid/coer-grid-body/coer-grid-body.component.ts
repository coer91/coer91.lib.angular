import { Tools } from "coer91.angular/tools";
import { IBodySettings, IColumnConfig, IDataSourceGroup } from "../coer-grid-interfaces";
import { Component, input, WritableSignal } from "@angular/core";

@Component({
    selector: 'coer-grid-body',
    templateUrl: './coer-grid-body.component.html',
    styleUrl: './coer-grid-body.component.scss',
    standalone: false
})
export class CoerGridBody<T> {  

    //Variables
    protected IsBooleanFalse = Tools.IsBooleanFalse;

    //Input
    public readonly IdCalculated    = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public readonly ApplyFormat     = input.required<(value: any, type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'time') => string>();
    public readonly columns         = input.required<IColumnConfig<T>[]>();
    public readonly dataSourceGroup = input.required<IDataSourceGroup[]>();
    public readonly bodySettings    = input.required<IBodySettings>();
    public readonly isLoading       = input.required<WritableSignal<boolean>>();
    public readonly isEnabled       = input.required<boolean>();   


    //Function
    protected _showStriped = (index: number): boolean => {
        return !Tools.IsBooleanFalse(this.bodySettings().showStriped) && (index % 2 != 0);
    }
}