import { ActivatedRouteSnapshot, CanActivateFn, Route, RouterStateSnapshot, Routes } from "@angular/router";
import { isLoadingSIGNAL, navigationSIGNAL, userSIGNAL } from "coer91.angular/signals";
import { Access, CoerAlert, Tools } from "coer91.angular/tools";
import { IActiveKey } from "coer91.angular/interfaces";
import { HomePage } from "./home/home.component";
import { MenuPage } from "./menu/menu.component";
import { Type } from "@angular/core";
declare const appSettings: any;  


/** */
export const LoginGuard: CanActivateFn = () => { 
    if(Access.IsLogin()) return true;

    else { 
        if(userSIGNAL()) {
            console.log(`Unathorized by login`);
            new CoerAlert().Danger('Login expired', 'Unathorized', 'iw-hand-stop-fill');
            Access.LogOut(userSIGNAL);
        }   
        
        return false;
    }  
}; 


/** */
export const ActiveKeyGuard: CanActivateFn = async ({ data }: ActivatedRouteSnapshot, { url }: RouterStateSnapshot) => {
    const ACTIVE_KEY = `${data['activeKey'] || ''}`.toUpperCase();

    if(Tools.IsNotOnlyWhiteSpace(ACTIVE_KEY)) {

        let attempts = 60;
        let navigationKeys: IActiveKey[] = [];
        const showHome = !Tools.IsBooleanFalse(appSettings?.navigation?.showHome);

        do { 
            navigationKeys = Array.from(GetNavigationKeys().values());
            
            if(navigationKeys.length > (showHome ? 1 : 0)) break;
            
            else {
                isLoadingSIGNAL.set(true);
                await Tools.Sleep(1000);
            }
        } while(--attempts > 0);

        isLoadingSIGNAL.set(false);
       
        if(navigationKeys.map(x => x.activeKey).includes(ACTIVE_KEY)) return true; 

        else { 
            console.log(`Unathorized by path ${url}`);
            new CoerAlert().Danger('You do not have authorization for this section', 'Unathorized', 'iw-hand-stop-fill');        
            
            let redirectTo = String(appSettings?.navigation?.redirectTo || '/home');
            if(!redirectTo.startsWith('/')) redirectTo = `/${redirectTo}`;

            if(document.location.href.includes('#')) {
                document.location.href = `/#${redirectTo}`;
            }

            else document.location.href = `/${redirectTo}`; 
            return false;
        } 
    }

    return true;
};  


/** */
export const ROUTER_PAGE = (path: string, component: Type<any>, activeKey: string = ''): Route => {  
    return { 
        path, 
        component, 
        data: { activeKey, GetNavigationKeys },
        canActivate: [LoginGuard, ActiveKeyGuard]
    };
} 


/** */
export const ROUTES_COER91 = ([] as Routes)
    .concat([ROUTER_PAGE('menu', MenuPage)])
    .concat(!Tools.IsBooleanFalse(appSettings?.navigation?.showHome) ? [ROUTER_PAGE('home', HomePage)] : [])
    .concat([{ path: '**', redirectTo: (Tools.IsNotOnlyWhiteSpace(appSettings?.navigation?.redirectTo) ? appSettings?.navigation?.redirectTo : 'home') }]);  


/** */
export const GetNavigationKeys = () => {
    const NAVIGATION_KEYS = new Map<string, IActiveKey>();

    for(const LV1 of navigationSIGNAL()) {
        
        //Level 1
        if(Tools.IsNotOnlyWhiteSpace(LV1?.Path) && !NAVIGATION_KEYS.has(LV1.Path!)) { 
            NAVIGATION_KEYS.set(LV1.Path!, { 
                activeKey: (Tools.IsNotOnlyWhiteSpace(LV1.ActiveKey) ? `${LV1.ActiveKey!}`.toUpperCase() : ''),
                canCreate: Tools.IsBooleanTrue(LV1?.CanCreate), 
                canUpdate: Tools.IsBooleanTrue(LV1?.CanUpdate), 
                canDelete: Tools.IsBooleanTrue(LV1?.CanDelete) 
            });
        }

        else if(Tools.IsNotNull(LV1.Items)) {            
            for(const LV2 of LV1.Items!) {
                //Level 2
                if(Tools.IsNotOnlyWhiteSpace(LV2?.Path) && !NAVIGATION_KEYS.has(LV2.Path!)) { 
                    NAVIGATION_KEYS.set(LV2.Path!, { 
                        activeKey: (Tools.IsNotOnlyWhiteSpace(LV2.ActiveKey) ? `${LV2.ActiveKey!}`.toUpperCase() : ''),
                        canCreate: Tools.IsBooleanTrue(LV2?.CanCreate), 
                        canUpdate: Tools.IsBooleanTrue(LV2?.CanUpdate), 
                        canDelete: Tools.IsBooleanTrue(LV2?.CanDelete) 
                    }); 
                }

                else if(Tools.IsNotNull(LV2.Items)) {  
                    for(const LV3 of LV2.Items!) {
                        //Level 3
                        if(Tools.IsNotOnlyWhiteSpace(LV3?.Path) && !NAVIGATION_KEYS.has(LV3.Path!)) { 
                            NAVIGATION_KEYS.set(LV3.Path!, { 
                                activeKey: (Tools.IsNotOnlyWhiteSpace(LV3.ActiveKey) ? `${LV3.ActiveKey!}`.toUpperCase() : ''),
                                canCreate: Tools.IsBooleanTrue(LV3?.CanCreate), 
                                canUpdate: Tools.IsBooleanTrue(LV3?.CanUpdate), 
                                canDelete: Tools.IsBooleanTrue(LV3?.CanDelete) 
                            });                          
                        }
                    }
                }
            }
        }
    } 

    return NAVIGATION_KEYS;
} 