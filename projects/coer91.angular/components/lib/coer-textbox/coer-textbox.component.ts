import { Component, input, output, computed, signal } from '@angular/core';
import { CONTROL_VALUE, ControlValue, HTMLElements, Tools } from 'coer91.angular/tools';
import { IExternalButton } from 'coer91.angular/interfaces';

@Component({
    selector: 'coer-textbox',
    templateUrl: './coer-textbox.component.html', 
    styleUrl: './coer-textbox.component.scss',
    providers: [CONTROL_VALUE(CoerTextBox)],
    standalone: false
})
export class CoerTextBox extends ControlValue<string> {  

    //Variables
    protected readonly _isFocused = signal<boolean>(false); 
    protected readonly _isSecretComponent = signal<boolean>(false);
    protected readonly _showSecret = signal<boolean>(true);
    protected _htmlElement!: HTMLInputElement; 
    
    //Input
    public placeholder      = input<string>(''); 
    public selectOnFocus    = input<boolean>(false);  
    public textPosition     = input<'left' | 'center' | 'right'>('left'); 
    public minLength        = input<number | string>(0);
    public maxLength        = input<number | string>(50);
    public showClearButton  = input<boolean>(false);
    public showSearchButton = input<boolean>(false);
    public externalButtons  = input<IExternalButton>();
    public width            = input<string>('100%');
    public minWidth         = input<string>('100px');
    public maxWidth         = input<string>('100%');  


    //Output 
    protected readonly onKeyupEnter  = output<string>();
    protected readonly onClickClear  = output<void>();
    protected readonly onClickSearch = output<string>(); 


    //Start
    protected override async Start() { 
        this._htmlElement = HTMLElements.SelectElementById(this._id) as HTMLInputElement;  
        this._htmlElement?.addEventListener('keyup', this._onKeyup);
        this._htmlElement?.addEventListener('paste', this._onPaste);
        this._htmlElement?.addEventListener('focus', this._onFocus);
        this._htmlElement?.addEventListener('blur', this._onBlur);    
    }


    //Destroy
    protected override Destructor() {   
        this._htmlElement?.removeEventListener('keyup', this._onKeyup);
        this._htmlElement?.removeEventListener('paste', this._onPaste);
        this._htmlElement?.removeEventListener('focus', this._onFocus); 
        this._htmlElement?.removeEventListener('blur', this._onBlur); 
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

        if(!this.isTouched()) this.SetTouched(true);
    } 


    //Function
    private _onBlur = () => this.Blur(); 
    
    
    //Computed
    protected _inputType = computed<'text' | 'password'>(() => {
        if(this._showSecretClosed()) return 'password'; 
        return 'text';
    });


    //Computed
    protected _showExternalButtonLeft = computed<boolean>(() => {
        return Tools.IsBooleanTrue(this.externalButtons()?.showLeft)
            && this.isLoading() === false
            && this.isInvisible() === false
            && this.isHidden() === false;
    });


    //Computed
    protected _showExternalButtonRight = computed<boolean>(() => {
        return Tools.IsBooleanTrue(this.externalButtons()?.showRight)
            && this.isLoading() === false
            && this.isInvisible() === false
            && this.isHidden() === false;
    });


    //Computed
    protected _left = computed(() => {
        return this._showExternalButtonLeft() ? '40px' : '0px';
    });


    //Computed
    protected _right = computed(() => {
        return this._showExternalButtonRight() ? '40px' : '0px';
    });


    //Computed
    protected _showSecretClosed = computed(() => {
        return this._isSecretComponent() && this._showSecret();
    });


    //Computed
    protected _showSecretOpen = computed(() => {
        return this._isSecretComponent() && !this._showSecret();
    }); 


    //Computed
    protected _paddingLeft = computed<'10px'>(() => '10px');

    
    //Computed
    protected _paddingRight = computed(() => {
        let padding = 10;
        
        if(this._showClearButton() 
            || this._showSearchButton() 
            || this._showSecretClosed() 
            || this._showSecretOpen()
        ) padding += 20; 
        
        if(this.isValid() || this.isInvalid()) padding += 20; 

        if(padding == 30) padding += 5; 
        if(padding == 50) padding += 10; 
        
        return `${padding}px`;
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


    //Computed
    protected _showLabel = computed<boolean>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.label()) || (
            Tools.IsNotOnlyWhiteSpace(this.placeholder()) && Tools.IsOnlyWhiteSpace(this._value())
        );
    }); 


    //Computed
    protected _showClearButton = computed(() => {
        return this.showClearButton()
            && this._isEnabled() 
            && this.IsNotOnlyWhiteSpace(this._value()) 
    })


    //Computed
    protected _showSearchButton = computed(() => {
        return this.showSearchButton()
            && !this._showClearButton()
            && this._isEnabled()
    });   


    //Function
    protected _ClickSearch(): void {         
        if (Tools.IsOnlyWhiteSpace(this._value())) {
            this.Focus();
        }

        else this.Blur();
        this.onClickSearch.emit(this._value()); 
    } 


    /** */
    public Clear(): void {
        this._SetValue('');
        this.Focus(false);
        this.onClickClear.emit();
    } 


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