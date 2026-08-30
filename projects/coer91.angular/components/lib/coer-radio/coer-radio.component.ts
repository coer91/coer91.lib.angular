import { Component, computed, input, signal } from '@angular/core';
import { IRadio } from 'coer91.angular/interfaces';
import { Collections, CONTROL_VALUE, ControlValue, HTMLElements, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-radio',
    templateUrl: './coer-radio.component.html', 
    styleUrl: './coer-radio.component.scss',
    providers: [CONTROL_VALUE(CoerRadio)], 
    standalone: false
})
export class CoerRadio<T> extends ControlValue { 

    //Variables     
    protected override readonly _value = signal<IRadio<T> | null>(null); 

    //input
    public override readonly value  = input<IRadio<T> | null>(null);
    public readonly dataSource      = input<IRadio<T>[]>([]);
    public readonly position        = input<'vertical' | 'horizontal'>('vertical'); 
    public readonly labelPosition   = input<'left' | 'right'>('right'); 
    public readonly breakLabel      = input<boolean>(false);  
    public readonly showBackround   = input<boolean>(false);      
    public readonly width           = input<string>('fit-content'); 
    public readonly maxWidth        = input<string>('250px'); 


    //Computed
    protected _dataSource = computed<any[]>(() => Collections.SetIndex(this.dataSource()));


    /** Sets the value of the component */
    protected override _SetValue(option: IRadio<T> | null): void {  
        const RADIO = this._dataSource().find(x => x.Label === option?.Label) || null; 

        Tools.Sleep(100, `SetValue${this._id}`).then(() => {
            if(this._useModelBinding()) {
                this._UpdateValue()!(RADIO); 
            } 

            if(!this.isLoading()) this.onValueChange.emit(RADIO);  
            this._value.set(RADIO); 
            
            HTMLElements.SelectAllElements(`input[name=${this._id}]`).forEach((element: any) => { 
                element.checked = (`${element.value}` === `${RADIO?.__index__}`); 
            });  
        });  
    }


    //'white-space-nowrap': breakLabel() 
    protected _ClickOption(index: number) {
        if(Tools.IsNotOnlyWhiteSpace(index) && index >= 0) { 
            this._SetValue(this._dataSource()[index] || null);
        }

        else this._SetValue(null);
    }


    /** */
    public Select(callback: (option: T) => boolean) { 
        const option = this._dataSource().find(callback);
        this._SetValue(option || null);
    }


    /** */
    public Unselect() {
        this._SetValue(null);    
    }
}