import { AfterViewInit, Component, computed, ElementRef, input, output, signal, viewChild, WritableSignal } from '@angular/core'; 
import { IInputChange, IHeaderSettings, IImportButton } from 'coer91.angular/interfaces';
import { CoerAlert, Files, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-grid-header',
    templateUrl: './coer-grid-header.component.html',
    standalone: false
})
export class CoerGridHeader<T> implements AfterViewInit { 

    //Elements
    protected readonly _inputFile = viewChild.required<ElementRef>('inputFileRef');

    //Variables
    protected readonly _isLoadingExport = signal<boolean>(false); 
    protected readonly _isElementReady = signal<boolean>(false);
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace; 
         
    //Input
    public readonly label            = input.required<string>();
    public readonly icon             = input.required<string>();
    public readonly IdCalculated     = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public readonly search           = input.required<WritableSignal<string>>();
    public readonly headerSettings   = input.required<IHeaderSettings>({}); 
    public readonly isLoadingInner   = input.required<WritableSignal<boolean>>();
    public readonly isLoading        = input.required<boolean>();
    public readonly isEnabled        = input.required<boolean>();
    public readonly dataSourceExport = input.required<T[]>();

    //Output     
    protected readonly onClickExport = output<T[]>();
    protected readonly onClickImport = output<IImportButton<T>>();
    protected readonly onClickAdd    = output<void>();
    protected readonly onClickSave   = output<void>();
    protected readonly onKeyupEnter  = output<IInputChange<T>>();
    protected readonly onInputChange = output<IInputChange<T>>();
    protected readonly onClickClear  = output<IInputChange<T>>();
    protected readonly onClickSearch = output<IInputChange<T>>(); 

    ngAfterViewInit(): void {
        Tools.Sleep(1000).then(() => this._isElementReady.set(true));
    } 

    //Computed
    protected _buttons = computed(() => {
        const COLOR = (property: string, defaultColor: string) => Tools.IsNotOnlyWhiteSpace((this.headerSettings() as any)[property]?.color)   
            ? (this.headerSettings() as any)[property].color   
            : defaultColor;

        const PATH = (property: string) => Tools.IsNotOnlyWhiteSpace((this.headerSettings() as any)[property]?.path)    
            ? (this.headerSettings() as any)[property].path    
            : '';

        const TOOLTIP = (property: string) => Tools.IsNotOnlyWhiteSpace((this.headerSettings() as any)[property]?.tooltip) 
            ? (this.headerSettings() as any)[property].tooltip 
            : ''; 

        const LOADING = (property: string) => Tools.IsOnlyWhiteSpace((this.headerSettings() as any)[property]?.path) 
            ? (this.isLoading() || this.isLoadingInner()()) : false;

        const SHOW = (property: string) => Tools.IsBooleanTrue((this.headerSettings() as any)[property]?.show) 
            && (Tools.IsOnlyWhiteSpace((this.headerSettings() as any)[property]?.path) ? this.isEnabled() : true) 

        return ([] as {
            icon:       string,
            color:      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light',
            path:       string,
            tooltip:    string, 
            isLoading:  boolean,
            event:      any
        }[]) 
        .concat((SHOW('exportButton') && this.dataSourceExport().length > 0) ? [{
            icon:       'excel',
            color:      COLOR('exportButton', 'primary'),
            path:       PATH('exportButton'),
            tooltip:    TOOLTIP('exportButton'), 
            isLoading:  LOADING('exportButton') || this._isLoadingExport(),
            event: {
                emit: (() => {{ 
                    if (Tools.IsNotOnlyWhiteSpace(this.headerSettings().exportButton?.path)) this.Export(false);            
                    else this.Export(!Tools.IsBooleanTrue(this.headerSettings().exportButton?.preventDefault));
                }})
            }
        }] : [])
        .concat(SHOW('importButton') ? [{
            icon:       'import',
            color:      COLOR('importButton', 'primary'),
            path:       PATH('importButton'),
            tooltip:    TOOLTIP('importButton'), 
            isLoading:  LOADING('importButton'),
            event: {
                emit: (() => this.Import(null))
            }
        }] : [])       
        .concat(SHOW('addButton') ? [{
            icon:       'add',
            color:      COLOR('addButton', 'primary'),
            path:       PATH('addButton'),
            tooltip:    TOOLTIP('addButton'), 
            isLoading:  LOADING('addButton'),
            event:      this.onClickAdd
        }] : [])
        .concat(SHOW('saveButton') ? [{
            icon:       'save',
            color:      COLOR('saveButton', 'primary'),
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
    protected _slotPosition = computed(() => { 
        const position = Tools.IsNotOnlyWhiteSpace(this.headerSettings()?.slotPosition) ? this.headerSettings().slotPosition! : 'left';
        const margin = position === 'left' ? 'margin-right-auto' : 'margin-left-auto';   
        const width = this._buttons().length > 0 || this._showSearch() ? '' : 'width-100';
        return `display-flex gap-5px ${width} ${margin}`;
    });   
    

    /** */
    public Export(exportFile: boolean = true, fileName: string = ''): void {  
        this.isLoadingInner().set(true);
        this._isLoadingExport.set(true);
        
        //Export File
        if (exportFile) { 
            if(fileName.length <= 0) {
                fileName = Tools.IsNotOnlyWhiteSpace(this.headerSettings().exportButton?.fileName) 
                    ? this.headerSettings().exportButton?.fileName! : 'Report'; 
            }

            if(!fileName.endsWith('.xlsx')) fileName += '.xlsx';
        
            Files.ExportExcel(this.dataSourceExport(), fileName);
            this.onClickExport.emit(this.dataSourceExport()); 
            Tools.Sleep(3000).then(() => this._isLoadingExport.set(false)); 
        } 

        else {
            this.onClickExport.emit(this.dataSourceExport());
            this._isLoadingExport.set(false);
        } 
               
        this.isLoadingInner().set(false);
    }  


    //Computed
    protected _importAccept = computed(() => Array.from(Files.EXCEL_EXTENSIONS.values()).join(',')); 


    /** */
    public async Import(event: any = null): Promise<void> {
        try {
            if (Tools.IsBooleanTrue(this.headerSettings().importButton?.preventDefault) || Tools.IsNotOnlyWhiteSpace(this.headerSettings().importButton?.path)) {
                this.onClickImport.emit({ data: [], file: null, autofill: false });
                return;
            }

            if (event === null) {
                this._inputFile().nativeElement.value = [];
                this._inputFile().nativeElement.click();
                this.isLoadingInner().set(true);
                return;
            }

            else if (event.target!.files.length > 0) {  
                const [selectedFile] = event.target.files as File[];

                if(Files.IsExcel(selectedFile)) {
                    const { rows } = await Files.ReadExcel<T>(selectedFile);  
                
                    this.onClickImport.emit({ 
                        data: rows, 
                        file: selectedFile, 
                        autofill: rows.length > 0 && !Tools.IsBooleanFalse(this.headerSettings().importButton?.Autofill)
                    });
                }

                else {
                    let message = 'Allowed extensions:';
                    for(const extension of Files.EXCEL_EXTENSIONS.keys()) {
                        message += ` <b>${extension}</b>,`
                    }

                    message = message.substring(0, message.length - 1); 
                    new CoerAlert().Warning(message, 'Invalid File Type', 'i91-file-xls-fill');
                }

                this._inputFile().nativeElement.value = []; 
            }    
        } 

        catch (error) {
            console.error(`coer-grid: ${error}`);
        }
    }


    //Function
    protected _SearchChange(value: string) {  
        if(this._isElementReady()) {
            this.search().set(value);

            this.onInputChange.emit({
                position: 'HEADER',
                input: 'inputSearch',
                value: (value || '')
            });
        }
    }
}