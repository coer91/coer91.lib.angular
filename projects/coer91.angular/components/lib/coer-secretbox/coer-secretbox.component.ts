import { Component, effect, EffectRef, input } from '@angular/core';
import { CoerTextBox } from '../coer-textbox/coer-textbox.component';

@Component({
    selector: 'coer-secretbox',
    templateUrl: '../coer-textbox/coer-textbox.component.html', 
    styleUrl: '../coer-textbox/coer-textbox.component.scss', 
    standalone: false
})
export class CoerSecretBox extends CoerTextBox {   

    //Variables
    protected effectRef!: EffectRef;

    //Input   
    public override maxLength = input<number | string>(20);
    public showSecret         = input<boolean>(true);
    
    
    constructor() {
        super();

        this.effectRef = effect(() => {
            this._isSecretComponent.set(this.showSecret());
        });
    }


    protected override Destructor() {
        super.Destructor();
        this.effectRef?.destroy();
    }
}