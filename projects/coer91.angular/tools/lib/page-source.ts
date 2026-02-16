import { IAppSource } from "coer91.angular/interfaces";
import { BreadcrumbsPage } from "./page-breadcrumbs"; 
declare const appSettings: any;
 
export class SourcePage {

    private static readonly storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';


    /** */
    public static Set(pageName: string, path: string): void { 
        let source: IAppSource | null = null;
        
        BreadcrumbsPage.Set(pageName, path);
        const breadcrumbs = BreadcrumbsPage.Get();

        if(breadcrumbs.length >= 2) { 
            const breadcrumb = breadcrumbs.slice(0, -1).pop()!;
            source = { page: breadcrumb.page, path: breadcrumb.path };
        }

        let storage = sessionStorage.getItem(this.storage) as any;
        if (storage) storage = JSON.parse(storage);
        storage = { ...storage, source };
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** */
    public static Get(): IAppSource | null {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            return storage?.source || null;
        }

        return null;
    }     
}