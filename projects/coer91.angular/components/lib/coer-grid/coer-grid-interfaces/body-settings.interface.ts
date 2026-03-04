import { ICallbackItem } from "./callback-item.interface";

export interface IBodySettings<T> {
    showStriped?: boolean;
    showBorders?: boolean;
    showHover?: boolean;
    deleteButton?: IRowButtonDelete<T>;
    editButton?: IRowButton<T>;
    modalButton?: IRowButton<T>;
    navigateButton?: IRowButton<T>;
}


export interface IRowButton<T> {
    show?:   boolean | ((item: ICallbackItem<T>) => boolean); 
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'; 
    path?: (item: ICallbackItem<T>) => string; 
}


export interface IRowButtonDelete<T> extends IRowButton<T> {
    showAlert?: boolean;
    alertProperty?: string;
    preventDefault?: boolean;
}  