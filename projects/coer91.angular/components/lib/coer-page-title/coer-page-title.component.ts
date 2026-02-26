import { Component, computed, input, output, signal } from '@angular/core';
import { ITitleBreadcrumb, ITitleGoBack, ITitleInformation } from 'coer91.angular/interfaces';
import { isLoadingSIGNAL, screenSizeSIGNAL } from 'coer91.angular/signals'; 
import { Collections, Navigation, Tools } from 'coer91.angular/tools';  

@Component({
    selector: 'coer-page-title',
    templateUrl: './coer-page-title.component.html',
    styleUrls: ['./coer-page-title.component.scss'],
    standalone: false
})
export class CoerPageTitle {
    
    //Variables
    protected readonly _isLoading = isLoadingSIGNAL;
    protected readonly _iconRoot = signal<string>('i91-house-door-fill');
    protected readonly _labelRoot = signal<string | null>(null);

    //Inputs 
    public readonly title           = input<string | null>(null);
    public readonly showBreadcrumbs = input<boolean>(true);
    public readonly breadcrumbs     = input<ITitleBreadcrumb[]>([]);
    public readonly goBack          = input<ITitleGoBack>({ show: false });
    public readonly information     = input<ITitleInformation>({ show: false });
    
    //Outputs 
    public readonly onClickInformation = output<void>();
    public readonly onClickGoBack      = output<void>();


    //Constructor
    constructor() { 
        this._GetSelectedMenu();
    } 


    /** */
    protected async _GetSelectedMenu() {
        let counter = 10;

        do {  
            const MENU = Navigation.GetSelectedMenu();

            if(MENU) {             
                const MENU_SELECTED = MENU.tree.shift();

                if(Tools.IsNotNull(MENU_SELECTED)) {                
                    if(Tools.IsNotOnlyWhiteSpace(MENU_SELECTED!.icon)) {
                        this._iconRoot.set(MENU_SELECTED!.icon);
                    }

                    else if(Tools.IsNotOnlyWhiteSpace(MENU_SELECTED!.label)) {
                        this._labelRoot.set(MENU_SELECTED!.label);
                    }
                }

                break;
            } 

            counter--;
            await Tools.Sleep(250);
        } while(counter  > 0) 
    }


    // //computed
    // protected _tooltip = computed<string>(() => {
    //     return Tools.IsNotOnlyWhiteSpace(this.information()?.tooltip)
    //         ? this.information().tooltip! : 'Information';
    // }); 
    
    
    //computed
    protected _breadcrumbs = computed<any[]>(() =>  
        Collections.SetIndex(this.breadcrumbs().slice(0, (screenSizeSIGNAL().breakpoint == 'mv' ? 1 : this.breadcrumbs().length)))
    );  


    /** */
    protected _ClickGoBack() {
        if(Tools.IsFunction(this.goBack().click)) {
            this.goBack().click!();
        }

        this.onClickGoBack.emit();
    }
}