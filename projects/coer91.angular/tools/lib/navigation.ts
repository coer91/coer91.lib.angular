import { IMenuSelected } from "coer91.angular/interfaces";

declare const appSettings: any;

export class Navigation {

    private static readonly storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';

    /** */
    public static SetSelectedMenu(selectedMenu: IMenuSelected): void { 
        let storage = sessionStorage.getItem(this.storage) as any;
       
        if (storage) storage = JSON.parse(storage);
        
        storage = Object.assign({}, storage, { 
            navigation: { ...storage?.navigation, selectedMenu } 
        });
        
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static GetSelectedMenu(): IMenuSelected | null {
        let storage = sessionStorage.getItem(this.storage) as any;
		
        if (storage) {
            storage = JSON.parse(storage);

            if (storage.hasOwnProperty('navigation') && storage.navigation.hasOwnProperty('selectedMenu')) {
                return storage.navigation.selectedMenu;
            }
        }

        return null;
    }
}