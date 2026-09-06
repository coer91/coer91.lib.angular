import { Component, input, AfterViewInit, output, OnDestroy } from '@angular/core';
import { CONTROL_VALUE, ControlValue, HTMLElements, Tools } from 'coer91.angular/tools'; 

@Component({
    selector: 'coer-accordion',
    templateUrl: './coer-accordion.component.html', 
    styleUrl: './coer-accordion.component.scss', 
    providers: [CONTROL_VALUE(CoerAccordion)],
    standalone: false
})
export class CoerAccordion extends ControlValue implements AfterViewInit, OnDestroy {      

    //Variables 
    protected _htmlElement!: HTMLElement; 
     
    //output
    public readonly onOpen    = output<void>();
    public readonly onClose   = output<void>(); 

    //input 
    public readonly icon          = input<string>('');
    public readonly type          = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'>('primary');
    public readonly bodyColor     = input<boolean>(false); 
    public readonly scrollOnOpen  = input<boolean>(false);
    public readonly minWidth      = input<string>('100px');
    public readonly maxWidth      = input<string>('100%');  
    public readonly minHeight     = input<string>('80px');
    public readonly maxHeight     = input<string>('100vh'); 
    public readonly padding       = input<string>('0px');  

    public override readonly marginTop     = input<string>('15px');
    public override readonly marginRight   = input<string>('30px'); 
    public override readonly marginLeft    = input<string>('30px');

    //AfterViewInit
    protected override async Start() { 
        this._htmlElement = HTMLElements.SelectElementById(this._id)!; 
    } 



    /** Sets the value of the component */
    protected override _SetValue(value: any): void {    
        value = Tools.IsBooleanTrue(value);
        super._SetValue(value); 
    }


    //computed
    protected get _isCollapsed() {
        return Tools.IsBooleanFalse(this._value()); 
    }


    //computed
    protected get _minHeight() {
        return this._isCollapsed ? '' : this.minHeight(); 
    }


    //computed
    protected get _maxHeight () {
        return this._isCollapsed ? '' : this.maxHeight(); 
    }


    /** */
    protected Toggle = () => { 
        if(this.isReadonly() || this.isInvisible() || this.isHidden()) return;
        if(this._isCollapsed) this.Open();
        else this.Close();
    }


    /** */
    public Open(): void {
        this._SetValue(true);

        Tools.Sleep().then(() => { 
            if(this.scrollOnOpen()) {
                HTMLElements.ScrollToElement(this._htmlElement); 
            }

            this.onOpen.emit();
        });
    }


    /** */
    public Close(): void {
        this._SetValue(false);
        Tools.Sleep().then(() => this.onClose.emit());
    }


    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}