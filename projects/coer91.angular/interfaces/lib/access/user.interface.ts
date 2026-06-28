export interface IUser {
    UserId: number;
    User: string; 
    PartnerId: number;
    Partner: string;
    FullName: string; 
    Title: string;
    Email: string;
    JWT: string; 
    Roles: string[];
    Language: string;
}