export interface IMenu {
    id?: number;
    label: string;
    icon?: string;
    path?: string;
    show?: 'LIST' | 'GRID';
    isReadonly?: boolean;
    sequence?: number; 
    activeKey?: string;
    items?: IMenu[];
}