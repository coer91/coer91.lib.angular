import { Tools } from "coer91.angular/tools";
import { IBodySettings, ICallbackItem, IColumnConfig, IDataSourceGroup } from "../coer-grid-interfaces";
import { Component, computed, input, output, WritableSignal } from "@angular/core";

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
    public readonly bodySettings    = input.required<IBodySettings<T>>();
    public readonly isLoading       = input.required<WritableSignal<boolean>>();
    public readonly isEnabled       = input.required<boolean>();   
    public readonly height          = input.required<string>();
    public readonly minHeight       = input.required<string>();
    public readonly maxHeight       = input.required<string>();

    //Outputs
    protected readonly onClickDeleteRow   = output<T>();
    protected readonly onClickEditRow     = output<T>();
    protected readonly onClickModalRow    = output<T>();
    protected readonly onClickNavigateRow = output<T>();


    //Function
    protected _showStriped = (index: number): boolean => {
        return !Tools.IsBooleanFalse(this.bodySettings().showStriped) && (index % 2 != 0);
    }


    //Function
    protected _ShowButton(property: 'deleteButton' | 'editButton' | 'modalButton' | 'navigateButton', row: any = null) {
        let response = false;

        if(this.isEnabled() && !this.isLoading()() && this.dataSourceGroup().length > 0) { 
            const SHOW_BUTTON = (this.bodySettings() as any)[property]?.show;
            
            if (Tools.IsNull(row)) {
                response = Tools.IsBooleanTrue(SHOW_BUTTON) || Tools.IsFunction(SHOW_BUTTON);
            }

            else if (Tools.IsBoolean(SHOW_BUTTON)) {
                response = SHOW_BUTTON;
            }

            else if (Tools.IsFunction(SHOW_BUTTON)) {
                const CALLBACK = SHOW_BUTTON as ((item: ICallbackItem<T>) => boolean);
                
                const ROW = { ...row };
                delete ROW['__index__'];
                delete ROW['__checked__'];

                response = CALLBACK({ 
                    __index__: row.__index__, 
                    property, 
                    row: ROW, 
                    value: null 
                });
            }
        } 

        return response;  
    }


    //Computed
    protected _borderButtom = computed<string>(() => {
        return Tools.IsBooleanTrue(this.bodySettings().showBorders) ? '1px solid var(--readonly)' : ''
    });


    //Computed
    protected _buttonsByRow = computed<any[]>(() => [   
        { 
            property: 'deleteButton',
            icon: 'delete',  
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.deleteButton?.color) ? this.bodySettings()?.deleteButton?.color : 'danger', 
            event: this.onClickDeleteRow 
        },
        { 
            property: 'editButton', 
            icon: 'edit',  
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.editButton?.color) ? this.bodySettings()?.editButton?.color : 'primary', 
            event: this.onClickEditRow 
        },
        { 
            property: 'modalButton', 
            icon: 'modal',  
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.modalButton?.color) ? this.bodySettings()?.modalButton?.color : 'primary', 
            event: this.onClickModalRow 
        },
        { 
            property: 'navigateButton', 
            icon: 'navigate',  
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.navigateButton?.color) ? this.bodySettings()?.navigateButton?.color : 'navigation', 
            event: this.onClickNavigateRow 
        }
    ]);


    //Function
    protected _Path(property: 'deleteButton' | 'editButton' | 'modalButton' | 'navigateButton', row: any): string {
        let response = '';
        
        const PATH_BUTTON = (this.bodySettings() as any)[property]?.path; 

        if (Tools.IsFunction(PATH_BUTTON)) {
            const CALLBACK = PATH_BUTTON as ((item: ICallbackItem<T>) => string);
            
            const ROW = { ...row };
            delete ROW['__index__'];
            delete ROW['__checked__'];

            response = CALLBACK({ 
                __index__: row.__index__, 
                property, 
                row: ROW, 
                value: null 
            });
        } 

        return response;  
    }
}