import { Component, input, AfterViewInit, output, OnDestroy, computed, signal } from '@angular/core';
import { CONTROL_VALUE, ControlValue, HTMLElements, Tools } from 'coer91.angular/tools';
import { IExternalButton } from 'coer91.angular/interfaces';

@Component({
    selector: 'coer-textbox',
    templateUrl: './coer-textbox.component.html', 
    styleUrl: './coer-textbox.component.scss',
    providers: [CONTROL_VALUE(CoerTextBox)],
    standalone: false
})
export class CoerTextBox extends ControlValue<string> implements AfterViewInit, OnDestroy { 
    
    //start value
    protected override _value = signal<string>('');

    //Variables
    protected readonly _isFocused = signal<boolean>(false);
    protected _htmlElement!: HTMLInputElement; 
    
    //Input
    public placeholder      = input<string>(''); 
    public selectOnFocus    = input<boolean>(false);  
    public textPosition     = input<'left' | 'center' | 'right'>('left'); 
    public minLength        = input<number | string>(0);
    public maxLength        = input<number | string>(50);
    // public showClearButton  = input<boolean>(false);
    // public showSearchButton = input<boolean>(false);
    public externalButtons  = input<IExternalButton>();
    public width            = input<string>('100%');
    public minWidth         = input<string>('100px');
    public maxWidth         = input<string>('100%');  


    //Output 
    protected readonly onKeyupEnter = output<string>();
    protected readonly onClear      = output<void>();
    protected readonly onSearch     = output<string>();
    protected readonly onDestroy    = output<void>();
    protected onReady = output<void>();


    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._htmlElement = HTMLElements.SelectElementById(this._id) as HTMLInputElement;  
        this._htmlElement?.addEventListener('keyup', this._onKeyup);
        this._htmlElement?.addEventListener('paste', this._onPaste);
        this._htmlElement?.addEventListener('focus', this._onFocus);
        this._htmlElement?.addEventListener('blur', this._onBlur);   
        this.onReady?.emit();
    }


    //Function
    private _onKeyup = (event: KeyboardEvent) => {
        if(!this._isEnabled()) return;

        if (event.key === 'Enter') {
            this.onKeyupEnter.emit(this._value());
            this.Blur();
        }
    } 


    //Function
    private _onPaste = () => {
        Tools.Sleep().then(() => this._SetValue(String(this._value()).trim()));        
    }


    //Function
    private _onFocus = () => {
        if(this._isEnabled()) {
            if(this.selectOnFocus() === true) this._htmlElement?.select();
            this._isFocused.set(true);
        }

        else this.Blur(); 
    } 


    //Function
    private _onBlur = () => this.Blur();   


    //OnDestroy
    ngOnDestroy() { 
        this.onReady = null as any;   
        this._valueRef$?.destroy();
        this._htmlElement?.removeEventListener('keyup', this._onKeyup);
        this._htmlElement?.removeEventListener('paste', this._onPaste);
        this._htmlElement?.removeEventListener('focus', this._onFocus); 
        this._htmlElement?.removeEventListener('blur', this._onBlur); 
        this.onDestroy.emit();
    }  


    //Computed
    protected _showExternalButtonLeft = computed<boolean>(() => {
        return Tools.IsBooleanTrue(this.externalButtons()?.showLeft);
    });


    //Computed
    protected _showExternalButtonRight = computed<boolean>(() => {
        return Tools.IsBooleanTrue(this.externalButtons()?.showRight);
    });


    //Computed
    protected _paddingLeft = computed<'10px'>(() => '10px');

    
    //Computed
    protected _paddingRight = computed(() => {
        return '10px';
    });


    //Computed
    protected _widtht = computed<string>(() => {
        let width = 0;
        if(this._showExternalButtonLeft())  width += 40;
        if(this._showExternalButtonRight()) width += 40; 
        width += Number(this._paddingLeft().split('px')[0]);
        width += Number(this._paddingRight().split('px')[0]);
        return `calc(${this.width()} - ${width}px)`;
    }); 


    //Computed
    protected _label = computed<string>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.label()) ? this.label() : this.placeholder();
    }); 


    /** */
    public Focus(select: boolean = false): void {
        if(this._isEnabled()) {
            this._htmlElement?.focus();
            if(select) this._htmlElement?.select();         
        }
        
        else this.Blur(); 
    }


    /** */
    public Blur(): void {      
        this._htmlElement?.blur();  
        this._isFocused.set(false);
    }
}