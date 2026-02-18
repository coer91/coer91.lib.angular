import { AfterViewInit, Component, computed, inject, input, OnDestroy, output, signal } from '@angular/core'; 
import { FormGroup, ValidationErrors } from '@angular/forms';
import { CoerAlert, HTMLElements, Tools } from 'coer91.angular/tools';

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
    protected _isEnabled = computed<boolean>(() => {
        return this.isLoading()   === false 
            && this.isReadonly()  === false 
    }); 


    /** */
    public IsInvalidControl = (formControlName: string): boolean => {
        if(this._isReady()) {
            if(Tools.IsNull(this.formGroup().get(formControlName))) return true; 
            return this.formGroup().get(formControlName)!.touched && this.formGroup().get(formControlName)!.invalid
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
        return this._isReady() && Tools.IsNotNull(this.formGroup().get(formControlName))
            ? this.formGroup().get(formControlName)!.value
            : (Tools.IsNotNull(alternative) ? alternative! : null) as T;
    }


    /** */
    public RemoveControlValidator(formControlName: string): void {
        this.formGroup()?.get(formControlName)?.clearValidators();
        this.formGroup()?.get(formControlName)?.updateValueAndValidity();
    }


    /** */
    public HasControlValue(formControlName: string): boolean {
        return Tools.IsNotNull(this.formGroup().get(formControlName))
            ? Tools.IsNotOnlyWhiteSpace(this.formGroup().get(formControlName)!.value)
            : false;
    }


    /** Mark all controls as touched */
    public TouchForm(): void {
        this.formGroup().markAllAsTouched();
    }


    /** Mark all controls as touched */
    public IsValid(): boolean {
        return this.formGroup().valid;
    }


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
        const ELEMENT_COLLECTION = new Map<string, HTMLElement>();
        const ERROR_COLLECTION   = new Map<string, ValidationErrors | null>();

        for(const property of Tools.GetPropertyList(this.formGroup().controls)) {
            const ELEMENT = HTMLElements.SelectElement(`[formcontrolname='${property}'] input`);
            if(ELEMENT) ELEMENT_COLLECTION.set(property, ELEMENT); 
            
            ERROR_COLLECTION.set(property, this.formGroup().controls[property].errors);
        }

        if(ELEMENT_COLLECTION.size > 0) {
            if(Tools.IsOnlyWhiteSpace(formControl)) {
                for(const [property, error] of ERROR_COLLECTION) {
                    if (Tools.IsNotNull(error)) {
                        formControl = property;
                        break;
                    }
                }

                if(Tools.IsOnlyWhiteSpace(formControl)) {
                    formControl = Array.from(ELEMENT_COLLECTION.keys())[0];
                }
            }

            ELEMENT_COLLECTION.get(formControl)?.focus();
        }
    }
}