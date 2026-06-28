import { AfterViewInit, Component, computed, input, OnDestroy, output } from '@angular/core';
import { IBreakpointButton } from 'coer91.angular/interfaces';
import { screenSizeSIGNAL } from 'coer91.angular/signals';
import { HTMLElements, Tools } from 'coer91.angular/tools'; 

@Component({
    selector: 'coer-button',
    templateUrl: './coer-button.component.html', 
    styleUrl: './coer-button.component.scss', 
    standalone: false
})
export class CoerButton implements AfterViewInit, OnDestroy {    
    
    //Variables
    protected readonly _id = Tools.GetGuid("coer-button");
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected _htmlElement!: HTMLElement;

    //Inputs
    public readonly label        = input<string>(''); 
    public readonly type         = input<'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded'>('filled');
    public readonly color        = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'>('primary');
    public readonly icon         = input<string>('');
    public readonly path         = input<string>('');
    public readonly iconPosition = input<'left' | 'right'>('left');
    public readonly isLoading    = input<boolean>(false); 
    public readonly isReadonly   = input<boolean>(false);
    public readonly isInvisible  = input<boolean>(false);
    public readonly isHidden     = input<boolean>(false);
    public readonly breakpoints  = input<IBreakpointButton>({});
    public readonly width        = input<string>('100px');
    public readonly minWidth     = input<string>('20px');
    public readonly maxWidth     = input<string>('100%'); 
    public readonly height       = input<string>('40px');
    public readonly minHeight    = input<string>('20px');
    public readonly maxHeight    = input<string>('40px');
    public readonly marginTop    = input<string>('0px');
    public readonly marginRight  = input<string>('0px');
    public readonly marginBottom = input<string>('0px');
    public readonly marginLeft   = input<string>('0px');

    //Output
    protected readonly onClick   = output<void>(); 
    protected readonly onDestroy = output<void>();
    protected onReady   = output<void>();


    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep(); 
        this._htmlElement = HTMLElements.SelectElementById(this._id)!;          
        this._htmlElement?.addEventListener('focus', this._onFocus); 
        this.onReady?.emit(); 
    }


    //OnDestroy
    ngOnDestroy() {
        this.onReady = null as any; 
        this._htmlElement?.removeEventListener('focus', this._onFocus);
        this.onDestroy.emit();
    } 


    //event
    private _onFocus = () => {
        if(!this._isEnabled) this.Blur(); 
    } 


    //Computed
    protected _label = computed(() => { 
        if(['filled', 'outline'].includes(this._breakpointType())) {
            if(this.isLoading()) return 'Loading';
            return this.label().length <= 0 ? 'Click' : this.label();
        }

        return '';
    }); 


    //Computed
    protected _color = computed<string>(() => { 
        let background = 'background-color-transparent';
        if(this.isInvisible()) background = 'background-color-transparent';
        else if(this.isLoading()) background = 'background-color-loading animation-fade'; 
        else if(this.isReadonly()) background = 'background-color-readonly'; 
        else if(['filled', 'icon-filled', 'icon-filled-rounded'].includes(this._breakpointType())) {
            background = `background-color-${this.color()}`;
        }
         
        let color = `color-${this.color()}`;
        if(this.isInvisible()) color = 'color-transparent';
        else if(this.isLoading() || this.isReadonly()) color = 'color-gray'; 
        else if(['filled', 'icon-filled', 'icon-filled-rounded'].includes(this._breakpointType())) {
            color = ['warning', 'light'].includes(this.color()) ? 'color-dark' : 'color-light';
        }  

        return `${background} ${color}` + (this._isEnabled() ? ` button-focus-${this.color()} button-hover-${this.color()}` : '');
    }); 


    //Computed
    protected _isEnabled = computed<boolean>(() => {
        return !this.isLoading() && !this.isReadonly() && !this.isInvisible() && !this.isHidden();   
    });


    //Computed
    protected _cursor = computed<'pointer' | 'wait' | 'default'>(() => { 
        return this._isEnabled() ? 'pointer' : (this.isLoading() ? 'wait' : 'default'); 
    });


    //computed
    protected _breakpointWidth = computed<string>(() => {        
        switch(screenSizeSIGNAL().breakpoint) {
            case 'mv' : return this.breakpoints().width?.mv  || this.width();
            case 'xs' : return this.breakpoints().width?.xs  || this.width(); 
            case 'sm' : return this.breakpoints().width?.sm  || this.width();  
            case 'md' : return this.breakpoints().width?.md  || this.width();  
            case 'lg' : return this.breakpoints().width?.lg  || this.width();  
            case 'xl' : return this.breakpoints().width?.xl  || this.width(); 
            case 'xxl': return this.breakpoints().width?.xxl || this.width(); 
            default   : return this.width();
        }  
    });


    //Computed
    protected _width = computed<string>(() => {
        return ['filled', 'outline'].includes(this._breakpointType()) 
            ? this._breakpointWidth() 
            : this.height();
    });


    //Computed
    protected _path = computed<string | null>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.path()) ? this.path() : null; 
    });


    //Computed
    protected _iconPosition = computed<'left' | 'right'>(() => {
        return this.isLoading() ? 'right' : this.iconPosition();
    });


    //Computed
    protected _icon = computed<string>(() => {
        if(this.isLoading() && ['filled', 'outline'].includes(this._breakpointType())) return 'i91-arrows-rotate animation-spin animation-speed-15';
        if(Tools.IsOnlyWhiteSpace(this.icon()) && !['filled', 'outline'].includes(this._breakpointType())) return 'i91-hand-pointer-fill';
        return Tools.GetDefaultIcon(this.icon()); 
    });


    //computed
    protected _breakpointType = computed<'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded'>(() => {        
        switch(screenSizeSIGNAL().breakpoint) {
            case 'mv' : return this.breakpoints().type?.mv  || this.type();
            case 'xs' : return this.breakpoints().type?.xs  || this.type(); 
            case 'sm' : return this.breakpoints().type?.sm  || this.type();  
            case 'md' : return this.breakpoints().type?.md  || this.type();  
            case 'lg' : return this.breakpoints().type?.lg  || this.type();  
            case 'xl' : return this.breakpoints().type?.xl  || this.type(); 
            case 'xxl': return this.breakpoints().type?.xxl || this.type(); 
            default   : return this.type();
        }  
    }); 


    //Function
    protected _Click(event: any): void {
        event?.preventDefault();
        this.Blur();
        if (this._isEnabled()) this.onClick.emit();
    }


    /** Press the button logically */
    public Click(): void {
        Tools.Sleep().then(() => this._Click(null));
    }


    /** Focus on the button */
    public Focus(delay: number = 0): void {
        Tools.Sleep(delay).then(() => {
            if(this._isEnabled()) {
                this._htmlElement?.focus();            
            }
        
            else this.Blur(); 
        }); 
    }


    /** Blur the button */
    public Blur(): void {      
        this._htmlElement?.blur();
    }


    /** Scroll to the element */
    public ScrollToElement(): void { 
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}