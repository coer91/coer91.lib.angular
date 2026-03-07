import { AfterViewInit, Component, computed, input, output, signal, WritableSignal } from "@angular/core";
import { IBodySettings, ICallbackItem, IColumnConfig, IInputChange } from "../coer-grid-interfaces";
import { Tools } from "coer91.angular/tools";

@Component({
    selector: 'coer-grid-cell',
    templateUrl: './coer-grid-cell.component.html',
    styleUrl: './coer-grid-cell.component.scss',
    standalone: false
})
export class CoerGridCell<T> implements AfterViewInit {
   
    //Variables
    protected readonly _isElementReady = signal<boolean>(false);

    //Inputs 
    public readonly id             = input.required<string>();
    public readonly ApplyFormat    = input.required<(value: any, type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'time') => string>();
    public readonly column         = input.required<IColumnConfig<T>>();
    public readonly row            = input.required<any>();
    public readonly bodySettings   = input.required<IBodySettings<T>>();
    public readonly isLoadingInner = input.required<WritableSignal<boolean>>();
    public readonly isEnabled      = input.required<boolean>();

    //Outputs  
    protected readonly onClickRow       = output<T>();
    protected readonly onDoubleClickRow = output<T>(); 
    protected readonly onInputChange    = output<IInputChange<T>>(); 


    ngAfterViewInit(): void {
        Tools.Sleep(1000).then(() => this._isElementReady.set(true));
    }  


    //Function
    protected _DoubleClick(): void { 
        if(this.isEnabled()) {
            const ROW = { ...this.row() };
            delete ROW['__index__'];
            delete ROW['__checked__'];
 
            this.onDoubleClickRow.emit(ROW);
        }         
    } 


    /** */
    public _input = computed<'HTML' | 'coerTextbox' | 'coerNumberbox' | 'coerSelectbox' | 'coerDatebox' | 'inputSwitch'>(() => {
        const COLUMN_CONFIG = this.column().config;
        if(Tools.IsNull(COLUMN_CONFIG?.template)) {
            if(this._ShowInput(COLUMN_CONFIG?.inputSwitch)) {
                return 'inputSwitch';
            }

            else if(this.isEnabled()) {
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
            } 
        }

        return 'HTML';
    });


    //Computed
    private _ShowInput = (property?: null | boolean | ((item: ICallbackItem<T>) => any)): boolean => { 
        const row = { ...this.row() };
        delete row['__index__'];
        delete row['__checked__'];

        return Tools.IsBooleanTrue(property) || (
            Tools.IsFunction(property) && (property as any)({
                property: this.column().config.property, 
                row, 
                value: row[this.column().config.property] 
            })?.showInput  
        );
    } 


    //Computed
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
    protected _GetAttributes = () => { 
        const FUNCTION = (this.column().config as any)[this._input()]; 
        const ROW = { ...this.row() };
        delete ROW['__index__'];
        delete ROW['__checked__'];

        return (
            Tools.IsFunction(FUNCTION) && FUNCTION({
                property: this.column().config.property, 
                row: ROW, 
                value: ROW[this.column().config.property] 
            })
        ) || null;
    } 


    //Function
    protected _GetAttributeValue = (attribute: string, defaultValue: any = null): any => {  
        return Tools.IsNotNull(this._GetAttributes()) 
            ? (Tools.IsNotOnlyWhiteSpace(this._GetAttributes()[attribute]) ? this._GetAttributes()[attribute] : defaultValue)
            : defaultValue;
    } 


    //Computed
    protected _minHeight = computed<string>(() => {
        const BORDERS = !Tools.IsBooleanFalse(this.bodySettings().showBorders) ? '0.800px' : '0px';
        return `calc(${this.column().config.height!} - ${BORDERS})`
    });


    //Computed
    protected _GetTextAlignX = computed<'flex-start' | 'center' | 'flex-end'>(() => {
        switch(this.column().config.textAlignX!) {
            case 'left'  : return 'flex-start';
            case 'center': return 'center';
            case 'right' : return 'flex-end'; 
        }
    }); 


    //Computed
    protected _GetTextBreak = computed<'break-word' | 'keep-all'>(() => {
        return this.column().config.textBreak!
            ? 'break-word' : 'keep-all';
    });


    //Computed
    protected _GetSpaceBreak = computed<'nowrap' | 'normal'>(() => {
        return this.column().config.textBreak!
            ? 'normal' : 'nowrap';
    });


    //Computed
    protected _GetTextColor = computed(() => { 
        let color: any = this.column().config?.color;

        if(Tools.IsNotNull(color)) {
            if(Tools.IsFunction(color)) { 
                const ROW = { ...this.row() };
                delete ROW['__index__'];
                delete ROW['__checked__'];
    
                color = color({
                    property: this.column().config.property, 
                    row: ROW, 
                    value: ROW[this.column().config.property] 
                }) || null;
            }
    
            if(Tools.IsNotOnlyWhiteSpace(color)) {
                return `color-${color} font-weight-bold`;
            }
        }

        return 'color-dark';
    });
}