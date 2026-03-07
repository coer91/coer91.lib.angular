export interface IElementOutput {
    position: 'HEADER' | 'BODY' | 'FOOTER';
    element: 'search' | 'coer-textbox';
    value: any
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