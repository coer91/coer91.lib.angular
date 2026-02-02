import { IEnvironments } from "./environments.interface";

export interface IAppSettings {
    appInfo: {
        id: number;
        project: string;
        title: string;
        version: string;
        imageURL: string;
        byCompany: string;
    }, 
    environment: IEnvironments;
    security: {
        useJWT: boolean;
    }
    dateTime: {
        format: 'MDY' | 'DMY';
    },
    navigation: {
        static: boolean; 
    }
}