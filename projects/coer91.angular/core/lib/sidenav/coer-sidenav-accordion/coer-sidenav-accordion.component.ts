import { Component, input, AfterViewInit, output, OnDestroy, computed, signal } from '@angular/core';
import { HTMLElements, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-sidenav-accordion',
    templateUrl: './coer-sidenav-accordion.component.html', 
    styleUrl: './coer-sidenav-accordion.component.scss', 
    standalone: false
})
export class SidenavAccordion implements AfterViewInit, OnDestroy {       

    //Variables 
    protected readonly _isCollapsed = signal<boolean>(true); 
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected _htmlElement!: HTMLElement; 
     
    //Output
    protected readonly onOpen    = output<void>();
    protected readonly onClose   = output<void>();
    protected readonly onDestroy = output<void>();
    protected onReady = output<void>();

    //input
    public id    = input.required<string>();
    public title = input.required<string | null | undefined>();
    public icon  = input.required<string | null | undefined>(); 
    public level = input.required<'lv1' | 'lv2'>();
    public showSidenav = input.required<boolean>(); 

    
    async ngAfterViewInit() {
        await Tools.Sleep(); 
        this._htmlElement = HTMLElements.SelectElementById(this.id())!;
        this.onReady?.emit();
    }
    
    ngOnDestroy() { 
        this.onReady = null as any; 
        this.onDestroy.emit();
    }   


    //Computed
    public isCollapsed = computed<boolean>(() => this._isCollapsed());


    //Computed
    public _paddingLeft = computed<'10px' | '40px'>(() => this.level() === 'lv1' ? '10px' : '40px');


    //Function
    protected _Toggle = () => { 
        if(!this.showSidenav()) return;
        if(this._isCollapsed()) this.Open();
        else this.Close();
    }


    /** */
    public Open(): void {
        this._isCollapsed.set(false); 

        Tools.Sleep().then(() => {              
            HTMLElements.ScrollToElement(this._htmlElement);  
            this.onOpen.emit();
        });
    }


    /** */
    public Close(): void {
        this._isCollapsed.set(true);
        Tools.Sleep().then(() => this.onClose.emit());
    }


    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement, 'start'); 
    }
}