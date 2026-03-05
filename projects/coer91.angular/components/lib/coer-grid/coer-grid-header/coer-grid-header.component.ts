import { Component, computed, input, output, OutputEmitterRef, WritableSignal } from '@angular/core'; 
import { IElementOutput, IHeaderSettings, IImportButton } from '../coer-grid-interfaces';
import { Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-grid-header',
    templateUrl: './coer-grid-header.component.html',
    standalone: false
})
export class CoerGridHeader<T> {  
    
    //Input
    public readonly IdCalculated   = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public readonly search         = input.required<WritableSignal<string>>();
    public readonly headerSettings = input.required<IHeaderSettings>({}); 
    public readonly isLoading      = input.required<boolean>();
    public readonly isEnabled      = input.required<boolean>();

    //Output     
    protected readonly onClickExport = output<T[]>();
    protected readonly onClickImport = output<IImportButton<T>>();
    protected readonly onClickAdd    = output<void>();
    protected readonly onClickSave   = output<void>();
    protected readonly onKeyupEnter  = output<IElementOutput>();
    protected readonly onClickClear  = output<IElementOutput>();
    protected readonly onClickSearch = output<IElementOutput>(); 

    //Computed
    protected _buttons = computed(() => {
        const COLOR = (property: string) => Tools.IsNotOnlyWhiteSpace((this.headerSettings() as any)[property]?.color)   
            ? (this.headerSettings() as any)[property].color   
            : 'primary';

        const PATH = (property: string) => Tools.IsNotOnlyWhiteSpace((this.headerSettings() as any)[property]?.path)    
            ? (this.headerSettings() as any)[property].path    
            : '';

        const TOOLTIP = (property: string) => Tools.IsNotOnlyWhiteSpace((this.headerSettings() as any)[property]?.tooltip) 
            ? (this.headerSettings() as any)[property].tooltip 
            : ''; 

        const LOADING = (property: string) => Tools.IsOnlyWhiteSpace((this.headerSettings() as any)[property]?.path) 
            ? this.isLoading() : false;

        const SHOW = (property: string) => Tools.IsBooleanTrue((this.headerSettings() as any)[property]?.show) 
            && (Tools.IsOnlyWhiteSpace((this.headerSettings() as any)[property]?.path) ? this.isEnabled() : true) 

        return ([] as {
            icon:       string,
            color:      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light',
            path:       string,
            tooltip:    string, 
            isLoading:  boolean,
            event:     OutputEmitterRef<T[] | IImportButton<T> | void>
        }[]) 
        .concat(SHOW('exportButton') ? [{
            icon:       'excel',
            color:      COLOR('exportButton'),
            path:       PATH('exportButton'),
            tooltip:    TOOLTIP('exportButton'), 
            isLoading:  LOADING('exportButton'),
            event:      this.onClickExport
        }] : [])
        .concat(SHOW('importButton') ? [{
            icon:       'import',
            color:      COLOR('importButton'),
            path:       PATH('importButton'),
            tooltip:    TOOLTIP('importButton'), 
            isLoading:  LOADING('importButton'),
            event:      this.onClickImport
        }] : [])       
        .concat(SHOW('addButton') ? [{
            icon:       'add',
            color:      COLOR('addButton'),
            path:       PATH('addButton'),
            tooltip:    TOOLTIP('addButton'), 
            isLoading:  LOADING('addButton'),
            event:      this.onClickAdd
        }] : [])
        .concat(SHOW('saveButton') ? [{
            icon:       'save',
            color:      COLOR('saveButton'),
            path:       PATH('saveButton'),
            tooltip:    TOOLTIP('saveButton'), 
            isLoading:  LOADING('saveButton'),
            event:      this.onClickSave
        }] : []);
    });


    //Computed
    protected _showSearch = computed(() => {
        return Tools.IsBooleanTrue(this.headerSettings().search?.show);
    }); 


    //Computed
    protected _slotClass = computed(() => { 
        const position = Tools.IsNotOnlyWhiteSpace(this.headerSettings()?.slotPosition) ? this.headerSettings().slotPosition! : 'left';
        const margin = position === 'right' ? 'margin-left-auto' : 'margin-right-auto';   
        return `display-flex gap-5px ${margin}`;
    }); 


    //Computed
    protected _marginBottom = (slot: HTMLDivElement) => { 
        return this._buttons().length > 0 
            || this._showSearch()
            || slot.childElementCount > 0
            ? ' margin-bottom-5px ' : ' margin-bottom-0px ';
    };
}