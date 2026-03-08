import { IBodySettings, IColumn, IColumnConfig, IDataSourceGroup, IInputChange, IHeaderSettings, IImportButton, ISelectedRow, IFooterSettings } from './coer-grid-interfaces';
import { CoerAlert, Collections, CONTROL_VALUE, ControlValue, HTMLElements, Strings, Tools } from 'coer91.angular/tools'; 
import { AfterContentChecked, Component, computed, inject, input, output, signal } from '@angular/core'; 
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'coer-grid',
    templateUrl: './coer-grid.component.html', 
    styleUrl: './coer-grid.component.scss', 
    providers: [CONTROL_VALUE(CoerGrid)],
    standalone: false
})
export class CoerGrid<T> extends ControlValue implements AfterContentChecked {
       

    //Injects
    protected readonly _router = inject(Router);
    protected readonly _alert = inject(CoerAlert);
    
    //Variables 
    protected override readonly _value = signal<T[]>([]);
    protected readonly _search = signal<string>('');
    protected readonly _isLoadingInner = signal<boolean>(false);  
    protected readonly _headerHeight = signal<number>(0);
    protected readonly _footerHeight = signal<number>(0); 
    protected readonly _containerHeight = signal<number>(0);
    protected _resize$!: Subscription;

    //Input 
    public readonly columns        = input<IColumn<T>[]>([]);
    public readonly headerSettings = input<IHeaderSettings>({}); 
    public readonly bodySettings   = input<IBodySettings<T>>({}); 
    public readonly footerSettings = input<IFooterSettings<T>>({}); 
    public readonly useContainer   = input<boolean>(true);
    public readonly width          = input<string>('100%');
    public readonly minWidth       = input<string>('100px');
    public readonly maxWidth       = input<string>('100%');
    public readonly height         = input<string>('350px');
    public readonly minHeight      = input<string>('150px');
    public readonly maxHeight      = input<string>('100%');

    public override readonly marginTop   = input<string>('15px');
    public override readonly marginRight = input<string>('30px'); 
    public override readonly marginLeft  = input<string>('30px');

    //Outputs
    protected readonly onClickExport       = output<T[]>();
    protected readonly onClickImport       = output<IImportButton<T>>();
    protected readonly onClickAdd          = output<T | null>();
    protected readonly onClickSave         = output<void>();
    protected readonly onKeyupEnter        = output<IInputChange<T>>();
    protected readonly onClickClear        = output<IInputChange<T>>();
    protected readonly onClickSearch       = output<IInputChange<T>>();
    protected readonly onClickRow          = output<T>();
    protected readonly onDoubleClickRow    = output<T>();
    protected readonly onClickDeleteRow    = output<T>();
    protected readonly onClickEditRow      = output<T>();
    protected readonly onClickModalRow     = output<T>();
    protected readonly onClickNavigateRow  = output<T>();
    protected readonly onSelectedRow       = output<ISelectedRow<T>>();
    protected readonly onInputChange       = output<IInputChange<T>>();


    /** Sets the value of the component */
    protected override _SetValue(value: T[], finishLoadingInner: boolean = false): void {
        if(Tools.IsNull(value)) value = [];
        value = [...value!].map((item, index) => ({ __checked__: false, ...item, __index__: index }));          
        super._SetValue(value); 

        if(finishLoadingInner) this._isLoadingInner.set(false);
    } 


    //Function
    protected _SetValueInput(event: IInputChange<T>): void {  
        if(this._isElementReady() && event.property && event.before) {  

            let delay = ['inputTextbox', 'inputNumberbox', 'inputSearch'].includes(event.input) ? 1000 : 0; 

            Tools.Sleep(delay, `gridUpdating${event.property}`).then(() => {                
                const BEFORE: any = { ...event.before };    
                
                this._value.update(VALUE => {
                    const DATA_SOURCE: any = [...VALUE];
                    DATA_SOURCE[BEFORE.__index__][event.property!] = event.value; 
    
                    if(this._useModelBinding()) {
                        this._UpdateValue()!(DATA_SOURCE); 
                    } 
    
                    return DATA_SOURCE;
                }); 
                 
                delete BEFORE['__index__'];
                delete BEFORE['__checked__'];
      
                this.onInputChange.emit({ 
                    ...event, 
                    before: BEFORE,
                    after: { ...BEFORE, [event.property!]: event.value }
                }); 
            });
        }  
    }


    ngAfterContentChecked(): void {
        let ID = this._IdCalculated(-1, -1, 'header-container');
        let ELEMENT = HTMLElements.SelectElementById(ID);
 
        if(ELEMENT) { 
            let height = 0;
            height += Number(HTMLElements.GetCssValue(ELEMENT, 'margin-bottom').split('px')[0]);
            height += Number(HTMLElements.GetHeight(ELEMENT).split('px')[0]); 
            this._headerHeight.set(height); 
        }


        ID = this._IdCalculated(-1, -1, 'footer-container');
        ELEMENT = HTMLElements.SelectElementById(ID);

        if(ELEMENT) { 
            let height = 0;
            height += Number(HTMLElements.GetCssValue(ELEMENT, 'margin-bottom').split('px')[0]);
            height += Number(HTMLElements.GetHeight(ELEMENT).split('px')[0]); 
            this._footerHeight.set(height); 
        }

        this._containerHeight.set(this.useContainer() ? 20 : 0);
    } 


    //computed
    protected _columns = computed<IColumnConfig<T>[]>(() => {
        const COLUMNS = this.columns().length > 0
            ? new Set<string>(this.columns().map(item => item.property).filter(x => !['__index__', '__checked__'].includes(x)))
            : new Set<string>(Tools.GetPropertyList(this._value()[0]).filter(x => !['__index__', '__checked__'].includes(x)));
         
        return [...COLUMNS].map<IColumnConfig<T>>((property, index) => ({
            __index__: index, 
            name: this._GetColumnName(property),
            config: this._GetColumnConfig(property)!
        }));
    });


    //Function
    protected _GetColumnName = (property: string): string => {
        const COLUMN_CONFIG = this._GetColumnConfig(property);        

        return COLUMN_CONFIG?.alias ? COLUMN_CONFIG.alias 
            : property.replace(/([A-Z])/g, ' $1').replace(/^./, x => x.toUpperCase()).trim();   
    } 


    //Function
    protected _GetColumnConfig = (property: string): IColumn<T> | null => {
        const COLUMN_CONFIG = this.columns().find(x => x.property === property);  

        //coer-switch
        if(COLUMN_CONFIG?.inputSwitch) {
            COLUMN_CONFIG.short = false;
            COLUMN_CONFIG.width = '100px';
            COLUMN_CONFIG.textAlignX = 'center';
        } 

        return {
            property, 
            ...COLUMN_CONFIG,
            short:      !Tools.IsBooleanFalse(COLUMN_CONFIG?.short),
            width:      COLUMN_CONFIG?.width      || 'auto',
            height:     COLUMN_CONFIG?.height     || '20px',
            textBreak:  Tools.IsBooleanTrue(COLUMN_CONFIG?.textBreak),
            textAlignX: COLUMN_CONFIG?.textAlignX || 'left',
            textAlignY: COLUMN_CONFIG?.textAlignY || 'middle',  
            color:      COLUMN_CONFIG?.color      || null,
            format:     COLUMN_CONFIG?.format       || 'string'
        }  
    }


    //Computed
    protected _dataSourceGroup = computed<IDataSourceGroup[]>(() => {
        const DATA_SOURCE = this._dataSourceFiltered(); 

        //Response
        return DATA_SOURCE.length > 0 ? [{
            groupBy: 'Not Grouped',
            index: -1, 
            rows: [...DATA_SOURCE].splice(0, 50)
        }] : [];
    });


    //computed
    protected _dataSourceFiltered = computed<T[]>(() => { 
        const DATA_SOURCE = this._value(); 
        const SEARCH_TEXT = this._search()?.trim()?.toUpperCase() || '';

        //Ignore Filter
        if (Tools.IsOnlyWhiteSpace(SEARCH_TEXT) || Tools.IsBooleanTrue(this.headerSettings()?.search?.preventDefault)) {
            return DATA_SOURCE;
        } 

        //Filter by search   
        const SEARCH_PROPERTIES = this.headerSettings().search?.properties
            ? this.headerSettings().search?.properties! : this.columns().map(item => item.property);  

        //Data Formated
        let DATA_SOURCE_FORMAT = DATA_SOURCE.map((data: any) => 
            this._columns().map(x => x.config).reduce(
                (previousValue, currentValue) => ({
                    ...previousValue,
                    [currentValue.property]: this._ApplyFormat(data[currentValue.property], currentValue.format)
                }), 
                { ...data }
            )
        );  
 
        DATA_SOURCE_FORMAT = Collections.Search(DATA_SOURCE_FORMAT, SEARCH_TEXT, SEARCH_PROPERTIES);
        return Collections.Intercept(DATA_SOURCE, DATA_SOURCE_FORMAT, '__index__');  
    });


    //computed
    protected _dataSourceExport = computed<T[]>(() => {  
        let DATA_SOURCE: any[] = [...this._value()]; 

        if(Tools.IsBooleanTrue(this.headerSettings().exportButton?.onlyFilteredRows)) {
            DATA_SOURCE = [...this._dataSourceFiltered()];  
        }

        if (Tools.IsBooleanTrue(this.headerSettings().exportButton?.onlySelectedRows)) {
            DATA_SOURCE = [...DATA_SOURCE].filter(item => item['__checked__']);
        } 

        const COLUMNS = this.columns().length > 0 && !Tools.IsBooleanFalse(this.headerSettings().exportButton?.onlyColumnFiltered)
            ? Collections.Except(this.columns().map(item => item.property), ['__index__', '__checked__'])
            : Collections.Except(Tools.GetPropertyList(DATA_SOURCE[0]), ['__index__', '__checked__']);

        return DATA_SOURCE.map(row =>
            Object.fromEntries(
                COLUMNS.map(property => [this._GetColumnName(property), row[property]])
            )
        ) as T[];
    }); 


    //Computed
    protected _dataSourceSelected = computed<T[]>(() => [...this._value() as any[]]
        .filter(item => item.__checked__)
        .map(({ ...item }) => {
            delete item['__index__'];
            delete item['__checked__'];
            return item;
        })
    );


    //Function
    protected _ApplyFormat = (value: string | number | Date | boolean, type?: 'string' | 'number' | 'currency' | 'date' | 'time' | 'datetime'): string => {
        switch(type) { 
            // case 'number'  : return Number(value).toNumericFormat();
            // case 'currency': return Number(value).toCurrency();
            // case 'date'    : return Dates.ToFormatDate(value);
            // case 'datetime': return Dates.ToFormatDateTime(value, true);
            // case 'time'    : return Dates.ToFormatTime(value, true); 
            default: return Strings.CleanUpBlanks(`${value}`);
        }
    };


    //Function
    protected _IdCalculated = (indexRow: number, indexColumn: number, suffix: string = ''): string => { 
        return `${this._id}${indexRow > -1 ? '-row' + indexRow : ''}${indexColumn > -1 ? '-column' + indexColumn : ''}${suffix.length > 0 ? '-' + suffix : ''}`;
    }    
  

    //Function
    protected async _ClickDeleteRow(row: T): Promise<void> {
        const ROW = { ...row } as any;
        delete ROW['__index__'];
        delete ROW['__checked__'];
         
        const USE_DEFAULT_FUNCTION = Tools.IsNull(this.bodySettings().deleteButton?.path)
            && !Tools.IsBooleanTrue(this.bodySettings().deleteButton?.preventDefault);

        if(USE_DEFAULT_FUNCTION) {

            let deleteItem = true;
            if(!Tools.IsBooleanFalse(this.bodySettings().deleteButton?.showConfirmation)) {
                
                let displayProperty = '';
                const ALERT_PROPERTY = this.bodySettings().deleteButton?.confirmationProperty || '';
                
                if(Tools.IsNotOnlyWhiteSpace(ALERT_PROPERTY)) {
                    if(Tools.HasProperty(ROW, ALERT_PROPERTY)) {
                        displayProperty = ROW[ALERT_PROPERTY];
                    }
                }

                if(Tools.IsOnlyWhiteSpace(displayProperty)) {
                    if(Tools.HasProperty(ROW, 'name')) displayProperty = ROW['name']; 
                    else if(Tools.HasProperty(ROW, 'option')) displayProperty = ROW['option']; 
                    else displayProperty = 'row';
                }

                deleteItem = await this._alert.DangerConfirm(`Delete ${displayProperty} ?`, 'i91-trash-can');
            }

            if(deleteItem) {
                const DATA_SOURCE = [...this._value()];
                const INDEX = DATA_SOURCE.findIndex(item => JSON.stringify(item) === JSON.stringify(row));

                if(INDEX >= 0) {
                    DATA_SOURCE.splice(INDEX, 1);
                    this._SetValue(DATA_SOURCE);
                }
            }
        }  

        this.onClickDeleteRow.emit(ROW);
    } 


    //computed
    protected _height = computed<string>(() => { 
        if(this.height() === 'full') {
            let height = 0;
            height += 50; //Toolbar
            height += 50; //Page Title
            height += 35; //Container
            height += 15; //Margin Bottom
            return `calc(100vh - ${height}px)`;
        } 

        return this.height();
    });


    //Function
    protected _Import(value: IImportButton<T>) {
        this.onClickImport.emit(value);   

        if(value.autofill) {            
            const SET = new Set(value.data.concat(this._value()).flatMap(item => Tools.GetPropertyList(item)));
            
            const DATA = value.data.concat(this._value()).map(item => ({
                ...item,
                ...Object.fromEntries(
                    [...SET].filter(x => !Tools.HasProperty(item, x)).map(property => [property, ''])
                )
            }));  
             
            this._SetValue(DATA); 
        } 

        this._isLoadingInner.set(false);
    }
    
    
    /** */
    protected _Add() {
        let row: any = null; 

        if(!Tools.IsBooleanTrue(this.headerSettings().addButton?.preventDefault && Tools.IsOnlyWhiteSpace(this.headerSettings().addButton?.path))) {
            row = {}; 

            if(this._value().length > 0) {
                row = { 
                    ...Object.fromEntries(
                        Tools.GetPropertyList(this._value()[0]).map(property => [property, null])
                    )
                }
            }

            else if(this.columns().length > 0) { 
                row = { 
                    ...Object.fromEntries(
                        [...this.columns()].map(column => [column.property, null])
                    )
                }
            }  
            
            const DATA_SOURCE = this.headerSettings().addButton?.addTo === 'start'
                ? [{ ...row, __checked__: false  }].concat([...this._value()])
                : [...this._value()].concat([{ ...row, __checked__: false  }]); 
                        

            if(Tools.GetPropertyList(row).length > 0) { 
                this._SetValue(DATA_SOURCE);

                delete row['__index__'];
                delete row['__checked__'];
            } 

            else row = null;
        }

        this.onClickAdd.emit(row);
    }  
}