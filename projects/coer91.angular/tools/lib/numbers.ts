/** Provides several methods for string manipulation */
export class Numbers {  

    /** */
    public static IsNumber(value: any): boolean {
        return !Number.isNaN(Number(value));
    }


    /** */
    public static IsNotNumber(value: any): boolean {
        return !this.IsNumber(value);
    }


    /** */
    public static SetDecimals(value: string | number | null | undefined, decimals: number = 2): string {
        if(typeof value === 'string') value = Number(value);
        if (this.IsNotNumber(value)) return '0';

        let valueInteger = '';
        let valueDecimal = '';
        value = String(value);        

        if (value.includes('.') || (decimals > 0)) {
            valueInteger = value.includes('.') ? value.split('.')[0] : value;

            if (decimals > 0) { 
                valueDecimal = value.includes('.') ? value.split('.')[1] : '';
                for(let i = 0; i < decimals; i++) valueDecimal += '0';
                valueDecimal = valueDecimal.substring(0, decimals);
                valueDecimal = `.${valueDecimal}`;
            }
        }

        else {
            valueInteger = value;
        }
       
        return `${valueInteger}${valueDecimal}`;
    }


    /** */
    public static ToNumericFormat(value: string | number | null | undefined, decimals: number = 0): string {
        const [INTEGER, DECIMAL = ''] = this.SetDecimals(value).split('.');

        return decimals > 0
            ? `${INTEGER.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${DECIMAL}`
            : INTEGER.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    
    /** */
    public static ToCurrency(value: string | number | null | undefined, symbol: string = '$', currency: string = ''): string { 
        return `${symbol}${this.ToNumericFormat(value, 2)}${currency.length > 0 ? ` ${currency}` : ''}`;
    }
}