export interface IEnvironments {  
    info: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
    isDevelopment: boolean;
    isStaging: boolean;
    isProduction: boolean; 
}