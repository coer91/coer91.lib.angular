import { IHttpRequest, IHttpResponse } from "coer91.angular/interfaces";
import { CoerAlert } from "./coer-alert/coer-alert.component";
import { Tools } from "./generic";
import { Dates } from "./dates";
import { Access } from "./access";

export class HTTP {

    public static readonly STATUS_CODE = {
        /** 200 */
        Ok: 200,
        /** 201 */
        Created: 201,
        /** 204 */
        NoContent: 204,
        /** 400 */
        BadRequest: 400,
        /** 401 */
        Unauthorize: 401,
        /** 403 */
        Forbidden: 403,
        /** 404 */
        NotFound: 404,
        /** 405 */
        NotAllowed: 405,
        /** 406 */
        NotAcceptable: 406,
        /** 409 */
        Conflict: 409,
        /** 413 */
        PayloadTooLarge: 413,
        /** 500 */
        InnerError: 500
    }  


    /** */ 
    public static async GET<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> { 
        return await this._HTTP(request, 'GET');  
    }


    /** */ 
    public static async POST<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        return await this._HTTP(request, 'POST'); 
    }


    /** */ 
    public static async PUT<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        return await this._HTTP(request, 'PUT'); 
    }


    /** */ 
    public static async PATCH<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        return await this._HTTP(request, 'PATCH'); 
    }


    /** */ 
    public static async DELETE<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>> {
        return await this._HTTP(request, 'DELETE'); 
    }


    //Function 
    private static async _HTTP<T>(request: IHttpRequest<T>, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'): Promise<IHttpResponse<T>> {
        try { 
            const RESPONSE = this._BuildRequest(request, method);                      
           
            const fetchResponse = await fetch(RESPONSE.url, { 
                method: RESPONSE.method, 
                headers: RESPONSE.headers, 
                body: RESPONSE.body, 
                credentials: RESPONSE.credentials,
            }); 

            return await this._BuildResponse(fetchResponse, request.responseType); 
        } 
        
        catch {   
            Tools.Sleep(5000, 'Offline_API').then(() => new CoerAlert().Error(null, 'Offline API', '', 0));  
            return this._BuildError(0, 'Offline API', request.responseType);
        } 
    }


    //Function 
    private static _BuildRequest<T>(request: IHttpRequest<T>, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'): { 
        url: string, 
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        headers: Headers, 
        body: BodyInit | null, 
        credentials: 'include' | 'same-origin' 
    } {

        //Build URL
        const _URL = new URL(request.url);
        if (request.queryParams) {
            for(const query of request.queryParams.filter(x => Tools.IsNotOnlyWhiteSpace(x.value))) {
                _URL.searchParams.append(query.param, String(query.value));
            } 
        }

        //Build HEADERS
        const _HEADERS = this._BuildHeaders();
        if (request.headers) {
            for (const header of request.headers.filter(x => Tools.IsNotOnlyWhiteSpace(x.value))) {
                _HEADERS.append(header.header, String(header.value));
            }
        }  

        //Build BODY
        let _BODY: BodyInit | null = null;            
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            if(request.body) {
                if(request.body instanceof FormData) {
                    _BODY = request.body;
                }

                else {
                    _BODY = JSON.stringify(request.body);
                    _HEADERS.set('Content-Type', 'application/json');
                } 
            }

            else _BODY = '{}';
        }

        return { 
            url: _URL.toString(),
            method,
            headers: _HEADERS,
            body: _BODY,
            credentials: (request.withCredentials ? 'include' : 'same-origin')
        }
    }


    //Function
    private static _BuildHeaders(): Headers {
        const headers = new Headers();

        const USER = Access.GetUser();
        if(Tools.IsNotOnlyWhiteSpace(USER?.jwt)) {
            const JWT = USER!.jwt.startsWith('BEARER') ? USER!.jwt : `BEARER ${USER!.jwt}`;
            headers.append('Authorization', JWT);
        }

        if(Tools.IsNotOnlyWhiteSpace(USER?.user)) headers.append('Clien-User', USER!.user); 

        if(Tools.IsNotOnlyWhiteSpace(USER?.role)) headers.append('User-Role', USER!.role); 

        headers.append('Utc-Offset', `${Dates.GetOffset() / 60}`);
        
        return headers;
    }


    //Function
    private static async _BuildResponse<T>(fetchResponse: Response, responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'): Promise<IHttpResponse<T>> {
                  
        if(Tools.IsNull(responseType)) {
            responseType = 'json';
        }
        
        let response: any = null; 

        //ERROR
        if(fetchResponse.status >= 400) {
            response = await fetchResponse.text();
            return await this._BuildError(fetchResponse.status, response, responseType!);
        }
         
        //OK  
        if(fetchResponse.status >= 200) {
            switch(responseType) {
                case 'json': {
                    response = await fetchResponse.json();
                    break;
                }
    
                case 'text': {
                    response = await fetchResponse.text();
                    break;
                }
    
                case 'arraybuffer': {
                    response = await fetchResponse.arrayBuffer();
                    break;
                } 
                
                case 'blob': {
                    response = await fetchResponse.blob();
                    break;
                } 
            } 
        }

        return {
            body: response,
            status: fetchResponse.status,
            message: fetchResponse.statusText,  
            ok: fetchResponse.ok
        };
    }


    //Function
    private static async _BuildError<T>(status: number, message: string, responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'): Promise<IHttpResponse<T>> {   

        let response: any;
        switch(responseType) {     
            case 'text': {
                response = '';
                break;
            }
    
            case 'arraybuffer': {
                response = null;
                //message = new TextDecoder().decode(new Uint8Array(message as any));
                break;
            } 
            
            case 'blob': {
                response = null;
                break;
            } 

            default: {
                response = {};
                break;
            }
        } 
        
        return {
            body: response as T,
            status,
            message, 
            ok: false
        };  
    } 
}