import { signal } from '@angular/core'; 
import { IUser } from 'coer91.angular/interfaces';
export const userSIGNAL = signal<IUser | null>(null);