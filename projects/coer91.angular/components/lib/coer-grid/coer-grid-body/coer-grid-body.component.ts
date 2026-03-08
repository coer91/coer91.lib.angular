import { IBodySettings, ICallbackItem, IColumnConfig, IDataSourceGroup, IInputChange, IInputEnter, ISelectedRow } from "../coer-grid-interfaces";
import { Component, computed, input, output, signal, viewChildren, WritableSignal } from "@angular/core";
import { Tools } from "coer91.angular/tools";
import { CoerGridCell } from "../coer-grid-cell/coer-grid-cell.component";

@Component({
    selector: 'coer-grid-body',
    templateUrl: './coer-grid-body.component.html',
    styleUrl: './coer-grid-body.component.scss',
    standalone: false
})
export class CoerGridBody<T> { 
    
    //Elements
    protected readonly _coerGridCellList = viewChildren(CoerGridCell<T>); 

    //Variables
    protected readonly IsBooleanFalse = Tools.IsBooleanFalse;
    protected readonly _checkAll = signal<boolean>(false);

    //Input
    public readonly value           = input.required<T[]>();
    public readonly IdCalculated    = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public readonly ApplyFormat     = input.required<(value: any, type: 'string' | 'number' | 'currency' | 'date' | 'datetime' | 'time') => string>();
    public readonly columns         = input.required<IColumnConfig<T>[]>();
    public readonly dataSourceGroup = input.required<IDataSourceGroup[]>();
    public readonly bodySettings    = input.required<IBodySettings<T>>();
    public readonly isLoadingInner  = input.required<WritableSignal<boolean>>();
    public readonly isLoading       = input.required<boolean>();
    public readonly isEnabled       = input.required<boolean>();   
    public readonly useContainer    = input.required<boolean>();
    public readonly height          = input.required<string>();
    public readonly minHeight       = input.required<string>();
    public readonly maxHeight       = input.required<string>(); 

    //Outputs
    protected readonly onClickRow          = output<T>();
    protected readonly onDoubleClickRow    = output<T>();
    protected readonly onClickDeleteRow    = output<T>();
    protected readonly onClickEditRow      = output<T>();
    protected readonly onClickModalRow     = output<T>();
    protected readonly onClickNavigateRow  = output<T>();
    protected readonly onSelectedRowChange = output<T[]>();
    protected readonly onSelectedRow       = output<ISelectedRow<T>>();
    protected readonly onInputChange       = output<IInputChange<T>>();
    protected readonly onKeyupEnter        = output<IInputChange<T>>(); 
    protected readonly onKeyupEnterLast    = output<IInputChange<T>>();

    //Function
    protected _showStriped = (index: number): boolean => {
        return !Tools.IsBooleanFalse(this.bodySettings().showStriped) && (index % 2 != 0);
    }


    //Function
    protected _ShowButton(button: any, position: 'left' | 'right', row: any = null) {
        let response = false;

        if(position === button.position && this.isEnabled() && !this.isLoadingInner()() && this.dataSourceGroup().length > 0) { 
            const SHOW_BUTTON = (this.bodySettings() as any)[button.property]?.show;
            
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
                    property: button.property, 
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
            position: this.bodySettings()?.deleteButton?.position || 'right',
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.deleteButton?.color) ? this.bodySettings()?.deleteButton?.color : 'danger', 
            event: this.onClickDeleteRow 
        },
        { 
            property: 'editButton', 
            icon: 'edit',  
            position: this.bodySettings()?.editButton?.position || 'right',
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.editButton?.color) ? this.bodySettings()?.editButton?.color : 'primary', 
            event: this.onClickEditRow 
        },
        { 
            property: 'modalButton', 
            icon: 'modal',  
            position: this.bodySettings()?.modalButton?.position || 'right',
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.modalButton?.color) ? this.bodySettings()?.modalButton?.color : 'primary', 
            event: this.onClickModalRow 
        },
        { 
            property: 'navigateButton', 
            icon: 'navigate',  
            position: this.bodySettings()?.navigateButton?.position || 'right',
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
                property, 
                row: ROW, 
                value: null 
            });
        } 

        return response;  
    }


    //Computed
    protected _showCheckbox = computed(() => {  
        return this.bodySettings().selectionRows?.show 
            && this.dataSourceGroup().length > 0  
            && (this.bodySettings().selectionRows?.selectAllowed !== 0)
            && this.isEnabled(); 
    });


    //Function
    protected _isReadonlySelection = (row: any, byClickRow: boolean): boolean => { 
        const SELECT_ALLOWED = this.bodySettings().selectionRows?.selectAllowed || 0; 

        if(SELECT_ALLOWED > 1) {
            const SELECTED = (this.value() as any[]).filter(x => x.__checked__).length; 
            
            return byClickRow 
                ? SELECTED >= SELECT_ALLOWED 
                : SELECTED >= SELECT_ALLOWED && Tools.IsBooleanFalse(row.__checked__); 
        }

        return false; 
    }


    //Function
    protected _ClickOnRow(row: any): void { 
        if(!this.isEnabled()) return; 
         
        if(this._showCheckbox() && this.bodySettings().selectionRows?.selectOverRow) {
            if(Tools.IsBooleanFalse(row.__checked__) && !this._isReadonlySelection(row, true)) {
                this.CheckBy((x: any) => x.__index__ == row.__index__); 
            } 
        }

        const ROW = { ...row };
        delete ROW["__index__"];
        delete ROW["__checked__"];
        this.onClickRow.emit(ROW);
    } 


    /** */
    protected async _ClickCheckAll(checked: boolean): Promise<void> {   
        this.isLoadingInner().set(true); 
        const DATA_SOURCE: any[] = [...this.value()].map(item => ({ ...item, __checked__: checked }));

        this.onSelectedRowChange.emit(DATA_SOURCE);            
        
        this.onSelectedRow.emit({ 
            all: true, 
            checked: checked, 
            rows: DATA_SOURCE.map((item: any) => {
                delete item["__index__"];
                delete item["__checked__"];
                return item;
            })
        }); 
    } 


    /** */
    protected _ClickCheck(checked: boolean, row: any): void {  
        if(checked) this.CheckBy((x: any) => x.__index__ == row.__index__);
        else this.UncheckBy((x: any) => x.__index__ == row.__index__);
    }


    /** */
    public CheckBy(callback: (row: T) => boolean): void { 
        if(this.bodySettings().selectionRows?.show) {    
            this.isLoadingInner().set(true);
            
            let SELECTED_ROWS: any[] = [];
            const DATA_SOURCE: any[] = [...this.value()];
            const SELECT_ALLOWED = this.bodySettings().selectionRows?.selectAllowed || 0;
            
            if(SELECT_ALLOWED > 0) {  
                if(SELECT_ALLOWED == 1) {
                    const SELECTED = DATA_SOURCE.find(callback);  
                    SELECTED_ROWS = DATA_SOURCE.map(item => ({ ...item, __checked__: (item.__index__ == SELECTED.__index__) })); 
                }

                else {
                    const CURRENT_SELECTED = [...DATA_SOURCE].filter(item => item.__checked__).map(item => item.__index__);
                    
                    if(CURRENT_SELECTED.length < SELECT_ALLOWED) {
                        const SELECTED = DATA_SOURCE.filter(callback).map(item => item.__index__);  

                        SELECTED_ROWS = DATA_SOURCE.map(item => ({
                            ...item,
                            __checked__: SELECTED.includes(item.__index__) || CURRENT_SELECTED.includes(item.__index__)
                        }));
                    }

                    else SELECTED_ROWS = DATA_SOURCE;
                }   
            }

            else {
                SELECTED_ROWS = DATA_SOURCE.map(item => callback(item) ? { ...item, __checked__: true } : item);  
            }

            this.onSelectedRowChange.emit(SELECTED_ROWS);
             
            //Mark All checkbox
            this._checkAll.set(SELECTED_ROWS.every((x: any) => x.__checked__));  
            
            //Event Checkbox Change
            this.onSelectedRow.emit({ 
                all: false, 
                checked: true, 
                rows: SELECTED_ROWS.filter(callback).map((item: any) => {
                    delete item["__index__"];
                    delete item["__checked__"];
                    return item;
                }) 
            });   
        }
    } 


    /** */
    public UncheckBy(callback: (row: T) => boolean): void {
        if(this.bodySettings().selectionRows?.show) {  
            this.isLoadingInner().set(true);
            const DATA_SOURCE: any[] = [...this.value()];
            
            const SELECTED_ROWS = DATA_SOURCE.map(item => callback(item) ? { ...item, __checked__: false } : item); 
            this.onSelectedRowChange.emit(SELECTED_ROWS);     
 
            this._checkAll.set(SELECTED_ROWS.every((x: any) => x.__checked__));

            this.onSelectedRow.emit({ 
                all: false, 
                checked: false, 
                rows: SELECTED_ROWS.filter(callback).map((item: any) => {
                    delete item["__index__"];
                    delete item["__checked__"];
                    return item;
                }) 
            }); 
        }
    } 


    /** */
    protected _NextInput(indexRow: number, indexColumn: number, event: IInputEnter<T>): void {

        const ROW = { ...event.row } as any;
        delete ROW["__index__"];
        delete ROW["__checked__"];

        const KEYUP_ENTER: IInputChange<T> = {
            position: 'BODY',
            input: event.input, 
            property: event.property,
            before: ROW,
            after: ROW,
            value: event.value
        };

        this.onKeyupEnter.emit(KEYUP_ENTER);  

        if(!Tools.IsBooleanFalse(this.bodySettings().focusNext)) {             
            const INPUT_TEXTBOX     = this.columns().filter(item => Tools.IsNotNull(item.config?.inputTextbox)).map(item => item.config.property);
            const INPUT_NUMBERBOX   = this.columns().filter(item => Tools.IsNotNull(item.config?.inputNumberbox)).map(item => item.config.property);
            const INPUT_SELECTBOX   = this.columns().filter(item => Tools.IsNotNull(item.config?.inputSelectbox)).map(item => item.config.property);
            const INPUT_DATETIMEBOX = this.columns().filter(item => Tools.IsNotNull(item.config?.inputDatebox)).map(item => item.config.property);
            
            let index = 0;
            const COLUMNS = []; 
            for (const { property } of this.columns().map(item => item.config)) {
                if (INPUT_TEXTBOX.some(input => input == property)) {
                    COLUMNS.push({ index, property, input: 'inputTextbox' }); 
                }
    
                else if (INPUT_NUMBERBOX.some(input => input == property)) {
                    COLUMNS.push({ index, property, input: 'inputNumberbox' });
                }
    
                else if (INPUT_SELECTBOX.some(input => input == property)) {
                    COLUMNS.push({ index, property, input: 'inputSelectbox' });
                }

                else if (INPUT_DATETIMEBOX.some(input => input == property)) {
                    COLUMNS.push({ index, property, input: 'inputDatebox' });
                }
    
                else {
                    COLUMNS.push({ index, property, input: 'default' });
                }
    
                ++index;
            }      
    
            let lastRow = -1;
            for(const { rows } of this.dataSourceGroup()) {
                lastRow += rows.length;
            } 
    
            const COLUMNS_INPUT = COLUMNS.filter(x => x.input != 'default');
            const firstColumn = [...COLUMNS_INPUT].shift()?.index || -1;
            const lastColumn  = [...COLUMNS_INPUT].pop()?.index   || -1;
     
            //Is Last Row & Last Input Column?
            if (indexRow == lastRow && indexColumn == lastColumn) {
                this.onKeyupEnterLast.emit(KEYUP_ENTER); 
            }
    
            //Is Last Input Column?
            else if (indexColumn == lastColumn) {
                this.FocusInput((indexRow + 1), firstColumn); 
            }
    
            //Next Column?
            else {
                console.log('other')
        //         for (index = (indexColumn + 1); index < COLUMNS.length; index++) {
        //             for(const input of COLUMNS) {
        //                 if(index == input.indexColumn && ['coer-textbox', 'coer-numberbox', 'coer-selectbox'].includes(input.input)) {
        //                     this.FocusInput(indexRow, input.indexColumn);
        //                     return;
        //                 }
        //             }
        //         }
            }
        }
    }


    /** */
    public FocusInput(indexRow: number = -1, indexColumn: number = -1, onlyFocus: boolean = false): void {
        Tools.Sleep().then(() => {
            if (this.isEnabled()) {
                indexRow = indexRow >= 0 ? indexRow : 0;

                if (indexColumn < 0) { 
                    const boxTypes = {
                        inputTextbox  : this.columns().filter(item => Tools.IsNotNull(item.config?.inputTextbox)).map(item => item.config.property),
                        inputNumberbox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputNumberbox)).map(item => item.config.property),
                        inputSelectbox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputSelectbox)).map(item => item.config.property),
                        inputDatebox:   this.columns().filter(item => Tools.IsNotNull(item.config?.inputDatebox)).map(item => item.config.property),
                    }; 
                
                    const COLUMNS = this.columns().map(({ config }, index) => ({                           
                        index, 
                        property: config.property, 
                        input: Object.entries(boxTypes).find(([_, props]) => props.includes(config.property))?.[0] ?? ''
                    })); 
                
                    if (COLUMNS.length > 0) {
                        this.FocusInput(indexRow, COLUMNS[0].index, onlyFocus);
                    }
                }
                
                else {
                    const NEXT_INPUT = this._coerGridCellList().find(x => x.id() == this.IdCalculated()(indexRow, indexColumn, 'cell')); 
                    NEXT_INPUT?.Focus(!onlyFocus); 
                }
            } 
        });
    }


    /** */
    public FocusLastInput(onlyFocus: boolean = false): void {
    //     Tools.Sleep().then(() => {
    //         const boxTypes = {
    //             'coer-textbox'  : this.columns().filter(x => Tools.IsNotNull(x.config?.coerTextbox)).map(x => x.property.toUpperCase()),
    //             'coer-numberbox': this.columns().filter(x => Tools.IsNotNull(x.config?.coerNumberbox)).map(x => x.property.toUpperCase()),
    //             'coer-selectbox': this.columns().filter(x => Tools.IsNotNull(x.config?.coerSelectbox)).map(x => x.property.toUpperCase())
    //         };
            
    //         const COLUMNS = this.columns().map(({ property }, index) => ({                           
    //             indexColumn: index, 
    //             property, 
    //             input: Object.entries(boxTypes).find(([_, props]) => props.includes(property.toUpperCase()))?.[0] ?? ''
    //         }));
            
    //         const indexRow    = (this.value().length > 0) ? (this.value().length - 1) : -1;
    //         const indexColumn = COLUMNS.filter(x => x.input.length > 0).pop()?.indexColumn || -1;
            
    //         if(indexRow >= 0 && indexColumn >= 0) {
    //             this.FocusInput(indexRow, indexColumn, onlyFocus);
    //         }       
    //     });
    }
}