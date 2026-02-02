import { HTMLElements } from "coer91.angular/tools";

declare global {
    interface HTMLElement {

        /** */
        scrollX(x: number): HTMLElement | null;

        /** */
        scrollY(y: number): HTMLElement | null;

        /** */
        scrollToCoordinates(x: number, y: number): HTMLElement | null;

        /** */
        scrollToElement(toView?: 'start' | 'center' | 'end' | 'nearest'): HTMLElement | null;

        /** */
        getOffsetTop(): number;
        
        /** */
        getCssValue(style: string): string;
        
        /** Gets the height of the element in px */
        getElementWidth(): string;
        
        /** Gets the height of the element in px */
        getElementHeight(): string;
        
        hasClass(className: string): boolean;

        addClass(className: string): HTMLElement | null;

        removeClass(className: string): HTMLElement | null;

        hasChildren(): boolean;

        getChildren(): HTMLElement[];

        getFather(): HTMLElement | null;

        getGrandfather(): HTMLElement | null;
    }
}

HTMLElement.prototype.scrollX = function(x: number = 0): HTMLElement | null {
    return HTMLElements.ScrollX(this, x);
};

HTMLElement.prototype.scrollY = function(y: number = 0): HTMLElement | null {
    return HTMLElements.ScrollY(this, y);
};

HTMLElement.prototype.scrollToCoordinates = function(x: number = 0, y: number = 0): HTMLElement | null {
    return HTMLElements.ScrollToCoordinates(this, x, y);
};

HTMLElement.prototype.scrollToElement = function(toView: 'start' | 'center' | 'end' | 'nearest' = 'nearest'): HTMLElement | null {
    return HTMLElements.ScrollToElement(this, toView);
};

HTMLElement.prototype.getOffsetTop = function(): number {
    return HTMLElements.GetOffsetTop(this);
}; 

HTMLElement.prototype.getCssValue = function(style: string): string {
    return HTMLElements.GetCssValue(this, style);
};  

HTMLElement.prototype.getElementWidth = function(): string {
    return HTMLElements.GetWidth(this);
}; 

HTMLElement.prototype.getElementHeight = function(): string {
    return HTMLElements.GetHeight(this);
};  

HTMLElement.prototype.hasClass = function(className: string): boolean {
    return HTMLElements.HasClass(this, className);
}; 

HTMLElement.prototype.addClass = function(className: string): HTMLElement | null {
    return HTMLElements.AddClass(this, className);
}; 

HTMLElement.prototype.removeClass = function(className: string): HTMLElement | null {
    return HTMLElements.RemoveClass(this, className);
}; 

HTMLElement.prototype.hasChildren = function(): boolean {
    return HTMLElements.HasChildren(this);
}; 

HTMLElement.prototype.getChildren = function(): HTMLElement[] {
    return HTMLElements.GetChildren(this);
}; 

HTMLElement.prototype.getFather = function(): HTMLElement | null {
    return HTMLElements.GetFather(this);
}; 

HTMLElement.prototype.getGrandfather = function(): HTMLElement | null {
    return HTMLElements.GetGrandfather(this);
}; 

export {};