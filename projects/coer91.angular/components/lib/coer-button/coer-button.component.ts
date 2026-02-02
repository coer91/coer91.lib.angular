import { AfterViewInit, Component, computed, input, OnDestroy, output } from '@angular/core';
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
    public label        = input<string>(''); 
    public type         = input<'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded'>('filled');
    public color        = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'>('primary');
    public icon         = input<string>('');
    public path         = input<string>('');
    public iconPosition = input<'left' | 'right'>('left');
    public isLoading    = input<boolean>(false); 
    public isReadonly   = input<boolean>(false);
    public isInvisible  = input<boolean>(false);
    public isHidden     = input<boolean>(false);
    public width        = input<string>('100px');
    public minWidth     = input<string>('20px');
    public maxWidth     = input<string>('100%'); 
    public height       = input<string>('40px');
    public minHeight    = input<string>('20px');
    public maxHeight    = input<string>('40px');
    public marginTop    = input<string>('0px');
    public marginRight  = input<string>('0px');
    public marginBottom = input<string>('0px');
    public marginLeft   = input<string>('0px');

    //Output
    protected onClick   = output<void>(); 
    protected onReady   = output<void>();
    protected onDestroy = output<void>();


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
        if(['filled', 'outline'].includes(this.type())) {
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
        else if(['filled', 'icon-filled', 'icon-filled-rounded'].includes(this.type())) {
            background = `background-color-${this.color()}`;
        }
         
        let color = `color-${this.color()}`;
        if(this.isInvisible()) color = 'color-transparent';
        else if(this.isLoading() || this.isReadonly()) color = 'color-gray'; 
        else if(['filled', 'icon-filled', 'icon-filled-rounded'].includes(this.type())) {
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


    //Computed
    protected _width = computed<string>(() => {
        return ['filled', 'outline'].includes(this.type()) ? this.width() : this.height();
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
        if(this.isLoading() && ['filled', 'outline'].includes(this.type())) return 'i91-arrows-rotate animation-spin animation-speed-15';
        if(Tools.IsOnlyWhiteSpace(this.icon()) && !['filled', 'outline'].includes(this.type())) return 'i91-hand-pointer-fill';

        switch(this.icon()) {
            case 'add'   : return 'i91-plus font-size-20px';
            case 'save'  : return 'i91-floppy-disk-fill font-size-20px';
            case 'excel' : return 'i91-file-xls-fill font-size-17px';
            case 'import': return 'i91-file-arrow-up-fill font-size-17px';
            case 'delete': return 'i91-trash-can-fill font-size-17px';
            case 'edit'  : return 'i91-pen-fill font-size-17px';
            case 'modal' : return 'i91-modal-fill font-size-17px';
            case 'go'    : return 'i91-arrow-from-bracket font-size-17px';
            default: return this.icon();
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
    public Focus(): void {
        if(this._isEnabled()) {
            Tools.Sleep().then(() => this._htmlElement?.focus());            
        }
        
        else this.Blur(); 
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