import { signal } from '@angular/core'; 
import { IScreenSize } from 'coer91.angular/interfaces'; 
import { Screen } from 'coer91.angular/tools';

export const screenSizeSIGNAL = signal<IScreenSize>({
    width: Screen.WINDOW_WIDTH,
    height: Screen.WINDOW_HEIGHT,
    breakpoint: Screen.BREAKPOINT
}); 