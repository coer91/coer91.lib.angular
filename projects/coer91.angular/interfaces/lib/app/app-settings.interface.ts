import { IEnvironments } from "./environments.interface";

export interface IAppSettings {
    appInfo: {
        id: number;
        project: string;
        title: string;
        version: string;
        imageURL: string;
        forCompany: string;
    }, 
    environment: IEnvironments;
    background: {
        home: string;
        login: string;
    },
    security: {
        useJWT: boolean;
    }
    region: {
        dateTime: 'MDY' | 'DMY';
        language: 'es' | 'en';
        currencyCode: 'MXN' | 'USD' | 'CAD' | 'EUR' | 'KRW' | 'CNY';
        currency: '$' | '€' | '₩' | '¥';
    },
    navigation: {
        static: boolean; 
        showHome: boolean; 
        redirectTo: string;
    }
}