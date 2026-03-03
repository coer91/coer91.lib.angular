import { ICallbackItem } from "./callback-item.interface";

export interface IBodySettings<T> {
    showStriped?: boolean;
    showBorders?: boolean;
    showHover?: boolean;
    deleteButton?: IRowButtonDelete<T>;
    editButton?: IRowButton<T>;
    modalButton?: IRowButton<T>;
    navigateButton?: IRowButtonDeleteNavigation<T>;
}


export interface IRowButton<T> {
    show?:   boolean | ((item: ICallbackItem<T>) => boolean); 
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'; 
    preventDefault?: boolean;
}


export interface IRowButtonDelete<T> extends IRowButton<T> {
    showAlert?: boolean;
}


export interface IRowButtonDeleteNavigation<T> extends IRowButton<T> { 
    path?: (item: ICallbackItem<T>) => string; 
}