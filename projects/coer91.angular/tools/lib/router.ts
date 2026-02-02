import { Route } from "@angular/router";
import { Type } from "@angular/core";

export const ROUTER_PAGE = (path: string, component: Type<any>, activeKey: string = ''): Route => {
    return { 
        path, 
        component, 
        data: { activeKey }
    };
}