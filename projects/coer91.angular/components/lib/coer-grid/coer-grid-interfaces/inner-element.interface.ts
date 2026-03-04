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