import { CoerAlert } from "./coer-alert/coer-alert.component";

class _Transactions {
    static transactions = new Map<string, ReturnType<typeof setTimeout>>();
}

export const Tools = {

    /** Generates a guid */
    GetGuid: (seed: string = 'coer91'): string => {
        let time = new Date().getTime();
        seed = seed.toString().trim()
        return seed + `-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
            const random = (time + Math.random() * 16) % 16 | 0
            time = Math.floor(time / 16)
            return (c == 'x' ? random : (random & 0x3 | 0x8)).toString(16)
        })
    },


    /** Returns true if the value is null or undefined, false otherwise */
    IsNull: (value: any): boolean => {
        return (value === undefined || value === null);
    },


    /** Returns true if the value is not null or undefined, false otherwise */
    IsNotNull: (value: any): boolean => {
        return !Tools.IsNull(value); 
    },


    /** Returns true if the value is null or undefined or is an empty string or contains only whitespace, false otherwise */
    IsOnlyWhiteSpace: (value: any): boolean => {
        return Tools.IsNull(value) || (typeof value === 'string' && value.trim() === '');
    },


    /** Returns true if it has a string value and is not all whitespace, false otherwise */
    IsNotOnlyWhiteSpace: (value: any): boolean => {
        return Tools.IsNotNull(value) && !Tools.IsOnlyWhiteSpace(value); 
    },


    /** Break reference of a object or array */
    BreakReference: <T>(object: T): T => { 
        if (Tools.IsNull(object) || ['string', 'number', 'boolean', 'function', 'symbol', 'bigint'].includes(typeof object)) return object; 
        return JSON.parse(JSON.stringify(object)) as T;
    }, 
      

    /** Get properties of an object */
    GetPropertyList: (object: object | null | undefined): string[] => {
        return Tools.IsNotNull(object) && typeof object === 'object' && !Array.isArray(object) 
            ? Object.keys(object!) 
            : [];
    }, 


    /** */
    HasProperty: (object: any, property: string): boolean => {
        return Tools.GetPropertyList(object).includes(property);
    }, 


    /** */
    IsBoolean: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'boolean'
            : Tools.HasProperty(object, property) && (typeof object[property] === 'boolean'); 
    }, 


    /** */
    IsBooleanTrue: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? Tools.IsBoolean(object) && object === true
            : Tools.HasProperty(object, property) && (typeof object[property] === 'boolean') && object[property] === true;        
    },


    /** */
    IsBooleanFalse: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? Tools.IsBoolean(object) && object === false
            : Tools.HasProperty(object, property) && (typeof object[property] === 'boolean') && object[property] === false;        
    },


    /** */
    IsString: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'string'
            : Tools.HasProperty(object, property) && (typeof object[property] === 'string'); 
    },


    /** */
    IsFunction: (object: any, property: string = ''): boolean => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'function'
            : Tools.HasProperty(object, property) && (typeof object[property] === 'function'); 
    },     


    /** Wait the time indicated */
    Sleep: (milliseconds: number = 0, transactionName: string = ''): Promise<void> => {
        return new Promise(Resolve => { 
            if(Tools.IsNotOnlyWhiteSpace(transactionName)) { 
                const transaction = _Transactions.transactions.get(transactionName);                          
                if (transaction) clearTimeout(transaction); 
                
                _Transactions.transactions.set(transactionName, setTimeout(
                    () => {
                        Resolve();
                        _Transactions.transactions.delete(transactionName);  
                    }, milliseconds)
                );
            }

            else {
                setTimeout(Resolve, milliseconds);
            } 
        });                 
    },


    /** Send text to the computer's clipboard */
    Clipboard: (text: string, message: string = '', title: string = 'Copied'): void => {
        try {
            navigator.clipboard.writeText(text.trim()).then(() => {
                new CoerAlert().Information(message, title, 'i91-clipboard-fill');
            }); 
        } 
        
        catch {  
            new CoerAlert().Warning('Unable to copy to clipboard', 'Quick Implement', 'i91-clipboard-fill');
        }        
    }
};