import { AfterViewInit, Component, computed, inject, input, OnDestroy, output, signal } from '@angular/core'; 
import { FormGroup, ValidationErrors } from '@angular/forms';
import { CoerAlert, HTMLElements, Tools } from 'coer91.angular/tools';
import { CoerTextBox } from '../coer-textbox/coer-textbox.component';
import { CoerSelectBox } from '../coer-selectbox/coer-selectbox.component'; 
import { CoerSwitch } from '../coer-switch/coer-switch.component';
import { CoerNumberBox } from '../coer-numberbox/coer-numberbox.component';

@Component({
    selector: 'coer-form',
    templateUrl: './coer-form.component.html', 
    styleUrl: './coer-form.component.scss', 
    standalone: false
})
export class CoerForm implements AfterViewInit, OnDestroy { 

    //Injection
    protected readonly _alert = inject(CoerAlert);
    
    //Variables
    protected readonly _isReady = signal<boolean>(false);

    //Inputs
    public formGroup  = input.required<FormGroup>();
    public controls   = input.required<(CoerTextBox | CoerNumberBox | CoerSwitch | CoerSelectBox<any>)[]>();  
    public isLoading  = input<boolean>(false); 
    public isReadonly = input<boolean>(false);  

    //Output
    protected readonly onDestroy = output<void>();
    protected onReady = output<void>();


    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();  
        this._isReady.set(true); 
        this.onReady?.emit(); 
    }


    //OnDestroy
    ngOnDestroy() {
        this.onReady = null as any;  
        this.onDestroy.emit();
    }  


    //Computed
    protected _isEnabled = computed<boolean>(() => !this.isLoading() && !this.isReadonly()); 


    /** */
    public IsInvalidControl = (formControlName: string): boolean => {
        if(this._isReady()) {
            const CONTROL = this.controls().find(x => x.formControlName() == formControlName);
            return CONTROL ? CONTROL.isTouched() && this.formGroup().get(formControlName)!.invalid : true; 
        }

        return this._isReady(); 
    }


    /** */
    public IsValidControl = (formControlName: string): boolean => !this.IsInvalidControl(formControlName);  


    /** */
    public SetControlValue(formControlName: string, value: any): void {
        if (Tools.IsNotNull(this.formGroup().get(formControlName))) {
            this.formGroup().get(formControlName)!.setValue(value);
        }
    }


    /** */
    public GetControlValue<T>(formControlName: string, alternative?: T): T {
        return this._isReady() 
            ? (this.formGroup().get(formControlName)?.value || alternative)
            : (alternative || '' as T);
    }


    /** */
    public RemoveControlValidator(formControlName: string): void {
        this.formGroup()?.get(formControlName)?.clearValidators();
        this.formGroup()?.get(formControlName)?.updateValueAndValidity();
    }


    /** */
    public HasControlValue(formControlName: string): boolean {
        const CONTROL = this.formGroup().get(formControlName);
        return Tools.IsNotNull(CONTROL) ? Tools.IsNotOnlyWhiteSpace(CONTROL!.value) : false;
    }


    /** Mark all controls as touched */
    public TouchForm(): void {
        for(const control of this.controls()) control.SetTouched(true);
    }


    /** Mark all controls as touched */
    public IsValid = (): boolean => this.formGroup().valid; 


    /** Mark all controls as touched */
    public IsInvalid = (): boolean => !this.IsValid();


    /** */
    public RemoveValidators(exclude: string[] = []): void { 
        Object.keys(this.formGroup().controls).forEach(controlName => {
            if (!exclude.includes(controlName)) { 
                this.formGroup().get(controlName)?.clearValidators();
                this.formGroup().get(controlName)?.updateValueAndValidity();
            }
        });
    }

    /** Gets the value of the form */
    public GetValue<T>(): T {
        return Tools.BreakReference(this.formGroup().value);
    }


    /** */
    public Reset<T>(properties: T | null = null): void {
        if (Tools.IsNull(properties)) this.formGroup().reset();
        else this.formGroup().reset(properties); 
        for(const control of this.controls()) control.SetTouched(false);
    }


    /**
     * Mark all controls as touched.
     * If form is invalid emit a warning and focus first invalid control.
    */
    public Validate(): boolean {
        this.TouchForm();

        if (this.formGroup().invalid) {
            this._alert.Warning('Please complete the required fields', 'Instructions', '');
            this.Focus();
        }

        return this.IsValid();
    }


    /** Focuses the specified control, otherwise the first invalid control or first control */
    public Focus(formControl: string = ''): void {  
        const PROPERTY_LIST = Tools.GetPropertyList(this.formGroup().controls);
        let control: any = this.controls().find(item => item.formControlName() == formControl);
        

        if(Tools.IsNull(control)) {
            formControl = PROPERTY_LIST.find(item => Tools.IsNotNull(this.formGroup().controls[item].errors)) || '';
            control = this.controls().find(item => item.formControlName() == formControl);
        }

        if(Tools.IsNull(control)) {
            formControl = PROPERTY_LIST.length > 0 ? PROPERTY_LIST[0] : '';
            control = this.controls().find(item => item.formControlName() == formControl);
        }

        if(control && Tools.IsFunction(control.Focus)) {
            control.Focus();
        }
    }
}