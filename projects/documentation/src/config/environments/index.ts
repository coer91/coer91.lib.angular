import { GetAppSettings } from "coer91.angular/tools";
import { IAppSettings } from "coer91.angular/interfaces"; 
import { ENVIRONMENT } from "./env.development";
export * from '../app.service';

interface IAppEnvironment extends IAppSettings { 
    webAPI: {
        mySystem: string; 
    }
} 

export const appSettings = GetAppSettings<IAppEnvironment>(ENVIRONMENT);