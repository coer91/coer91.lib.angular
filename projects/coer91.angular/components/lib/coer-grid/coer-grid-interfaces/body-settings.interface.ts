import { ICallbackItem } from "./callback-item.interface";

export interface IBodySettings<T> {
    showStriped?: boolean;
    showBorders?: boolean;
    showHover?: boolean;
    selectionRows?: ISelectionRow;
    deleteButton?: IRowButtonDelete<T>;
    editButton?: IRowButton<T>;
    modalButton?: IRowButton<T>;
    navigateButton?: IRowButton<T>;
    focusNext?: boolean;
}


export interface IRowButton<T> {
    show?:   boolean | ((item: ICallbackItem<T>) => boolean); 
    position?: 'left' | 'right';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'; 
    path?: (item: ICallbackItem<T>) => string; 
}


export interface IRowButtonDelete<T> extends IRowButton<T> {
    showConfirmation?: boolean;
    confirmationProperty?: string;
    preventDefault?: boolean;
}  


export interface ISelectionRow {
    show: boolean;
    selectAllowed?: number | null;
    selectOverRow?: boolean;
}