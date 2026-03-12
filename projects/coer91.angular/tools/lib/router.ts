import { Route } from "@angular/router";
import { Type } from "@angular/core";

export const ROUTER_PAGE = (path: string, component: Type<any>, routerParams: string[] = [], activeKey: string = ''): Route => {
    const params = routerParams.length > 0 ? `/:${routerParams.join('/')}` : '';

    return { 
        path: `${path}${params}`, 
        component, 
        data: { activeKey }
    };
}