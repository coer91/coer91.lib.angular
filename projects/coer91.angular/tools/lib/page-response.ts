import { Tools } from "./generic";
declare const appSettings: any;
 
export class ResponsePage {

    private static readonly storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';


    /** Save the responsePage to sessionStorage */
    public static Set<T>(sender: string, receiver: string, response: T): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);
        storage = { 
            ...storage, 
            responsePage: { sender, receiver, response }
        };

        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }


    /** Gets the responsePage from sessionStorage */
    public static Get<T>(): { sender: string; receiver: string;  response: T | null } {
        let storage = sessionStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);

            return storage?.responsePage || null;
        }

        return { 
            sender: '', 
            receiver: '', 
            response: null 
        }
    }


    /** Remove the responsePage from sessionStorage */
    public static Remove(): void {
        let storage = sessionStorage.getItem(this.storage) as any;
        storage = JSON.parse(storage);

        if(Tools.IsNotNull(storage)) {
            if (storage.hasOwnProperty('responsePage')) {
                delete storage.responsePage;
            }
    
            storage = { ...storage };
            sessionStorage.setItem(this.storage, JSON.stringify(storage));
        }
    }
}