export interface IMenu {
    id?: number;
    label: string;
    icon?: string;
    path?: string;
    show?: 'LIST' | 'GRID';
    canCreate?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
    activeKey?: string;
    sequence?: number; 
    items?: IMenu[];
}