export interface IMenu {
    Id?: number;
    Label: string;
    Icon?: string;
    Path?: string;
    MenuType?: 'LIST' | 'GRID' | 'PAGE';
    ShowIndicator?: boolean;
    ShowIndex?: boolean;
    CanCreate?: boolean;
    CanUpdate?: boolean;
    CanDelete?: boolean;
    ActiveKey?: string;
    Sequence?: number; 
    Items?: IMenu[];
}