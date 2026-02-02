import { Tools } from "./generic";
 
export class Strings { 


    /** Sets the first character to lowercase */
    public static FirstCharToLower(value: string | number | null | undefined): string {
        return (Tools.IsNotOnlyWhiteSpace(value)) 
            ? String(value).charAt(0).toLowerCase() + String(value).slice(1)
            : ''; 
    }


    /** Sets the first character to uppercase */
    public static FirstCharToUpper(value: string | number | null | undefined): string {
        return (Tools.IsNotOnlyWhiteSpace(value)) 
            ? String(value).charAt(0).toUpperCase() + String(value).slice(1)
            : '';
    }


    /** Clean extra whitespaces */
    public static CleanUpBlanks(value: string | number | null | undefined): string {
        return value && Tools.IsNotOnlyWhiteSpace(value) 
            ? String(value).replace(/\s+/g, ' ').trim()
            : ''; 
    }


    /** Apply title formatting */
    public static ToTitle(value: string | number | null | undefined): string {
        return (Tools.IsNotOnlyWhiteSpace(value)) 
            ? String(value).split(' ').filter(x => x.length > 0).map(x => Strings.FirstCharToUpper(x.toLowerCase())).join(' ')
            : ''; 
    }


    /** Removes the last character */
    public static RemoveLastChar(value: string | number | null | undefined): string {
        return Tools.IsNotOnlyWhiteSpace(value)
            ? String(value).trimEnd().slice(0, -1)
            : '';
    } 


    /** Removes accents */
    public static RemoveAccents(value: string | number | null | undefined, except: string[] = []): string { 
        if(Tools.IsOnlyWhiteSpace(value)) return ''; 

        if (except.length > 0) {
            let index = 0;
            const mapValue = new Map<number, string>();
            for(const char of String(value)) { 
                mapValue.set(index++, char);
            }
    
            index = 0;
            const mapNormalize = new Map<number, string>();
            for(const char of String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {
                mapNormalize.set(index++, char);
            }    
                         
            for (const char of except) {
                for (const [index, value] of mapValue.entries()) {
                    if (value === char) {
                        mapNormalize.set(index, char);
                    }
                }
            } 

            return Array.from(mapNormalize.values()).join('');
        }

        else {
            return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        } 
    }


    /** Removes special characters */
    public static RemoveSpecialCharacters(value: string | number | null | undefined): string {
        return (Tools.IsNotOnlyWhiteSpace(value)) 
            ? String(value).replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]/g , '') : ''; 
    }


    /** Only Alphanumeric */
    public static OnlyAlphanumeric(value: string | number | null | undefined): string {
        return (Tools.IsNotOnlyWhiteSpace(value)) 
            ? String(value).replace(/[^a-zA-Z0-9\s]/g , '') : ''; 
    }


    /** Only Alphanumeric */
    public static OnlyNumbers(value: string | number | null | undefined): string {
        return (Tools.IsNotOnlyWhiteSpace(value)) 
            ? String(value).replace(/[^0-9.]/g , '') : ''; 
    }


    /** Validates if both strings are equal */
    public static Equals(value: string | number | null | undefined, value2: string | number | null | undefined, sensitive: boolean = false): boolean {
        if(typeof value === null && typeof value2 === null) return true;
        if(typeof value === 'undefined' && typeof value2 === 'undefined') return true;

        if(typeof value === 'string' && typeof value2 === 'string') {
            if (!sensitive) {
                value  = value.toUpperCase();
                value2 = value2.toUpperCase(); 
            }
            
            return value.length === value2.length
                && value === value2;
        } 
    
        return false;
    }


    /**  */
    public static ConcatName(...args: string[]): string {
        return args.map(Strings.CleanUpBlanks).filter(Tools.IsNotOnlyWhiteSpace).join(' ');
    }
}