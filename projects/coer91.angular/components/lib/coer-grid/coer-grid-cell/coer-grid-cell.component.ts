import { Component, computed, input, output, WritableSignal } from "@angular/core";
import { IBodySettings, IColumnConfig } from "../coer-grid-interfaces";
import { Tools } from "coer91.angular/tools";

@Component({
    selector: 'coer-grid-cell',
    templateUrl: './coer-grid-cell.component.html',
    styleUrl: './coer-grid-cell.component.scss',
    standalone: false
})
export class CoerGridCell<T> {  

    //Inputs 
    public readonly id           = input.required<string>();
    public readonly ApplyFormat  = input.required<(value: any, type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'time') => string>();
    public readonly column       = input.required<IColumnConfig<T>>();
    public readonly row          = input.required<any>();
    public readonly bodySettings = input.required<IBodySettings>();
    public readonly isLoading    = input.required<WritableSignal<boolean>>();
    public readonly isEnabled    = input.required<boolean>();

    //Outputs  
    protected readonly onClickRow        = output<T>();
    protected readonly onDoubleClickRow  = output<T>(); 

    /** */
    public _input = computed<'HTML' | 'coerTextbox' | 'coerNumberbox' | 'coerSelectbox' | 'coerDatebox' | 'coerSwitch'>(() => {
        const COLUMN = this.column().config;
        // if(this.isEnabled() && Tools.IsNull(COLUMN?.template)) {
        //     if(this._ShowInput(COLUMN?.coerSwitch)) {
        //         return 'coerSwitch';
        //     }

        //     else if(this._ShowInput(COLUMN?.coerTextbox)) {
        //         return 'coerTextbox';
        //     }

        //     else if(this._ShowInput(COLUMN?.coerNumberbox)) {
        //         return 'coerNumberbox';
        //     }

        //     else if(this._ShowInput(COLUMN?.coerSelectbox)) {
        //         return 'coerSelectbox';
        //     }

        //     // else if(this._dateboxAttributes()?.showInput) {
        //     //     return 'coer-datebox';
        //     // }
        // }

        return 'HTML';
    });


    /** */
    protected _GetCellValue = computed<string>(() => {  
        let value = (this.row() as any)[this.column().config.property] || ''; 
        
        //Template
        // if(Tools.IsNotNull(this.column().config?.template)) {  
        //     if(Tools.IsFunction(this.column()?.config?.template)) {
        //         return (this.column()?.config as any)?.template({
        //             indexRow: this.row().indexRow,
        //             property: this.column()?.config?.property,
        //             row: { ...this.row() },
        //             value
        //         });
        //     }

        //     else if(Tools.IsNotOnlyWhiteSpace(this.column()?.config?.template)) {
        //         return this.column()?.config?.template as string;
        //     }
        // }

        return this.ApplyFormat()(value, this.column().config.type!); 
    }); 


    //Function
    protected _minHeight = computed<string>(() => {
        const BORDERS = !Tools.IsBooleanFalse(this.bodySettings().showBorders) ? '0.800px' : '0px';
        return `calc(${this.column().config.height!} - ${BORDERS})`
    });


    //Function
    protected _GetTextAlignX = computed<'flex-start' | 'center' | 'flex-end'>(() => {
        switch(this.column().config.textAlignX!) {
            case 'left'  : return 'flex-start';
            case 'center': return 'center';
            case 'right' : return 'flex-end'; 
        }
    }); 


    //Function
    protected _GetTextBreak = computed<'break-word' | 'keep-all'>(() => {
        return this.column().config.textBreak!
            ? 'break-word' : 'keep-all';
    });


    //Function
    protected _GetSpaceBreak = computed<'nowrap' | 'normal'>(() => {
        return this.column().config.textBreak!
            ? 'normal' : 'nowrap';
    });
}