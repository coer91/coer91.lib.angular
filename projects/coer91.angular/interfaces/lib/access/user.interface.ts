export interface IUser {
    UserId: number;
    User: string;
    DepartmentId: number;
    Department: string;
    PartnerId: number;
    Partner: string;
    FullName: string; 
    Email: string; 
    Language: string;
    JWT: string; 
    Roles: string[];
}