import { IUser } from "./user.interface";

export interface ILoginResponse extends IUser { 
    message: string; 
}