export interface ICallbackItem<T> {
    __index__: number;
    property: string;
    value: any;
    row: T;
}