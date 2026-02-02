
import { Observable } from "rxjs";
import { IScreenSize } from "coer91.angular/interfaces";

export class Screen {

    /** Gets the width of the browser window */
    public static get WINDOW_WIDTH(): number {
        return window.innerWidth;
    }


    /** Gets the height of the browser window */
    public static get WINDOW_HEIGHT(): number {
        return window.innerHeight;
    }


    /** Gets the width of the device screen */
    public static get DEVICE_WIDTH(): number {
        return window.screen.width;
    }


    /** Gets the height of the device screen */
    public static get DEVICE_HEIGHT(): number {
        return window.screen.height;
    }


    /** gets the breakpoint based on the width of the browsing window */
    public static get BREAKPOINT(): 'mv' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' {
        if (this.WINDOW_WIDTH < 500) return 'mv';
        else if (this.WINDOW_WIDTH >= 500 && this.WINDOW_WIDTH < 576) return 'xs';
        else if (this.WINDOW_WIDTH >= 576 && this.WINDOW_WIDTH < 768) return 'sm';
        else if (this.WINDOW_WIDTH >= 768 && this.WINDOW_WIDTH < 992) return 'md';
        else if (this.WINDOW_WIDTH >= 992 && this.WINDOW_WIDTH < 1200) return 'lg';
        else if (this.WINDOW_WIDTH >= 1200 && this.WINDOW_WIDTH < 1400) return 'xl';
        else return 'xxl';
    }


    /** Provides an observable for screen resizing */
    public static Resize = new Observable<IScreenSize>(subscriber => {
        const handleResize = () => { 
            subscriber.next({ 
                width: window.innerWidth, 
                height: window.innerHeight, 
                breakpoint: this.BREAKPOINT 
            }); 
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize);

        return () => { 
            window.removeEventListener("resize", handleResize); 
            window.removeEventListener("load", handleResize); 
        };
    });


    /** Provides an observable for the browser buttons */
    public static ClickBrowserButton = new Observable<string>(subscriber => {
        const handlePopState = (popStateEvent: PopStateEvent) => { 
            if (popStateEvent.state && popStateEvent.target) { 
                subscriber.next((popStateEvent.target as Window).location.href); 
            } 
        }; 
        
        window.addEventListener('popstate', handlePopState); 
        
        return () => { 
            window.removeEventListener('popstate', handlePopState); 
        };
    });
}