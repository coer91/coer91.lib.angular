import { Component, computed, contentChildren, input, output, signal } from '@angular/core';
import { Collections, CONTROL_VALUE, ControlValue, HTMLElements, Tools } from 'coer91.angular/tools'; 
import { ITemplateRef, TemplateRefDirective } from 'coer91.angular/directives';

@Component({
    selector: 'coer-tab',
    templateUrl: './coer-tab.component.html', 
    styleUrl: './coer-tab.component.scss',
    providers: [CONTROL_VALUE(CoerTab)], 
    standalone: false
})
export class CoerTab extends ControlValue { 

    //Content
    private readonly _contentElements = contentChildren<any>(TemplateRefDirective);

    //Variables     
    protected override readonly _value  = signal<number>(0); 
    protected readonly _containerHeight = signal<number>(0);
    protected readonly _showingTab      = signal<boolean>(false);
     

    //input
    public override readonly value  = input<number>(0);
    public readonly useContainer    = input<boolean>(true); 
    public readonly width           = input<string>('100%');
    public readonly minWidth        = input<string>('100px');
    public readonly maxWidth        = input<string>('100%');
    public readonly height          = input<string>('350px');
    public readonly minHeight       = input<string>('330px');
    public readonly maxHeight       = input<string>('100%');
    public readonly siblings        = input<HTMLElement[]>([]);

    public override readonly marginTop   = input<string>('15px');
    public override readonly marginRight = input<string>('30px'); 
    public override readonly marginLeft  = input<string>('30px');

    //output 
    protected readonly onClickTab = output<number>(); 


    //AfterViewInit
    protected override async Start() {
        this._showingTab.set(true);
        this.CalculateHeight();
        Tools.Sleep().then(() => this.CalculateHeight());
    }  


    //Function
    private CalculateHeight() { 
        let container = this.useContainer() ? 60 : 40;
        for(const sibling of this.siblings()) {
            container += Number(HTMLElements.GetCssValue(sibling, 'margin-top').split('px')[0]);
            container += Number(HTMLElements.GetCssValue(sibling, 'margin-bottom').split('px')[0]);
            container += Number(HTMLElements.GetHeight(sibling).split('px')[0]); 
        }

        this._containerHeight.set(container);
    }


    //computed
    protected _height = computed<string>(() => { 
        if(this.height() === 'full') {
            let height = 0;
            height += 50; //Toolbar
            height += 50; //Page Title
            height += 35; //Container
            return `calc(100vh - ${height}px)`;
        } 

        return this.height();
    });
    

    //Computed
    protected _tabList = computed<any[]>(() => {
        const TAB_LIST = (this._contentElements() || []) as ITemplateRef[];
        return Collections.SetIndex([...TAB_LIST].filter(item => item.show()));
    }); 
    

    //Function
    protected _GetIcon = (templateRef: ITemplateRef): string => {
        return Tools.IsNotOnlyWhiteSpace(templateRef.icon()) ? templateRef.icon() : '';
    }


    //Function
    protected _GetLabel = (templateRef: ITemplateRef): string => {
        return Tools.IsOnlyWhiteSpace(templateRef.title()) ? templateRef.templateRef() : templateRef.title();
    }


    //Computed
    protected _GetContent = computed(() => {   
        return this._tabList().find(item => item.__index__ == this._value())?.template || null;
    }); 


    //Function
    protected _ClickTab(index: number) { 
        if(this._value() != index) { 
            const TAB = this._tabList().find(item => item.__index__ == index);
    
            if(TAB && !TAB.isReadonly() && !this.isReadonly()) {
                this._showingTab.set(false);
                this._SetValue(index);  
                this.onClickTab.emit(index);
            }  
           
            Tools.Sleep(300).then(() => this._showingTab.set(true));
        }
    }
}