export interface IHeaderSettings {
    backButton?: IButton;
    cancelButton?: IButton;
    filterButton?: IButton;
    exportButton?: IButtonExport;
    importButton?: IButtonImport;
    addButton?: IButtonAdd;
    saveButton?: IButton;
    search?: ISearch;
    slotPosition?: 'left' | 'right';
    buttonType?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded'; 
}


export interface IButton {
    show: boolean;
    path?: string;
    tooltip?: string;  
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light';  
}


export interface IButtonExport extends IButton {    
    preventDefault?: boolean;
    fileName?: string;
    onlyColumnFiltered?: boolean;
    onlyFilteredRows?: boolean;
    onlySelectedRows?: boolean;
}


export interface IButtonImport extends IButton {    
    preventDefault?: boolean;
    Autofill?: boolean;
}


export interface IButtonAdd extends IButton {  
    preventDefault?: boolean;
    addTo?: 'start' | 'end';
} 


export interface ISearch {
    show: boolean;  
    preventDefault?: boolean;
    properties?: string[] | null;
} 