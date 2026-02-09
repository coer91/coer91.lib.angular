import { Observable } from "rxjs";
import { Tools } from "./generic";

export class HTMLElements {

    /**  */
    private static _QuerySelector = (selector: string | HTMLElement | null | undefined): HTMLElement | null => { 
        try { 
            if(Tools.IsOnlyWhiteSpace(selector)) return null;

            else if (typeof selector === 'string') {
                return document.querySelector(selector);
            }

            else return selector as HTMLElement;
        }

        catch(error) {
            console.warn(error);
            return null;
        }
    }


    /** Returns the first element within node's descendants whose ID is elementId. */
    public static SelectElementById = (id: string): HTMLElement | null => {    
        if(!id.startsWith('#')) id = `#${id}`;
        return this._QuerySelector(id);
    }


    /** Returns the first element that is a descendant of node that matches selectors */
    public static SelectElement = (selector: string): HTMLElement | null => { 
        return this._QuerySelector(selector);
    } 


    /** Returns all element descendants of node that match selectors. */
    public static SelectAllElements = (selector: string): HTMLElement[] => { 
        try {
            return Tools.IsNotOnlyWhiteSpace(selector) ? Array.from(document.querySelectorAll(selector)) : [];
        }

        catch(error) {
            console.warn(error);
            return [];
        }
    } 


    /** */
    public static ScrollX = (element: string | HTMLElement, x: number): HTMLElement | null => { 
        const HTML_ELEMENT = this._QuerySelector(element); 
        HTML_ELEMENT?.scroll({ top: 0, left: x, behavior: 'smooth' });
        return HTML_ELEMENT;
    }


    /** */
    public static ScrollY = (element: string | HTMLElement, y: number): HTMLElement | null => { 
        const HTML_ELEMENT = this._QuerySelector(element);         
        HTML_ELEMENT?.scroll({ top: y, left: 0, behavior: 'smooth' });
        return HTML_ELEMENT;
    }


    /** */
    public static ScrollToCoordinates = (element: string | HTMLElement, x: number, y: number): HTMLElement | null => { 
        const HTML_ELEMENT = this._QuerySelector(element);         
        HTML_ELEMENT?.scroll({ top: y, left: x, behavior: 'smooth' });
        return HTML_ELEMENT;
    }


    /** */
    public static ScrollToElement = (element: string | HTMLElement, toView: 'start' | 'center' | 'end' | 'nearest' = 'nearest'): HTMLElement | null => { 
        const HTML_ELEMENT = this._QuerySelector(element);   
        HTML_ELEMENT?.scrollIntoView({ block: toView, behavior: 'smooth' });
        return HTML_ELEMENT;
    }


    /** */
    public static GetOffsetTop = (element: string | HTMLElement): number => {  
        const HTML_ELEMENT = this._QuerySelector(element);         
        return HTML_ELEMENT ? HTML_ELEMENT.offsetTop : 0; 
    } 


    /** */
    public static GetCssValue = (element: string | HTMLElement, style: string): string => {  
        const HTML_ELEMENT = this._QuerySelector(element);  
        return HTML_ELEMENT ? window.getComputedStyle(HTML_ELEMENT).getPropertyValue(style) : ''; 
    } 


    /** Gets the width of the element in px */
    public static GetWidth = (element: string | HTMLElement): string => {
        const HTML_ELEMENT = this._QuerySelector(element);   
        return `${(HTML_ELEMENT && HTML_ELEMENT.offsetWidth) ? HTML_ELEMENT.offsetWidth : 0}px`; 
    }


    /** Gets the height of the element in px */
    public static GetHeight = (element: string | HTMLElement): string => {
        const HTML_ELEMENT = this._QuerySelector(element);   
        return `${(HTML_ELEMENT && HTML_ELEMENT.offsetHeight) ? HTML_ELEMENT.offsetHeight : 0}px`;
    }


    /** */
    public static HasClass = (element: string | HTMLElement, className: string): boolean => {
        const HTML_ELEMENT = this._QuerySelector(element);  
        return HTML_ELEMENT?.classList?.contains(className) || false;
    }


    /** */
    public static AddClass = (element: string | HTMLElement, className: string): HTMLElement | null => { 
        const HTML_ELEMENT = this._QuerySelector(element);    

        if(HTML_ELEMENT) {
            if (!this.HasClass(HTML_ELEMENT, className)) {
                HTML_ELEMENT?.classList?.add(className); 
            }            
        }   
        
        return HTML_ELEMENT;
    }


    /** */
    public static RemoveClass = (element: string | HTMLElement, className: string): HTMLElement | null => {
        const HTML_ELEMENT = this._QuerySelector(element);  

        if(HTML_ELEMENT) {
            if (this.HasClass(HTML_ELEMENT, className)) {
                HTML_ELEMENT?.classList?.remove(className); 
            } 
        }  
        
        return HTML_ELEMENT;
    }


    /** */
    public static GetChildren = (element: string | HTMLElement): HTMLElement[] => {
        const HTML_ELEMENT = this._QuerySelector(element);  
        return Array.from(HTML_ELEMENT?.children || []) as HTMLElement[];  
    }


    /** */
    public static GetFather = (element: string | HTMLElement): HTMLElement | null => {
        const HTML_ELEMENT = this._QuerySelector(element);  
        return HTML_ELEMENT ? (HTML_ELEMENT?.parentElement || null) : null;
    }


    /** */
    public static OnMouseLeave = (element: string | HTMLElement) => {
        const ELEMENT = this._QuerySelector(element); 

        if(ELEMENT) {
            return new Observable<'mouseleave'>(subscriber => {  
                const Handle = () => subscriber.next('mouseleave');  
                ELEMENT.addEventListener("mouseleave", Handle); 
                return () => ELEMENT.removeEventListener("mouseleave", Handle);
            }); 
        } 

        console.warn('Element not found for OnMouseLeave');
        return null; 
    } 
};