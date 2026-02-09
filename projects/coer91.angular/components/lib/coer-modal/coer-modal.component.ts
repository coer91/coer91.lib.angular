import { Component, computed, contentChildren, input, output, signal, } from '@angular/core';
import { TemplateRefDirective } from 'coer91.angular/directives';
import { screenSizeSIGNAL } from 'coer91.angular/signals';
import { HTMLElements, Tools } from 'coer91.angular/tools';

@Component({
    selector: 'coer-modal',
    templateUrl: './coer-modal.component.html', 
    styleUrl: './coer-modal.component.scss', 
    standalone: false
})
export class CoerModal {     

    //Content 
    public contentElements = contentChildren<TemplateRefDirective>(TemplateRefDirective);

    //Variables
    protected readonly _id = Tools.GetGuid("coer-modal");    
    protected readonly _showBackdrop = signal<boolean>(false);
    protected readonly _showContent = signal<boolean>(false);
    protected _htmlElement!: HTMLElement; 

    //input  
    public readonly title            = input<string>(''); 
    public readonly icon             = input<string>(''); 
    public readonly showCancelButton = input<boolean>(true); 
    public readonly alignX           = input<'left' | 'center' | 'right'>('center'); 
    public readonly alignY           = input<'top'  | 'middle' | 'bottom'>('top');
    public readonly width            = input<string>('fit-content'); 
    public readonly maxWidth         = input<string>('100vw');
    public readonly height           = input<string>('auto');    

    //output 
    protected readonly onOpen    = output<void>();
    protected readonly onClose   = output<void>(); 
    protected readonly onDestroy = output<void>();
    protected onReady            = output<void>();  
     
    //AfterViewInit
    async ngAfterViewInit() { 
        await Tools.Sleep(); 
        this._htmlElement = HTMLElements.SelectElementById(this._id)!;    
        this.onReady?.emit();  
    }


    //OnDestroy
    ngOnDestroy() { 
        this.onReady = null as any;  
        this.onDestroy.emit();
    } 
    

    //Computed
    protected _alignY = computed(() => {
        switch(this.alignY()) {
            case 'top'   : return 'flex-start';
            case 'bottom': return 'flex-end';
            default      : return 'center';
        }
    });
    

    //Computed
    protected _alignX = computed(() => {
        switch(this.alignX()) {
            case 'left' : return 'flex-start';
            case 'right': return 'flex-end';
            default     : return 'center';
        }
    }); 


    //Computed
    protected _showHeader = computed<boolean>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.title())
            || Tools.IsNotOnlyWhiteSpace(this.icon())
            || this.showCancelButton() 
    });
    
    
    //Computed
    protected _modalBody = computed<any>(() => { 
        return this.contentElements().find(x => x.templateRef().equals('modal-body')) || null;
    }); 


    //Computed
    protected _modalFooter = computed<any>(() => { 
        return this.contentElements().find(x => x.templateRef().equals('modal-footer')) || null;
    });


    //Computed
    protected _showFooter = computed<boolean>(() => { 
        return Tools.IsNotNull(this._modalFooter()?.template) && this._modalFooter()?.show();
    });


    //Computed
    protected _gridTemplateRows = computed(() => 
        `${(this._showHeader() ? '40px' : '')} 1fr ${(this._showFooter() ? '50px' : '')}`.cleanUpBlanks()
    ); 


    //Computed
    protected _margin = computed(() => {
        const BREAKPOINT = screenSizeSIGNAL().breakpoint;
         
        let top    = '0px';
        let right  = '0px';
        let bottom = '0px';
        let left   = '0px';

        switch(this.alignY()) {
            case 'top'   : top    = '40px'; break;
            case 'bottom': bottom = '40px'; break;
        }

        switch(this.alignX()) {
            case 'left' : left  = '40px'; break;
            case 'right': right = '40px'; break;
        }

        return ['mv', 'xs', 'sm'].includes(BREAKPOINT) ? '10px' : `${top} ${right} ${bottom} ${left}`;
    });


    //Computed
    protected _width = computed(() => { 
        return `calc(${this.width()} - 20px)`;
    });


    //Computed
    protected _maxWidth = computed(() => { 
        return `calc(${this.maxWidth()} - 20px)`;
    });
    
    
    //Computed
    protected _maxHeight = computed(() => {
        const BREAKPOINT = screenSizeSIGNAL().breakpoint;
        let compensation = ['mv', 'xs', 'sm'].includes(BREAKPOINT) ? 20 : 80; 
        if(this._showHeader()) compensation += 40;
        if(this._showFooter()) compensation += 50;
        return `calc(100vh - ${compensation}px)`;
    });  


    //Function
    protected async _clickBackdrop(event: any) {
        event.stopPropagation(); 
        HTMLElements.AddClass(`#${this._id}-content`, 'animation-beat-modal');
        await Tools.Sleep(1000, 'animation-beat-modal');
        HTMLElements.RemoveClass(`#${this._id}-content`, 'animation-beat-modal');
    }


    /** */
    public async Close() {
        if(this._showContent() === true) {
            this._showContent.set(false); 
            await Tools.Sleep(500);
            this._showBackdrop.set(false);
            this.onClose.emit(); 
        }
    } 


    /** */
    public async Open() {
        if(this._showContent() === false) {
            this._showBackdrop.set(true);
            await Tools.Sleep(100);             
            this._showContent.set(true);
            await Tools.Sleep(500);
            this.onOpen.emit(); 
        }
    }  
}