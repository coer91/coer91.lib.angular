import { signal } from '@angular/core'; 
import { IEnvironments } from 'coer91.angular/interfaces';

export const environmentSIGNAL = signal<IEnvironments>({
    info: '' as any,
    isDevelopment: false,
    isStaging: false,
    isProduction: false 
});