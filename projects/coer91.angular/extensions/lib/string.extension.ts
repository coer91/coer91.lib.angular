import { Strings, Tools } from "coer91.angular/tools";


declare global {
    interface String {

        /** Sets the first character to lowercase */
        firstCharToLower(): string;

        /** Sets the first character to uppercase */
        firstCharToUpper(): string;

        /** Clean extra whitespaces */
        cleanUpBlanks(): string;

        /** Apply title formatting */
        toTitle(): string;

        /** Removes the last character */
        removeLastChar(): string; 

        /** Removes accents */
        removeAccents(except?: string[]): string;  
        
        /** Removes special characters */
        removeSpecialCharacters(): string; 
        
        /** Only alphaNumeric */
        onlyAlphanumeric(): string; 

        /** Only Numbers */
        onlyNumbers(): string;

        /** Validates if both strings are equal */
        equals(value: string | number | null | undefined, sensitive?: boolean): boolean;

        /** Returns true if the value is null or undefined or contains only whitespace, false otherwise */
        isOnlyWhiteSpace(): boolean;

        /** Returns true if has string value and is not only whitespace, false otherwise */
        isNotOnlyWhiteSpace(): boolean; 

        /** */
        concatName(...args: string[]): string; 
    }
}


String.prototype.firstCharToLower = function(): string {
    return Strings.FirstCharToLower(this.toString());
}

String.prototype.firstCharToUpper = function(): string {
    return Strings.FirstCharToUpper(this.toString());
}

String.prototype.cleanUpBlanks = function(): string {
    return Strings.CleanUpBlanks(this.toString());
}

String.prototype.toTitle = function(): string {
    return Strings.ToTitle(this.toString());
}

String.prototype.removeLastChar = function(): string {
    return Strings.RemoveLastChar(this.toString());
}

String.prototype.removeAccents = function(except: string[] = []): string { 
    return Strings.RemoveAccents(this.toString(), except);
}

String.prototype.removeSpecialCharacters = function(): string { 
    return Strings.RemoveSpecialCharacters(this.toString());
}

String.prototype.onlyAlphanumeric = function(): string { 
    return Strings.OnlyAlphanumeric(this.toString());
}

String.prototype.onlyNumbers = function(): string { 
    return Strings.OnlyNumbers(this.toString());
};

String.prototype.equals = function(value: string | number | null | undefined, sensitive: boolean = false): boolean {  
    return Strings.Equals(this.toString(), value, sensitive);
} 

String.prototype.isOnlyWhiteSpace = function(): boolean {
    return Tools.IsOnlyWhiteSpace(this);
}

String.prototype.isNotOnlyWhiteSpace = function(): boolean {
    return Tools.IsNotOnlyWhiteSpace(this);
}

String.prototype.concatName = function(...args: string[]): string {
    return Strings.ConcatName(this.toString(), ...args);
}

export {};