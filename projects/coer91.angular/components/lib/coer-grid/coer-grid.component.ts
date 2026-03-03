import { IBodySettings, IColumn, IColumnConfig, IDataSourceGroup, ISearch } from './coer-grid-interfaces';
import { Collections, CONTROL_VALUE, ControlValue, Strings, Tools } from 'coer91.angular/tools'; 
import { Component, computed, input, signal } from '@angular/core'; 

@Component({
    selector: 'coer-grid',
    templateUrl: './coer-grid.component.html', 
    styleUrl: './coer-grid.component.scss', 
    providers: [CONTROL_VALUE(CoerGrid)],
    standalone: false
})
export class CoerGrid<T> extends ControlValue {    
    
    //Variables 
    protected override readonly _value = signal<T[]>([]);
    protected readonly _search    = signal<string>('');
    protected readonly _isLoading = signal<boolean>(false); 

    //Input 
    public readonly columns      = input<IColumn<T>[]>([]);
    public readonly search       = input<ISearch>({ show: false }); 
    public readonly bodySettings = input<IBodySettings<T>>({}); 
    public readonly width        = input<string>('100%');
    public readonly minWidth     = input<string>('100px');
    public readonly maxWidth     = input<string>('100%');
    public readonly height       = input<string>('350px');
    public readonly minHeight    = input<string>('150px');
    public readonly maxHeight    = input<string>('100%');


    /** Sets the value of the component */
    protected override _SetValue(value: T[]): void {
        if(Tools.IsNull(value)) value = [];
        value = [...value!].map((item, index) => ({ checked: false, ...item, __index__: index }));          
        super._SetValue(value); 
    }


    //computed
    protected _columns = computed<IColumnConfig<T>[]>(() => {
        const COLUMNS = this.columns().length > 0
            ? new Set<string>(this.columns().map(item => item.property).filter(x => !['__index__', 'checked'].includes(x)))
            : new Set<string>(Tools.GetPropertyList(this._value()[0]).filter(x => !['__index__', 'checked'].includes(x)));
         
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


    /** */
    protected _GetColumnConfig = (property: string): IColumn<T> | null => {
        const COLUMN_CONFIG = this.columns().find(x => x.property === property);  

        //coer-switch
        if(COLUMN_CONFIG?.coerSwitch) {
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
            color:      COLUMN_CONFIG?.color      || 'dark',
            type:       COLUMN_CONFIG?.type       || 'string'
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
        const SEARCH_TEXT = this._search().trim().toUpperCase();

        //Ignore Filter
        if (Tools.IsOnlyWhiteSpace(SEARCH_TEXT) || Tools.IsBooleanTrue(this.search()?.ignore)) {
            return DATA_SOURCE;
        } 

        //Filter by search   
        const SEARCH_PROPERTIES = this.search()?.properties
            ? this.search().properties! : this.columns().map(item => item.property);  

        //Data Formated
        let DATA_SOURCE_FORMAT = DATA_SOURCE.map((data: any) => 
            this._columns().map(x => x.config).reduce(
                (previousValue, currentValue) => ({
                    ...previousValue,
                    [currentValue.property]: this._ApplyFormat(data[currentValue.property], currentValue.type)
                }), 
                { ...data }
            )
        );  

        DATA_SOURCE_FORMAT = Collections.Search(DATA_SOURCE_FORMAT, SEARCH_TEXT, SEARCH_PROPERTIES);
        return Collections.Intercept(DATA_SOURCE, DATA_SOURCE_FORMAT, '__index__');  
    });


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


    //computed
    protected _heightCompensation = computed<string>(() => { 
        let COMPENSATION = 0;

        //HEADER
        // if(this._headerReady) {
        //     COMPENSATION += this._coerGridHeader()?.marginBottom() 
        //         ? Number(HTMLElements.GetElementHeight(`#${this._id}-coer-grid-header`).split('px')[0]) + 5 
        //         : 0;
        // } else COMPENSATION += 40;

        //FOOTER
        // if(this._footerReady) {
        //     COMPENSATION += this.footer().show ? 30 : 0; 
        // } else COMPENSATION += 30;
         
        return `${COMPENSATION}px`;
    });
}