import { ISource } from "coer91.angular/interfaces";

declare const appSettings: any;

export class Breadcrumbs {

    private static readonly storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';

    /** Appends new breadcrumb to the end of an array */
    public static Add(page: string, path: string): void {
        const breadcrumbs = this.Get(); 

        if (!breadcrumbs.some(x => x.path == path)) {
            breadcrumbs.push({ page, path });
            this.Save(breadcrumbs);
        }
    }


    /** Get the breadcrumbs */
    public static Get(): ISource[] {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            if (storage.hasOwnProperty('breadcrumbs')) {
                return [...storage.breadcrumbs];
            }
        }

        return [];
    }


    /** Get the first breadcrumb */
    public static GetFirst(): ISource | null {
        const breadcrumbs = this.Get();
        return (breadcrumbs.length > 0) ? breadcrumbs.shift()! : null;
    }


    /** Get the last breadcrumb */
    public static GetLast(): ISource | null {
        const breadcrumbs = this.Get();
        return (breadcrumbs.length > 0) ? breadcrumbs.pop()! : null;
    }


    /** */
    private static Save(breadcrumbs: ISource[]): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        if (storage) storage = JSON.parse(storage);
        storage = Object.assign({}, storage, { breadcrumbs });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** Removes one breadcrumb by route */
    public static RemoveByPath(path: string): void { 
        const breadcrumbs = this.Get();
        const index = breadcrumbs.findIndex(x => x.path == path);

        if (index >= 0) { 
            this.Save([...breadcrumbs].splice(0, index + 1));
        }
    }


    /** Update the last breadcrumb */
    public static UpdateLast(page: string, path: string): void {
        const breadcrumbs = this.Get();

        if (breadcrumbs.length > 0) {
            breadcrumbs[breadcrumbs.length - 1] = { page, path };
            this.Save(breadcrumbs);
        }
    }


    /** Remove the last breadcrumb */
    public static RemoveLast(): void {
        const breadcrumbs = this.Get();

        if (breadcrumbs.length > 0) {
            breadcrumbs.pop();
            this.Save(breadcrumbs);
        }
    }
}