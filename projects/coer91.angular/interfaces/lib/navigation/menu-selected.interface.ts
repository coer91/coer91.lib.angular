import { IMenu } from "./menu.interface";

export interface IMenuSelected {
    id: string;
    menu: IMenu;
    level: 'LV1' | 'LV2' | 'LV3';
    action: 'NONE' | 'OPEN' | 'CLOSED' | 'GRID';
    tree: { 
        id: string;
        label: string;
        icon: string;
    } [];
}