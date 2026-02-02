import { Tools } from "./generic";
import { Numbers } from "./numbers";
import { Strings } from "./strings";
declare const appSettings: any;

export class Dates {
    
    public static readonly MONTHS = new Map<number, string>([
        [1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr' ], [5, 'May' ], [6, 'Jun' ],
        [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec'],
    ]);

    
    /** */
    public static GetOffset(): number {
        return -(new Date().getTimezoneOffset());
    }


    /** */
    public static IsValidDate(date: string | Date): boolean {   
        return !isNaN(new Date(date).getTime());
    }


    /** */
    public static ToDate(date: string | Date): Date {  
        if (Tools.IsOnlyWhiteSpace(date)) return null as any as Date;

        if(typeof date === 'string') { 
            date = Strings.CleanUpBlanks(date.replace(/(?:at|AT|t|T)/g, ' '));
            date = /\b([01]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?\b/.test(date) ? new Date(date) : new Date(`${date} 00:00:00`);
            return this.IsValidDate(date) ? date : null as any as Date;
        }

        else return date; 
    } 


    /** */
    public static GetLastDayOfMonth(date: string | Date): number {
        const DATE = this.ToDate(date); 
        return Tools.IsNotNull(DATE) ?
            new Date(DATE!.getFullYear(), DATE!.getMonth() + 1, 0).getDate()
            : -1;
    }


    /** */
    public static GetCurrentDate(): Date {  
        return new Date();
    }


    /** */
    public static GetCurrentUTCDate(): Date {  
        return this.AddHours(new Date(), -(this.GetOffset() / 60));
    }  


    /** */
    public static ToLocalZone(utcDate: string | Date): Date { 
        const DATE = this.ToDate(utcDate); 
        return Tools.IsNotNull(DATE) 
            ? new Date(new Date(utcDate).getTime() + this.GetOffset() * 60000)
            : null as any;
    }


    /** */
    public static ToUTC(date: string | Date): Date { 
        const DATE = this.ToDate(date); 
        return Tools.IsNotNull(DATE)  
            ? new Date(new Date(date).getTime() - this.GetOffset() * 60000)
            : null as any; 
    }


    /** YYYY-MM-DD HH:mm:ss */ 
    public static ToFormatDB(date: string | Date): string { 
        const DATE = this.ToDate(date);
        if(Tools.IsNull(DATE)) return '';
        
        return `${DATE.getFullYear()}` + '-' 
            +  `${DATE.getMonth() + 1}`.padStart(2, '0') + '-' 
            +  `${DATE.getDate()}`.padStart(2, '0') + ' '  
            +  `${DATE.getHours()}`.padStart(2, '0') + ':'
            +  `${DATE.getMinutes()}`.padStart(2, '0') + ':'
            +  `${DATE.getSeconds()}`.padStart(2, '0')
    } 


    /** MMM DD, YYYY */
    private static ToFormatDateMDY(date: string | Date): string {  
        const DATE = this.ToDate(date); 
        if(Tools.IsNull(DATE)) return '';

        return `${this.MONTHS.get(DATE.getMonth() + 1)}` + ' ' 
            +  `${DATE.getDate()}`.padStart(2, '0') + ', ' 
            +  `${DATE.getFullYear()}`;             
    }


    /** DD MMM YYYY */
    private static ToFormatDateDMY(date: string | Date): string {  
        const DATE = this.ToDate(date); 
        if(Tools.IsNull(DATE)) return '';

        return `${DATE.getDate()}`.padStart(2, '0') + ' ' 
            +  `${this.MONTHS.get(DATE.getMonth() + 1)}` + ' ' 
            +  `${DATE.getFullYear()}`;             
    } 


    /** */
    public static ToFormatDate(date: string | Date, format?: 'MDY' | 'DMY'): string {  
        const DATE = this.ToDate(date); 
        if(Tools.IsNull(DATE)) return '';

        if(Tools.IsOnlyWhiteSpace(format)) {
            format = Tools.IsNotNull(appSettings)
                && Tools.IsNotNull(appSettings?.dateTime)
                && Tools.IsNotOnlyWhiteSpace(appSettings?.dateTime?.format)
                ? appSettings?.dateTime?.format : 'MDY';
        } 

        if(format == 'DMY') return this.ToFormatDateDMY(date);
        else return this.ToFormatDateMDY(date);
    }


    /** YYYY-MM-DD */ 
    public static ToDateOnly(date: string | Date): string { 
        const DATE = this.ToDate(date);
        if(Tools.IsNull(DATE)) return ''; 
         
        return `${DATE.getFullYear()}` + '-' 
            +  `${DATE.getMonth() + 1}`.padStart(2, '0') + '-' 
            +  `${DATE.getDate()}`.padStart(2, '0');
    }


    /** */
    public static ToFormatTime(date: string | Date, ampm: boolean = false): string {  
       const DATE = this.ToDate(date);
       if(Tools.IsNull(DATE)) return '';

        if(ampm) {
            let hours = DATE.getHours();
            const AM_PM = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours === 0 ? 12 : hours; 

            return `${hours}`.padStart(2, '0') + ':'
                +  `${DATE.getMinutes()}`.padStart(2, '0') + ' '
                +  `${AM_PM}`;
        } 

        else {
            return `${DATE.getHours()}`.padStart(2, '0') + ':'
                +  `${DATE.getMinutes()}`.padStart(2, '0');
        }
    }


    /** */
    public static ToFormatDateTime(date: string | Date, ampm: boolean = false, format?: 'MDY' | 'DMY'): string { 
        return Tools.IsNotOnlyWhiteSpace(date) 
            ? (this.ToFormatDate(date, format) + ' at ' + this.ToFormatTime(date, ampm))
            : '';
    }  
    

    /** */
    public static AddMilliseconds(date: string | Date, milliseconds: number): Date {
        return new Date(this.ToDate(date).getTime() + milliseconds);
    }


    /** */
    public static AddSeconds(date: string | Date, seconds: number = 1): Date {
        return this.AddMilliseconds(date, seconds * 1000);
    }


    /** */
    public static AddMinutes(date: string | Date, minutes: number = 1): Date {
        return this.AddMilliseconds(date, minutes * 60 * 1000);
    }


    /** */
    public static AddHours(date: string | Date, hours: number = 1): Date {
        return this.AddMilliseconds(date, hours * 60 * 60 * 1000);
    }


    /** Add days */
    public static AddDays(date: string | Date, days: number = 1): Date {
        return this.AddMilliseconds(date, days * 24 * 60 * 60 * 1000);
    }


    /** Add weeks */
    public static AddWeeks(date: string | Date, weeks: number = 1): Date {
        return this.AddMilliseconds(date, weeks * 7 * 24 * 60 * 60 * 1000);
    }


    /** Add months */
    public static AddMonths(date: string | Date, months: number = 1): Date {
        const DATE = this.ToDate(date);        
        const DATE_UPDATED = new Date(DATE.getFullYear(), (DATE.getMonth() + months), 1);   
        DATE_UPDATED.setDate(Math.min(DATE.getDate(), new Date(DATE_UPDATED.getFullYear(), (DATE_UPDATED.getMonth() + 1), 0).getDate())); 
        DATE_UPDATED.setHours(DATE.getHours(), DATE.getMinutes(), DATE.getSeconds(), DATE.getMilliseconds());
        return DATE_UPDATED;
    }


    /** Add years */
    public static AddYears(date: string | Date, years: number = 1): Date {
        const DATE = this.ToDate(date); 
        const DATE_UPDATED = new Date((DATE.getFullYear() + years), DATE.getMonth(), 1); 
        DATE_UPDATED.setDate(Math.min(DATE.getDate(), new Date(DATE_UPDATED.getFullYear(), DATE_UPDATED.getMonth() + 1, 0).getDate())); 
        DATE_UPDATED.setHours(DATE.getHours(), DATE.getMinutes(), DATE.getSeconds(), DATE.getMilliseconds());
        return DATE_UPDATED;
    }


    /** */
    public static SetMillisecond(date: string | Date, millisecond: number = 0): Date {
        const DATE = this.ToDate(date);

        if (millisecond < 0 || millisecond >= 1000) {
            millisecond = DATE.getMilliseconds();
        }

        DATE.setMilliseconds(millisecond);
        return DATE;
    }


    /** */
    public static SetSecond(date: string | Date, second: number  = 0): Date {
        const DATE = this.ToDate(date);

        if (second < 0 || second >= 60) {
            second = DATE.getSeconds(); 
        }

        DATE.setSeconds(second);
        return DATE;
    }


    /** */
    public static SetMinute(date: string | Date, minute: number = 0): Date {
        const DATE = this.ToDate(date);
         
        if (minute < 0 || minute >= 60) {
            minute = DATE.getMinutes();  
        } 

        DATE.setMinutes(minute, DATE.getSeconds());  
        return DATE;
    } 


    /** */
    public static SetHour(date: string | Date, hour: number  = 0): Date {   
        const DATE = this.ToDate(date); 

        if (hour < 0 || hour >= 24) {
            hour = DATE.getHours();  
        } 

        DATE.setHours(hour, DATE.getMinutes(), DATE.getSeconds()); 
        return DATE;
    }  


    /** Set 00:00:00 */
    public static SetFirstHour(date: string | Date): Date {   
        const DATE = this.ToDate(date);
        DATE.setHours(0, 0, 0);
        return DATE;
    }


    /** Set 23:59:59 */
    public static SetLastHour(date: string | Date): Date {     
        const DATE = this.ToDate(date);
        DATE.setHours(23, 59, 59);
        return DATE;
    } 


    /** */
    public static SetDay(date: string | Date, day: number = 1): Date {
        const DATE = this.ToDate(date); 

        if (day < 1 || day > this.GetLastDayOfMonth(DATE)) {
            day = DATE.getDate();
        }

        DATE.setDate(day);
        return DATE;
    } 


    /** */
    public static SetFirstDay(date: string | Date): Date {   
        return this.SetDay(date, 1);
    }


    /**  */
    public static SetLastDay(date: string | Date): Date { 
        return this.SetDay(date, this.GetLastDayOfMonth(date));
    }


    /** */
    public static GetDiffNow(  
        date: string | Date,  
        unit: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' = 'minutes',
        isUTC: boolean = true
    ): number {  
        return this.GetDiff((isUTC ? this.GetCurrentUTCDate() : this.GetCurrentDate()), date, unit);
    }


    /** */
    public static GetDiff(
        fromDate: string | Date, 
        toDate:   string | Date,  
        unit: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' = 'minutes'
    ): number {  
        switch (unit) {
            case 'milliseconds': return Number(Numbers.SetDecimals(this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime(), 0));
            case 'seconds':      return Number(Numbers.SetDecimals((this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime()) / 1000, 0));
            case 'minutes':      return Number(Numbers.SetDecimals((this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime()) / (1000 * 60), 0));
            case 'hours':        return Number(Numbers.SetDecimals((this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime()) / (1000 * 60 * 60), 0));
            case 'days':         return Number(Numbers.SetDecimals((this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime()) / (1000 * 60 * 60 * 24), 0)); 
        }
    } 
}