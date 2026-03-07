import { ICallbackItem } from "./callback-item.interface";
import { ICellSwitch } from "./cell-switch.interface";

export interface IColumnConfig<T> {
    __index__: number;
    name: string; 
    config: IColumn<T>; 
}


export interface IColumn<T> {
    property:       string;
    alias?:         string;
    short?:         boolean;
    width?:         string;
    height?:        string;
    textBreak?:     boolean;
    textAlignX?:    'left' | 'center' | 'right';
    textAlignY?:    'top'  | 'middle' | 'bottom';
    color?:         null | 'primary' | 'secondary' | 'success' | 'warning'  | 'danger' | 'navigation' | 'information' | 'dark' | 'light' | ((item: ICallbackItem<T>) => null | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light');
    type?:          'string' | 'number' | 'currency' | 'date' | 'time' | 'datetime';
    template?:      null | string  | ((item: ICallbackItem<T>) => string);
    inputSwitch?:   null | boolean | ((item: ICallbackItem<T>) => ICellSwitch);
    // coerTextbox?:   null    | boolean | ((item: IGridItem<T>) => IGridTextBox);
    // coerNumberbox?: null    | boolean | ((item: IGridItem<T>) => IGridNumberBox);
    // coerSelectbox?: null    | boolean | ((item: IGridItem<T>) => IGridSelectBox);
    // coerDatebox?:   null    | boolean | ((item: IGridItem<T>) => IGridCoerTextBox);
} 