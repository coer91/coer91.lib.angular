import { Component, computed, effect, EffectRef, input, signal } from '@angular/core';
import { CONTROL_VALUE, Tools } from 'coer91.angular/tools';
import { CoerTextBox } from '../coer-textbox/coer-textbox.component';

@Component({
    selector: 'coer-numberbox',
    templateUrl: '../coer-textbox/coer-textbox.component.html', 
    styleUrl: '../coer-textbox/coer-textbox.component.scss', 
    providers: [CONTROL_VALUE(CoerNumberBox)],
    standalone: false
})
export class CoerNumberBox extends CoerTextBox {  
    
    //Variables
    protected effectRef!: EffectRef;
    protected override readonly _isNumberComponent = signal<boolean>(true);
    protected override readonly _showStepIcon = signal<boolean>(true);  
 
    //Inputs
    public override readonly minLength = input<number | string>(0);
    public override readonly maxLength = input<number | string>(20);
    public readonly decimals     = input<number>(0); 
    public readonly step         = input<number>(1);
    public readonly showStepIcon = input<boolean>(true);
    public readonly min          = input<number>(0);
    public readonly max          = input<number>(2147483647);  


    constructor() {
        super();

        this.effectRef = effect(() => { 
            this._showStepIcon.set(this.showStepIcon());   
        });
    }


    //Computed
    protected _step = computed(() => {
        if(this.step() < 1) return 1;
        
        if(String(this.step()).includes('.')) {
            const integer = Number(String(this.step()).split('.')[0]);
            return (Number.isNaN(integer) || integer < 1) ? 1 : integer;
        }

        return this.step();
    }); 


    //Function
    protected override _onKeydown = (event: KeyboardEvent) => {   
        if (event.key === 'ArrowUp')   this._IncrementStep();
        if (event.key === 'ArrowDown') this._DecrementStep();
    } 


    //Function
    protected override _Input = (value: any): void => { 
        value = this._OnlyNumbers(value);
        value = this._ValidateRangeValue(value);   
        if(this._htmlElement) this._htmlElement.value = value;
        super._SetValue(value);  
    }


    //Function
    protected override _IncrementStep(): void { 
        if(this._isEnabled()) {  
            if(!this._isFocused()) this.Focus(); 
            let VALUE = !Number.isNaN(this._value()) ? Number(this._value()) : 0; 
            
            if(this.decimals() <= 0) VALUE += this._step(); 

            else { 
                if(String(VALUE).includes('.')) {
                    let [integer, decimals] = String(VALUE).split('.'); 
                    VALUE = Number(`${Number(integer) + this._step()}.${decimals}`);
                }

                else VALUE += this._step();
            }

            this._Input(VALUE);  
        }
    }


    //Function
    protected override _DecrementStep(): void { 
        if (this._isEnabled()) { 
            if(!this._isFocused()) this.Focus();
            let VALUE = !Number.isNaN(this._value()) ? Number(this._value()) : 0; 
 
            if(this.decimals() <= 0) VALUE -= this._step();

            else {
                if(String(VALUE).includes('.')) {
                    let [integer, decimals] = String(VALUE).split('.'); 
                    VALUE = Number(`${Number(integer) - this._step()}.${decimals}`);
                }

                else VALUE -= this._step();
            }

            this._Input(VALUE);  
        }
    }
        

    /** */
    private _OnlyNumbers(value: string | number): string | number {
        let isNegative = false;
        let valueString = String(value).trim();
        if(Tools.IsOnlyWhiteSpace(valueString)) return '';

        //Negatives
        if (valueString.includes('-')) {
            if (this.min() < 0) {
                isNegative = valueString.startsWith('-');
                if (valueString == '-'  ) return '-';
                if (valueString == '-.' ) return this.decimals() > 0 ? '-0.' : '0';
                if (valueString == '-0' ) return this.decimals() > 0 ? '-0'  : '0';
                if (valueString == '-0.') return this.decimals() > 0 ? '-0.' : '0';
            }

            else if(Number(value) < this.min()) { 
                valueString = '0';
            }
        }

        const charArray: string[] = [];
        for (const char of valueString) {
            if (['0','1','2','3','4','5','6','7','8','9'].includes(char)) {
                charArray.push(char);
            }

            else if (char == '.' && !charArray.includes('.') && this.decimals() > 0) {
                charArray.push(char);
            }
        }

        valueString = charArray.join('');

        //Decimals
        if (this.decimals() > 0) {
            let integerString = valueString.split('.')[0] || '';
            let decimalString = valueString.split('.')[1] || '';
            decimalString = decimalString.substring(0, this.decimals());

            if (valueString == '.') return '0.';

            else if (valueString.includes('.') && decimalString == '') {
                return (isNegative) ? `-${integerString}.` : `${integerString}.`;
            }

            else if (valueString.includes('.') && decimalString.endsWith('0')) {
                return (isNegative) ? `-${integerString}.${decimalString}` : `${integerString}.${decimalString}`;
            }

            else if (integerString == '' && decimalString == '') {
                return '';
            }

            valueString = `${integerString}.${decimalString}`;
        }

        if (isNegative) {
            valueString = `-${valueString}`;
        }

        return Number(valueString);
    }


    /** */
    private _ValidateRangeValue(value: string | number): string {
        if(['-', '.', '-.', '-0', '-0.', ''].includes(String(value))) {
            return String(value);
        }

        if(Number(value) < this.min()) { 
            value = this.min();  
        }

        if(Number(value) > this.max()) { 
            value = this.max();
        }

        if (this.decimals() <= 0 && String(value).includes('.')) { 
            value = String(value).split('.')[0]; 
        }

        return String(value);
    }
}