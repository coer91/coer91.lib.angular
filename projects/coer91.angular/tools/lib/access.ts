import { Tools } from "./generic";
import { Dates } from "./dates";
import { WritableSignal } from "@angular/core";
import { IJWT, IUser } from "coer91.angular/interfaces";
declare const appSettings: any;

/** Controls user information in localStorage */
export class Access {
      
    private static readonly useJWT  = Tools.IsBooleanTrue(appSettings?.security?.useJWT);
    private static readonly storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';
    
    /** */    
    public static SetUser(user: string | IUser | null): void {  
        if(user && !Tools.IsString(user) && user.hasOwnProperty('message')) {
            const _user = Object.assign({}, user) as any;
            delete _user['message'];
            localStorage.setItem(this.storage, JSON.stringify({ user: _user }));
        }

        else {
            localStorage.setItem(this.storage, JSON.stringify({ user }));
        }
    }
     

    /** */
    public static GetUser(): IUser | null {
        if(this.useJWT) {
            const JWT = Access.GetJWTInfo();

            if(JWT.claims?.hasOwnProperty('User')) {
                return { 
                    UserId:     Number(JWT.claims?.UserId     || 0 ),
                    User:       String(JWT.claims?.User       || ''), 
                    PartnerId:  Number(JWT.claims?.partnerId  || 0),
                    Partner:    String(JWT.claims?.Partner    || ''),
                    FullName:   String(JWT.claims?.FullName   || ''), 
                    Email:      String(JWT.claims?.Email      || ''),
                    JWT:        JWT.jwt,
                    Roles:      String(JWT.claims?.Roles      || '').replaceAll('[', '').replaceAll(']', '').split(','),
                    Language:   String(JWT.claims?.Language   || ''),
                }
            }  
        }

        else {
            let storage = localStorage.getItem(this.storage) as any;

            if (storage) {
                storage = JSON.parse(storage);

                if (storage.hasOwnProperty('user')) {
                    return storage.user; 
                } 
            }       
        }

        return null;
    }


    /** */
    public static RememberUser(): string {
        if(this.useJWT) {
            const CLAIMS = Access.GetJWTInfo().claims;
    
            if(CLAIMS.hasOwnProperty('User')) {
                return String(CLAIMS?.User || '');
            }
        }
        
        let storage = localStorage.getItem(this.storage) as any;

        if (storage) {
            storage = JSON.parse(storage);
            
            if (storage.hasOwnProperty('user')) {
                return Tools.IsString(storage.user) 
                    && (String(storage.user).length <= 50)
                    ? storage.user 
                    : (storage.user?.user || ''); 
            } 
        }

        return '';
    }
     

    /** */
    public static IsLogin(): boolean { 
        if(this.useJWT) {
            const JWT = Access.GetJWTInfo();
            return Tools.IsNotOnlyWhiteSpace(JWT.claims?.User) 
                && Tools.IsNotOnlyWhiteSpace(JWT.claims?.ExpirationDate) 
                && JWT.minutes > 0; 
        }

        else {
            const user = Access.GetUser();
            return Tools.IsNotNull(user) 
                && Tools.IsNotOnlyWhiteSpace(user?.User);
        }
    }  


    /** */
    public static LogOut(userSIGNAL: WritableSignal<IUser | null>): void {
        userSIGNAL.set(null);

        const user = this.useJWT
            ? Access.GetJWTInfo()?.claims?.User || '' 
            : Access.GetUser()?.User || ''; 

        sessionStorage.removeItem(this.storage);
        localStorage.removeItem(this.storage); 
        localStorage.setItem(this.storage, JSON.stringify({ user }));
            
        if(document.location.href.includes('#')) {
            document.location.href = '/#/';
        }

        else document.location.href = '/';
    }


    /** */
    public static GetJWTInfo(): IJWT {     
        if(this.useJWT) {
            let storage = localStorage.getItem(this.storage) as any;
    
            if (storage) {
                storage = JSON.parse(storage);
                
                if (storage.hasOwnProperty('user') && Tools.IsString(storage.user)) {
                    const JWT = storage.user.split('.');  
    
                    if(JWT.length === 3) {
                        const CLAIMS = JSON.parse(atob(JWT[1].replace(/-/g, '+').replace(/_/g, '/')));
    
                        if(CLAIMS.hasOwnProperty('ExpirationDate')) {
                            return {
                                jwt: storage.user,
                                minutes: Dates.GetDiff(CLAIMS.ExpirationDate, Dates.GetCurrentUTCDate(), 'minutes'),
                                claims: CLAIMS
                            };
                        } 
                    } 
                }  
            }
        }

        return {
            jwt: '',
            minutes: 0,
            claims: {}
        };
    } 
} 


/** Get webAPI from appSettings */
export const GetAppSettings = <T>(environment: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION'): T => {
    let webAPI: any = {};

    switch(environment) { 
        case 'DEVELOPMENT': 
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.development || null },
                environment: {
                    info: environment,
                    isDevelopment: true,
                    isStaging:     false,
                    isProduction:  false
                }
            });
        break;

        case 'STAGING': 
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.staging || null },
                environment: {
                    info: environment,
                    isDevelopment: false,
                    isStaging:     true,
                    isProduction:  false
                }
            });
        break;

        case 'PRODUCTION': 
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.production || null }, 
                environment: { 
                    info: environment,
                    isDevelopment: false,
                    isStaging:     false,
                    isProduction:  true
                }
            });
        break;
    }  

    return {
        ...appSettings,
        appInfo: {
            id: 0,
            project: '',
            title:   'COER 91',
            version: '0.0.0',
            company: 'COER System',
            ...appSettings?.appInfo
        },
        ...webAPI,
        background: {
            home:  '',
            login: '',
            ...appSettings?.background
        },
        security: {
            useJWT: false,
            ...appSettings?.security
        },
        region: {
            dateTime:     'MDY', 
            language:     'en',
            currencyCode: 'MXN',
            currency:     '$',
            ...appSettings?.dateTime
        },
        navigation: {
            static:    true, 
            showHome:   true, 
            redirectTo: 'home',
            ...appSettings?.navigation
        } 
    } 
}