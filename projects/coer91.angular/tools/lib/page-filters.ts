declare const appSettings: any;

export class FiltersPage {

    private static readonly storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';


    /** */
    public static Get<T>(path: string): T | null  {
        let storage = sessionStorage.getItem(this.storage) as any;

        if(storage) {
            storage = JSON.parse(storage);
            const filterByPath: any[] = storage?.filterByPath || [];            
            const index = filterByPath.findIndex(x => x.path === path);

            if(index >= 0) {
                return filterByPath[index].filters;
            } 
        } 

        return null; 
    }


    /** */
    public static Set<T>(path: string, filters: T): void {        
        let storage = sessionStorage.getItem(this.storage) as any;

        if(storage) {
            storage = JSON.parse(storage);
            const filterByPath: any[] = storage?.filterByPath || [];            
            const index = filterByPath.findIndex(x => x.path === path);

            if(index >= 0) {
                filterByPath[index] = { path, filters };
            }

            else {
                filterByPath.push({ path, filters })
            }

            storage = { ...storage, filterByPath };            
            sessionStorage.setItem(this.storage, JSON.stringify(storage)); 
        }        
    }


    /** */
    public static Remove(path: string): void  {
        let storage = sessionStorage.getItem(this.storage) as any;

        if(storage) {
            storage = JSON.parse(storage);
            const filterByPath: any[] = storage?.filterByPath || [];            
            const index = filterByPath.findIndex(x => x.path === path);

            if(index >= 0) {
                filterByPath.splice(index, 1);
                storage = { ...storage, filterByPath };   
            }   
    
            sessionStorage.setItem(this.storage, JSON.stringify(storage));
        }
    } 
}