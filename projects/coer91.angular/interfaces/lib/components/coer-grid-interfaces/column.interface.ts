import { ICellDateBox, ICellNumberBox, ICellSelectBox, ICellSwitch, ICellTextBox } from "./inner-element.interface";
import { ICallbackItem } from "./callback-item.interface"; 

export interface IColumnConfig<T> {
    __index__: number;
    name: string; 
    config: IColumn<T>; 
}


export interface IColumn<T> {
    property:        string;
    alias?:          string;
    short?:          boolean;
    width?:          string;
    height?:         string;
    textBreak?:      boolean;
    show?:           boolean;
    textAlignX?:     'left' | 'center' | 'right';
    textAlignY?:     'top'  | 'middle' | 'bottom';
    color?:          null | 'primary' | 'secondary' | 'success' | 'warning'  | 'danger' | 'navigation' | 'information' | 'dark' | 'light' | ((item: ICallbackItem<T>) => null | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light');
    format?:         'string' | 'number' | 'currency' | 'date' | 'time' | 'datetime';
    template?:       null | string  | ((item: ICallbackItem<T>) => string);
    inputSwitch?:    null | boolean | ((item: ICallbackItem<T>) => ICellSwitch);
    inputTextbox?:   null | boolean | ((item: ICallbackItem<T>) => ICellTextBox);
    inputNumberbox?: null | boolean | ((item: ICallbackItem<T>) => ICellNumberBox);
    inputSelectbox?: null | ((item: ICallbackItem<T>) => ICellSelectBox<T>);
    inputDatebox?:   null | boolean | ((item: ICallbackItem<T>) => ICellDateBox);
} 