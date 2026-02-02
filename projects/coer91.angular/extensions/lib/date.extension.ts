import { Dates } from "coer91.angular/tools";

 

declare global {
    interface Date { 

        /** */
        getOffset(): number; 

        /** */
        isValidDate(): boolean; 

        /** */
        getLastDayOfMonth(): number;       

        /** */
        getCurrentDate(): Date;

        /** */
        getCurrentUTCDate(): Date;

        /** Convert UTC Date to Local Zone */
        toLocalZone(): Date;

        /** Convert Local Zone Date to UTC */
        toUTC(): Date;

        /** YYYY-MM-DD HH:mm:ss */
        toFormatDB(): string;

        /** */
        toFormatDate(format?: 'MDY' | 'DMY' | 'YMD'): string;

        /** */
        toFormatDateTime(ampm?: boolean, format?: 'MDY' | 'DMY' | 'YMD'): string;

        /** YYYY-MM-DD */ 
        toDateOnly(): string;

        /** */
        addMilliseconds(milliseconds: number): Date;

        /** */
        addSeconds(seconds: number): Date;

        /** */
        addMinutes(minutes: number): Date;

        /** */
        addHours(hours: number): Date;

        /** */
        addDays(days: number): Date;

        /** */
        addWeeks(weeks: number): Date;

        /** */
        addMonths(months: number): Date;

        /** */
        addYears(years: number): Date;

        /** */
        setMillisecond(millisecond?: number): Date;

        /** */
        setSecond(second?: number): Date;

        /** */
        setMinute(minute?: number): Date;

        /** */
        setHour(hour?: number): Date;

        /** */
        setFirstHour(): Date;

        /** */
        setLastHour(): Date;

        /** */
        setDay(day?: number): Date;

        /** */
        setFirstDay(): Date;

        /** */
        setLastDay(): Date;

        /** */
        getDiffNow(unit?: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days', isUTC?: boolean): number;

        /** */
        getDiff(date: string | Date, unit?: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days'): number;
    }
}  


Date.prototype.getOffset = function(): number {
    return Dates.GetOffset();   
}

Date.prototype.isValidDate = function(): boolean {
    return Dates.IsValidDate(this);   
}

Date.prototype.getLastDayOfMonth = function(): number {
    return Dates.GetLastDayOfMonth(this);   
} 

Date.prototype.getCurrentDate = function(): Date {
    return Dates.GetCurrentDate();   
}

Date.prototype.getCurrentUTCDate = function(): Date {
    return Dates.GetCurrentUTCDate();   
}

Date.prototype.toLocalZone = function(): Date {
    return Dates.ToLocalZone(this);   
}

Date.prototype.toUTC = function(): Date {
    return Dates.ToUTC(this);   
}

Date.prototype.toFormatDB = function(): string {
    return Dates.ToFormatDB(this);   
}

Date.prototype.toFormatDate = function(format?: 'MDY' | 'DMY'): string {
    return Dates.ToFormatDate(this, format);   
}

Date.prototype.toFormatDateTime = function(ampm: boolean = true, format?: 'MDY' | 'DMY'): string {
    return Dates.ToFormatDateTime(this, ampm, format);   
}

Date.prototype.toDateOnly = function(): string {
    return Dates.ToDateOnly(this);   
}

Date.prototype.addMilliseconds = function(milliseconds: number = 1): Date {
    return Dates.AddMilliseconds(this, milliseconds);   
}

Date.prototype.addSeconds = function(seconds: number = 1): Date {
    return Dates.AddSeconds(this, seconds);   
}

Date.prototype.addMinutes = function(minutes: number = 1): Date {
    return Dates.AddMinutes(this, minutes);   
}

Date.prototype.addHours = function(hours: number = 1): Date {
    return Dates.AddHours(this, hours);   
}

Date.prototype.addDays = function(days: number = 1): Date {
    return Dates.AddDays(this, days);   
}

Date.prototype.addWeeks = function(weeks: number = 1): Date {
    return Dates.AddWeeks(this, weeks);   
} 

Date.prototype.addMonths = function(months: number = 1): Date {
    return Dates.AddMonths(this, months);   
}

Date.prototype.addYears = function(years: number = 1): Date {
    return Dates.AddYears(this, years);   
}

Date.prototype.setMillisecond = function(millisecond: number = 0): Date {
    return Dates.SetMillisecond(this, millisecond);   
}

Date.prototype.setSecond = function(second: number = 0): Date {
    return Dates.SetSecond(this, second);
}

Date.prototype.setMinute = function(minute: number = 0): Date {
    return Dates.SetMinute(this, minute);
}
 
Date.prototype.setHour = function(hour: number = 0): Date {
    return Dates.SetHour(this, hour);
}
 
Date.prototype.setFirstHour = function(): Date {
    return Dates.SetFirstHour(this);
}
 
Date.prototype.setLastHour = function(): Date {
    return Dates.SetLastHour(this);
}

Date.prototype.setDay = function(day: number = 1): Date {
    return Dates.SetDay(this, day);
}

Date.prototype.setFirstDay = function(): Date {
    return Dates.SetFirstDay(this);
}

Date.prototype.setLastDay = function(): Date {
    return Dates.SetLastDay(this);
}

Date.prototype.getDiffNow = function(unit: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' = 'minutes', isUTC: boolean = true): number {
    return Dates.GetDiffNow(this, unit, isUTC);
}

Date.prototype.getDiff = function(date: string | Date, unit: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' = 'minutes'): number {
    return Dates.GetDiff(this, date, unit);
}

export {}; 