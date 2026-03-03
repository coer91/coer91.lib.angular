export interface ISearch {
    show: boolean;
    ignore?: boolean;
    isReadonly?: boolean;
    properties?: string[] | null;
}