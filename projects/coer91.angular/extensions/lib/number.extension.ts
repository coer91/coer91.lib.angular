import { Numbers } from "coer91.angular/tools";

declare global {
    interface Number { 

        /** */
        setDecimals(decimals?: number): string; 

        /** */
        toNumericFormat(decimals?: number): string; 

        /** */
        toCurrency(symbol?: string, currency?: string): string; 
    }
}  


Number.prototype.setDecimals = function(decimals: number = 2): string {
    return Numbers.SetDecimals(Number(this), decimals);   
}

Number.prototype.toNumericFormat = function(decimals: number = 0): string {
    return Numbers.ToNumericFormat(Number(this), decimals);   
}

Number.prototype.toCurrency = function(symbol: string = '$', currency: string = ''): string {
    return Numbers.ToCurrency(Number(this), symbol, currency);   
}

export {};