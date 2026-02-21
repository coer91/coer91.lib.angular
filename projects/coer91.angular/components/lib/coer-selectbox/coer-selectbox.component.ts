import { Component, computed, effect, EffectRef, input, output, signal } from '@angular/core';
import { CoerTextBox } from '../coer-textbox/coer-textbox.component';
import { Collections, CONTROL_VALUE, HTMLElements, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-selectbox',
    templateUrl: '../coer-textbox/coer-textbox.component.html', 
    styleUrl: '../coer-textbox/coer-textbox.component.scss', 
    providers: [CONTROL_VALUE(CoerSelectBox)],
    standalone: false
})
export class CoerSelectBox<T> extends CoerTextBox {   

    //Variables
    protected effectRef!: EffectRef;
    protected override _htmlElement: HTMLInputElement | null = null;  
    protected override readonly _isSelectComponent = signal<boolean>(true);  
    protected override readonly _isFocused = signal<boolean>(false); 
    protected override readonly _search = signal<string>('');
    protected override readonly _index = signal<number>(-1);
    protected override readonly _isHoverElement = signal<boolean>(false);
    protected readonly _applySearch = signal<boolean>(false);
    protected readonly _isLoading = signal<boolean>(false);

    //Input     
    public override value           = input<T>();
    public override selectOnFocus   = input<boolean>(true);  
    public override showClearButton = input<boolean>(true);
    public dataSource               = input<T[]>([]);
    public displayProperty          = input<string>('name');
    public useIconProperty          = input<boolean>(false); 

    //Output
    protected readonly onOpen  = output<void>();
    protected readonly onClose = output<void>();

    
    constructor() {
        super();

        this.effectRef = effect(() => {
            const SEARCH = this._search(); 
            const APPLY_SEARCH = this._applySearch();  

            const DATA_SOURCE = Collections.SetIndex( 
                this.dataSource().filter((item: any) => Tools.IsNotOnlyWhiteSpace(SEARCH) && APPLY_SEARCH
                    ? String(item[this.displayProperty()]).toLowerCase().includes(SEARCH.toLowerCase()) 
                    : true
                )   
            );  
              
            this._dataSource.set(DATA_SOURCE);   
        });
    }


    //Function
    protected override _onPaste = () => { 
        Tools.Sleep().then(() => this._search.set(this._search().trim()));     
    }


    //Function
    protected override _onFocus = () => {
        if(this._isEnabled()) this.Focus();
        else this.Blur(); 
    }


    //Function
    protected override _onBlur = () => {     
        if(this._isLoading() || this._isHoverElement()) return;
        else this.Blur();
    }  


    //Function
    protected override _onKeyup = (event: KeyboardEvent) => {
        const { key } = event;

        if(['ArrowUp', 'ArrowDown'].includes(key)) {
            if(key === 'ArrowUp') {
                const firstIndex = (this._dataSource().length <= 0) ? -1 : 0;

                if((this._index() - 1) >= firstIndex) {
                    this._index.update(index => index - 1);
                }

                else {
                    this._index.set(-1);
                    this._htmlElement?.focus();
                    this._htmlElement?.select();
                } 
            }
    
            if(key === 'ArrowDown') {
                const lastIndex = (this._dataSource().length - 1);

                if ((this._index() + 1) <= lastIndex) {
                    this._index.update(index => index + 1);
                } 
            }
            
            HTMLElements.ScrollToElement(`#${this._id}-index${this._index()}`); 
            return;
        } 

        const selectedItem = this._dataSource().find(x => x.index == this._index()); 
        this._applySearch.set(true);

        if(['ArrowLeft', 'ArrowRight'].includes(key)) {            
            if(Tools.IsNotNull(this._value())) {
                Tools.Sleep(0, 'ArrowLeftArrowRight').then(() => {
                    const value = this._value()[this.displayProperty()];
                    const index = this._dataSource().findIndex(item => String(item[this.displayProperty()]) == value);
                    this._index.set(index);  
                    HTMLElements.ScrollToElement(`#${this._id}-index${index}`);
                });
            } 
        } 

        else if(key === 'Enter') {            
            if(selectedItem) this._SetValue(selectedItem); 
            this.onKeyupEnter.emit(this._value());
        }

        else if(key === 'Delete') { 
            if(this._showClearButton()) {
                this.Clear();
            }
        } 
    }  


    protected override Destructor() {
        super.Destructor();
        this.effectRef?.destroy();
    }


    //Computed
    protected override _placeholder = computed<string>(() => {
        return Tools.HasProperty(this._value(),this.displayProperty() ) ? this._value()[this.displayProperty()] : '';
    });


    //Computed
    protected override _isEnabled = computed<boolean>(() => {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    });


    //Computed
    protected override _showClearButton = computed(() => {
        return this.showClearButton()
            && this._isEnabled() 
            && this.IsNotOnlyWhiteSpace(this._value())
            && this.IsOnlyWhiteSpace(this._search())
    });


    //Computed
    protected override _showSearchButton = computed(() => {
        return this.showSearchButton()
            && !this._showClearButton()
            && this._isEnabled()
            && this.IsNotOnlyWhiteSpace(this._value())
    });   


    /** Sets the value of the component */
    protected override _SetValue(value: any): void {     
        try {
            value = Tools.IsNotOnlyWhiteSpace(value) 
                ? this.dataSource().find((item: any) => String(item[this.displayProperty()]) === String(value[this.displayProperty()])) || null 
                : null;    
        } 
        
        catch {
            value = null;
        }

        finally { 
            super._SetValue(value);
            this._ResetSearch(value);
            this.Blur();
        }
    }


    //Function
    protected override _GetIconBySelect = (item: any): string => { 
        return this.useIconProperty() ? (item?.icon || '') : '';
    }


    //Function
    protected override _GetDisplayBySelect = (item: any): string => { 
        try {
            return item[this.displayProperty()] || '';    
        } 
        
        catch {
            return '';
        }
    } 


    //Function
    protected override _ResetSearch(value: any) {
        this._search.set(Tools.IsNotOnlyWhiteSpace(value) ? value[this.displayProperty()] : '');  
    }   


    /** */
    public override async Focus(open: boolean = true) {  
        if(this._isEnabled()) {
            this._isLoading.set(true);  
            
            this._htmlElement?.select();
            this._applySearch.set(false);  
            this._isFocused.set(true);
            await Tools.Sleep();

            if(open) {
                this._isCollapsed.set(false); 
                this.onOpen.emit();
            } 
                        
            if(Tools.IsNotNull(this._value())) {
                const value = this._value()[this.displayProperty()];
                const index = this._dataSource().findIndex(item => String(item[this.displayProperty()]) == value);
                this._index.set(index);  
                HTMLElements.ScrollToElement(`#${this._id}-index${index}`);
            }
            
            this._isLoading.set(false); 
        }
        
        else this.Blur();   
    }

    /** */
    public override async Blur() {    
        this._isLoading.set(true);  
        this._search.set(Tools.IsNotOnlyWhiteSpace(this._value()) ? this._value()[this.displayProperty()] : '');   
        await Tools.Sleep();

        this._htmlElement?.blur();  
        this._isCollapsed.set(true); 
        this._isFocused.set(false);  
        this._index.set(-1); 
        this.onClose.emit();

        this._isLoading.set(false); 
    }


    /** */
    public override Clear(): void {
        this._SetValue(null); 
        this.onClickClear.emit();
    } 
}