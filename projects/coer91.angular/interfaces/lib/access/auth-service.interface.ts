import { IHttpResponse } from "../http/http-response.interface";
import { ILoginResponse } from "./login-response.interface";
import { IMenu } from "../navigation/menu.interface";
import { IUserRole } from "./user-role.interface";
import { ILogin } from "./login.interface";

export interface IAuthService {
    Login: ((login: ILogin) => Promise<IHttpResponse<ILoginResponse>>) | ILoginResponse;
    RecoveryPassword?: (userEmail: string) => Promise<IHttpResponse<ILogin>>;
    SetPassword?: (login: ILogin) => Promise<IHttpResponse<string>>;
    UpdateJWT?: () => Promise<IHttpResponse<string>>;
    SetMainUsersRole?: (userId: number, roleId: string | number) => Promise<IHttpResponse<IUserRole>>;
    GetNavigationByRole?: (project: string, role: string) => Promise<IHttpResponse<IMenu[]>>;
}