import { Collections } from "coer91.angular/tools";

declare global {
    interface Array<T> { 

        /** */
        setIndex(...args: T[][]): T[];

        /** */
        setId(...args: T[][]): T[];

        /** */
        distinct(): T[]; 

        /** */
        except(exceptions: T[], property?: string): T[];
        
        /** */
        intercept(array: T[], property?: string): T[];

        /** */
        sortAsc(property?: string): T[];

        /** */
        sortDesc(property?: string): T[];

        /** */
        search(text: string, properties?: string[]): T[];
    }
}  


Array.prototype.setIndex = function<T>(...args: T[][]): T[] {
    return Collections.SetIndex([...this], args);   
}


Array.prototype.setId = function<T>(...args: T[][]): T[] {
    return Collections.SetId([...this], args);   
}


Array.prototype.distinct = function<T>(): T[] {
    return Collections.Distinct(this);   
} 


Array.prototype.except = function<T>(exceptions: T[], property: string | null = null): T[] {
    return Collections.Except(this, exceptions, property);   
} 


Array.prototype.intercept = function<T>(array: T[], property: string | null = null): T[] {
    return Collections.Intercept(this, array, property);   
} 


// Array.prototype.sortAsc = function<T>(property: string | null = null): T[] {
//     return Collections.SortAsc(this, property);   
// }


// Array.prototype.sortDesc = function<T>(property: string | null = null): T[] {
//     return Collections.SortDesc(this, property);   
// }


// Array.prototype.search = function<T>(text: string, properties: string[] = []): T[] {
//     return Collections.Search(this, text, properties);   
// }


export {};