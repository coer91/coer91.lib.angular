export interface IHttpResponse<T> {
    data: T;
    status: number;
    message: string;  
    ok: boolean;
}