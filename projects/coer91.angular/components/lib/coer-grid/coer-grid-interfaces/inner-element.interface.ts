export interface IInputChange<T> {
    position: 'HEADER' | 'BODY' | 'FOOTER';
    input: 'inputSearch' | 'inputTextbox' | 'inputSwitch' | 'inputNumberbox' | 'inputSelectbox' | 'inputDatebox';
    property?: string;
    before?: T;
    after?: T;
    value: any;
}


export interface IInputEnter<T> {
    id: string;
    input: 'inputSearch' | 'inputTextbox' | 'inputSwitch' | 'inputNumberbox' | 'inputSelectbox' | 'inputDatebox';
    property?: string;
    row?: T;
    value: any;
}


export interface IImportButton<T> {
    data: T[];
    file: File | null;
    autofill: boolean;
}


export interface ISelectedRow<T> {
    all: boolean;
    checked: boolean;
    rows: T[];
}


export interface ICellSwitch {
    showInput  : boolean;
    isReadonly?: boolean;
    type?      : 'switch' | 'checkbox';
    tooltip?   : string;
    tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
    color?     : 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information';
} 


export interface ICellTextBox {
    showInput     : boolean; 
    icon?         : string;
    isValid?      : boolean; 
    isInvalid?    : boolean;
    placeholder?  : string;
    selectOnFocus?: boolean;
    textPosition? :'left' | 'center' | 'right'; 
    minLength?    : number | string;
    maxLength?    : number | string;
}


export interface ICellNumberBox { 
}


export interface ICellSelectBox<T> { 
    showInput       : boolean;  
    dataSource      : T;
    isValid?        : boolean; 
    isInvalid?      : boolean;
    placeholder?    : string;
    selectOnFocus?  : boolean;
    textPosition?   :'left' | 'center' | 'right'; 
    displayProperty?: string;
    useIconProperty?: boolean; 
}


export interface ICellDateBox { 
}