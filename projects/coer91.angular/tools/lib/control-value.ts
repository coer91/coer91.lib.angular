import { AfterViewInit, Component, computed, effect, EffectRef, forwardRef, input, OnDestroy, output, signal } from "@angular/core";  
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Tools } from "./generic";

export const CONTROL_VALUE = <T>(component: T) => {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => component),
        multi: true
    }
} 


@Component({ template: '' })
export abstract class ControlValue implements AfterViewInit, OnDestroy { 

    //Variables 
    protected effectControlValueRef!: EffectRef;
    protected readonly _id = Tools.GetGuid();
    protected readonly _value = signal<any>(null);
    protected readonly _isTouched = signal<boolean>(false);
    protected readonly _IsTouchedFunction = signal<Function | null>(null);
    protected readonly _UpdateValue = signal<Function | null>(null);
    protected readonly _isElementReady = signal<boolean>(false);
    
    protected readonly IsNull              = Tools.IsNull;
    protected readonly IsNotNull           = Tools.IsNotNull;
    protected readonly IsOnlyWhiteSpace    = Tools.IsOnlyWhiteSpace;
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace; 
    protected readonly IsBooleanTrue       = Tools.IsBooleanTrue;
    protected readonly IsBooleanFalse      = Tools.IsBooleanFalse;  
    
    //Input
    public readonly value        = input<any>(''); 
    public readonly label        = input<string>('');
    public readonly isLoading    = input<boolean>(false); 
    public readonly isReadonly   = input<boolean>(false);
    public readonly isInvisible  = input<boolean>(false);
    public readonly isHidden     = input<boolean>(false);
    public readonly isValid      = input<boolean>(false); 
    public readonly isInvalid    = input<boolean>(false);
    public readonly marginTop    = input<string>('0px');
    public readonly marginRight  = input<string>('0px');
    public readonly marginBottom = input<string>('0px');
    public readonly marginLeft   = input<string>('0px');

    //Output
    protected readonly onValueChange = output<any>();
    protected readonly onDestroy     = output<void>();
    protected onReady = output<void>(); 


    constructor() {
        this.effectControlValueRef = effect(() => {
            const value = this.value();
            if(!this._useModelBinding()) this._SetValue(value);
        });
    }


    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep(); 
        await this.Start();  
        this._isElementReady.set(true);
        this.onReady?.emit();
    }


    protected async Start(){}


    //OnDestroy
    ngOnDestroy() { 
        this.onReady = null as any;    
        this.Destructor();
        this.onDestroy.emit(); 
    } 


    protected Destructor() {
        this.effectControlValueRef?.destroy();
    }


    /** */
    public isTouched = computed<boolean>(() => this._isTouched());


    //Computed
    protected _isEnabled = computed<boolean>(() => {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    });


    /** Sets the value of the component */
    protected _SetValue(value: any): void {    
        if(this._useModelBinding()) {
            this._UpdateValue()!(value); 
        } 
                 
        if(!this.isLoading()) this.onValueChange.emit(value);  
        this._value.set(value);  
    }


    //Computed
    protected _useModelBinding = computed<boolean>(() => Tools.IsFunction(this._UpdateValue()));


    //Function
    protected writeValue(value: any): void {    
        this._SetValue(value);
    }


    //Function
    protected registerOnChange(callback: Function): void { 
        if(Tools.IsFunction(callback)) {
            this._UpdateValue.set(callback);  
        }  
    }


    //Function
    protected registerOnTouched(callback: Function): void { 
        if(Tools.IsFunction(callback)) {
            this._IsTouchedFunction.set(callback);   
        }  
    }  


    /** Sets whether the component has been touched */
    public SetTouched(isTouched: boolean): void { 
        
        if(Tools.IsFunction(this._IsTouchedFunction())) {
            this._IsTouchedFunction()!(isTouched);
        } 

        this._isTouched.set(isTouched);
    } 
}