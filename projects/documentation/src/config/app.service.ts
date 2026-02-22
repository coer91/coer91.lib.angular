import { Injectable } from '@angular/core'; 
import { HTTP } from 'coer91.angular/tools'; 
import { ILogin, ILoginResponse, IMenu, IUserRole } from 'coer91.angular/interfaces';
import { appSettings } from '@appSettings';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly AuthController = `${appSettings.webAPI.mySystem}/api/Auth`; 
    private readonly UsersRoleController = `${appSettings.webAPI.mySystem}/api/UsersRole`;  
    private readonly NavigationController = `${appSettings.webAPI.mySystem}/api/Navigation`;

    
    /** HTTP POST */
    public Login = (login: ILogin) => HTTP.POST<ILoginResponse>({
        url: `${this.AuthController}/Login`,
        body: login
    }); 


    /** HTTP POST */
    public RecoveryPassword = (userEmail: string) => HTTP.POST<ILogin>({
        url: `${this.AuthController}/RecoveryPasswordEmail/${userEmail}` 
    });


    /** HTTP PUT */
    public SetPassword = (login: ILogin) => HTTP.PUT<string>({
        url: `${this.AuthController}/SetPassword`,
        body: login,
        responseType: 'text'  
    });


    /** HTTP PUT */
    public UpdateJWT = () => HTTP.PUT<string>({
        url: `${this.AuthController}/UpdateJWT`,
        responseType: 'text' 
    });


    /** HTTP PUT */
    public SetMainUsersRole = (userId: number, roleId: number | string) => HTTP.PUT<IUserRole>({
        url: `${this.UsersRoleController}/SetMainUsersRole/${userId}/${roleId}` 
    });


    /** HTTP GET */
    public GetNavigationByRole = (project: string, role: string) => HTTP.GET<IMenu[]>({
        url: `${this.NavigationController}/GetNavigationByRole`,
        queryParams: [
            { param: 'project', value: project },
            { param: 'role',    value: role    }
        ]
    });
}