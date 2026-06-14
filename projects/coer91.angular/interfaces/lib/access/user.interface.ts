export interface IUser {
    UserId:    number;
    User:      string; 
    PartnerId: number;
    Partner:   string;
    FullName:  string; 
    Email:     string;
    JWT:       string; 
    Roles:     string[];
    Language:  string;
}