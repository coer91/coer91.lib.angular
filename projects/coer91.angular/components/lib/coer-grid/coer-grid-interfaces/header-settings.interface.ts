export interface IHeaderSettings {
    exportButton?: IButtonExport;
    importButton?: IButtonImport;
    addButton?: IButtonAdd;
    saveButton?: IButton;
    search?: ISearch;
    slotPosition?: 'left' | 'right';
}


export interface IButton {
    show: boolean;
    path?: string;
    tooltip?: string; 
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'; 
}


export interface IButtonExport extends IButtonAdd {    
    preventDefault?: boolean;
    fileName?: string;
    onlyColumnFiltered?: boolean;
    onlyRowFiltered?: boolean;
    onlySelectedItem?: boolean;
}


export interface IButtonImport extends IButtonAdd {    
    preventDefault?: boolean;
    Autofill?: boolean;
}


export interface IButtonAdd extends IButton {  
    preventDefault?: boolean;
    addTo?: 'START' | 'END';
} 


export interface ISearch {
    show: boolean;  
    preventDefault?: boolean;
    properties?: string[] | null;
}