import { IPatch } from "./patch.interface";

export interface IHttpRequest<T> {
    url: string;
    body?: T | IPatch[] | {};
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    queryParams?: { 
        param: string, 
        value: string | number | Date | boolean | null | undefined 
    }[];
    headers?: { 
        header: string, 
        value: string | number | null | undefined 
    }[]; 
}