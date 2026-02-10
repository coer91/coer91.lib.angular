import { IAppSource } from "coer91.angular/interfaces";
declare const appSettings: any;

export class BreadcrumbsPage {

    private static readonly storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';


    /** */
    public static Set(page: string, path: string): void {
        const breadcrumbs = this.Get(); 

        if (!breadcrumbs.some(x => x.path == path)) {
            breadcrumbs.push({ page, path });
            this._Save(breadcrumbs);
        }
    } 


    /** */
    public static Get(): IAppSource[] {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            return storage?.breadcrumbs || [];
        }

        return [];
    }


    /** */
    public static UpdateLast(page: string, path: string): void {
        const breadcrumbs = this.Get();

        if (breadcrumbs.length > 0) {
            breadcrumbs[breadcrumbs.length - 1] = { page, path };
            this._Save(breadcrumbs);
        }
    } 


    /** */
    public static RemoveByPath(path: string): void { 
        const breadcrumbs = this.Get();
        const index = breadcrumbs.findIndex(x => x.path == path);

        if (index >= 0) { 
            this._Save(breadcrumbs.splice(0, index + 1));
        }
    }


    /** */
    public static RemoveLast(): void {
        const breadcrumbs = this.Get();

        if (breadcrumbs.length > 0) { 
            this._Save(breadcrumbs.slice(0, -1));
        }
    }   


    //Function
    private static _Save(breadcrumbs: IAppSource[]): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        if (storage) storage = JSON.parse(storage);
        storage = { ...storage, breadcrumbs };
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }
}