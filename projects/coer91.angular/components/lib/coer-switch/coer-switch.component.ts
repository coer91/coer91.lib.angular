import { Component, computed, input, output, signal } from '@angular/core';
import { CONTROL_VALUE, ControlValue, HTMLElements, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-switch',
    templateUrl: './coer-switch.component.html', 
    styleUrl: './coer-switch.component.scss',
    providers: [CONTROL_VALUE(CoerSwitch)], 
    standalone: false
})
export class CoerSwitch extends ControlValue { 

    //Variables     
    protected override readonly _value = signal<boolean>(false); 
    protected _htmlElement!: HTMLElement;  

    //input
    public override readonly value  = input<boolean>(false);
    public readonly labelPosition   = input<'left' | 'right'>('right'); 
    public readonly breakLabel      = input<boolean>(true); 
    public readonly type            = input<'switch' | 'checkbox'>('switch');
    public readonly color           = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information'>('primary');  
    public readonly textColor       = input<boolean>(false);  
    public readonly tooltip         = input<string>(''); 
    public readonly tooltipPosition = input<'top' | 'right' | 'bottom'| 'left'>('left');  
    public readonly width           = input<string>('fit-content'); 
    public readonly maxWidth        = input<string>('250px');

    //output 
    protected readonly onClick = output<boolean>();

    /** Sets the value of the component */
    protected override _SetValue(value: boolean): void {
        if(Tools.IsNull(value)) value = false;    
        super._SetValue(value);
    }


    //AfterViewInit
    protected override async Start() {
        this._htmlElement = HTMLElements.SelectElementById(this._id)!;      
    }  
    
    
    //Function
    protected _Toggle(): void { 
        if(this._isEnabled()) {
            if(this._value()) this.Uncheck();
            else this.Check();
            this.onClick.emit(this._value());  
        } 
    }


    //Computed
    protected _textColor = computed(() => { 
        return !this.isLoading()
            ? (this._value() && this.textColor() ? `var(--${this.color()})` : 'var(--dark)')  
            : 'var(--loading)'
    });


    //Computed
    protected _checkboxColor = computed(() => {  
        return this._value() ? 'var(--light)' : 'transparent'; 
    });


    /** */
    public Check(): void { 
        if(this._isEnabled()) this._SetValue(true); 
    }


    /** */
    public Uncheck(): void { 
        if(this._isEnabled()) this._SetValue(false); 
    }
}