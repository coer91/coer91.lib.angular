export interface IInputChange<T> {
    position: 'HEADER' | 'BODY' | 'FOOTER';
    element: 'inputSearch' | 'inputTextbox' | 'inputSwitch';
    property?: string;
    before?: T;
    after?: T;
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