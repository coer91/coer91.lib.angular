import { ISource } from "coer91.angular/interfaces";
import { Breadcrumbs } from "./breadcrumbs"; 
declare const appSettings: any;
 
export class Source {

    private static readonly storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';

    /** Save the source to sessionStorage and add the breadcrumb */
    public static Set(pageName: string): void {
        let path = document.location.href;
        if (path.includes('#')) path = path.split('#')[1];         
        if (path.includes('?')) path = path.split('?')[0];

        Breadcrumbs.Add(pageName, path);

        const breadcrumbs = Breadcrumbs.Get();

        if(breadcrumbs.length >= 2) {
            breadcrumbs.pop();
            const breadcrumb = breadcrumbs.pop()!;
            this.Save({ page: breadcrumb.page, path: breadcrumb.path });
        }

        else this.Save(null);
    }


    /** */
    private static Save(source: ISource | null): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        if (storage) storage = JSON.parse(storage);
        storage = Object.assign({}, storage, { source });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** Get the source from sessionStorage */
    public static Get(): ISource | null {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            if (storage.hasOwnProperty('source')) {
                return storage.source;
            }
        }

        return null;
    }


    /** Gets the first breadcrumb from sessionStorage */
    public static GetRoot(): ISource | null {
        return Breadcrumbs.GetFirst(); 
    }


    /** Remove the sessionStorage */
    public static Reset(): void {
        sessionStorage.removeItem(this.storage);
    }
}