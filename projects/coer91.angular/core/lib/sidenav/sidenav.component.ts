import { SidenavAccordion } from './coer-sidenav-accordion/coer-sidenav-accordion.component'; 
import { Component, computed, effect, inject, input, output, signal, viewChildren } from '@angular/core';  
import { HTMLElements, Strings, Tools, Navigation, Collections, Screen } from 'coer91.angular/tools';
import { isLoadingSIGNAL, navigationSIGNAL, screenSizeSIGNAL, selectedMenuSIGNAL } from 'coer91.angular/signals';
import { IMenu, IMenuSelected } from 'coer91.angular/interfaces';
import { Router } from '@angular/router'; 
declare const appSettings: any;

@Component({
    selector: 'sidenav',
    templateUrl: './sidenav.component.html', 
    styleUrl: './sidenav.component.scss', 
    standalone: false
})
export class Sidenav {   

    //Elements 
    protected readonly _menuList = viewChildren(SidenavAccordion); 

    //Injections
    private readonly _router = inject(Router);

    //Variables    
    protected readonly show = signal<boolean>(true); 
    protected readonly _navigation = navigationSIGNAL;
    protected readonly _isLoading = isLoadingSIGNAL;
    protected readonly SetId = Collections.SetId;
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;

    //Inputs 
    public readonly navigation = input.required<IMenu[]>();  

    //Output 
    protected readonly onOpen  = output<void>();
    protected readonly onClose = output<void>();
 

    constructor() {
        Screen.ClickBrowserButton.subscribe(() => this._ClickBrowserButton()); 

        effect(() => {  
            const navigation = this.navigation();

            if(navigation.length > 0) {
                this._navigation.set(
                    !Tools.IsBooleanFalse(appSettings?.navigation?.showHome) 
                        ? [{ id: 1, label: 'Home', icon: 'i91-home-door-fill', path: '/home', items: null } as any].concat(this.navigation()) 
                        : this.navigation()
                );  
                 
                Tools.Sleep().then(() => this.SetSelectedMenu());
            }
        });

        effect(() => {
            const breakpoint = screenSizeSIGNAL().breakpoint; 
            if(breakpoint === 'xxl') this.Open();
            else this.Close();           
        }); 
    }   


    //Computed
    protected _width = computed<'width-sidenav' | 'width-40px cursor-pointer' | 'width-0px'>(() => {
        return this.show() 
            ? 'width-sidenav' 
            : (['xl', 'xxl'].includes(screenSizeSIGNAL().breakpoint) ? 'width-40px cursor-pointer' : 'width-0px');
    });


    //Function
    public async SetSelectedMenu(): Promise<void> {
        await Tools.Sleep();
        const navigation = this._navigation();

        
        this._GetSelectedMenuByPath("/install")
        
        if(navigation.length > 0) {                 

            const menu = Navigation.GetSelectedMenu() || this._GetSelectedMenuByPath(appSettings?.navigation?.redirectTo || 'home');   
             
            if(menu) {
                await Tools.Sleep(); 
                this._NavigateTo(menu, false);   
            }
        } 
    } 


    //Function
    protected _GetSelectedMenuByPath = (path: string): IMenuSelected | null => {
        if(!path.startsWith('/')) path = `/${path}`;
        const navigation = this._navigation();

        if(navigation.length > 0) { 
            
            let id     : any = this._IdGenerate(1, 0, 0, 0);
            let menu   : any = { ...navigation[0] };
            let level  : any = 'LV1';
            let action : any = 'NONE';
            let tree   : any = [{ id, label: navigation[0]?.label, icon: navigation[0]?.icon }]
    
            const ELEMENT = HTMLElements.SelectElement(`.${path?.replaceAll('/', '__')}`);
    
            if(ELEMENT) {
                const ID = ELEMENT.getAttribute('id');
    
                if(ID) {
                    id = ID;

                    //GET LEVEL
                    let [LV1, LV2, LV3, INDEX] = ID.split('-');
                    LV1 = LV1.split('id')[1]; 
                    LV2 = LV2.split('id')[1]; 
                    LV3 = LV3.split('id')[1]; 
                    INDEX = LV3.split('index')[0];

                    if(Number(LV3) > 0) level = 'LV3';
                    else if(Number(LV2) > 0) level = 'LV2'; 
                    else if(Number(LV1) > 0) level = 'LV1'; 

                    //GET MENU
                    const MENU = navigation.find(x => x.path === path); 

                    if(MENU) {
                        switch(level) {
                            case 'LV1': {
                                menu = { id: ID, label: MENU.label, icon: MENU.icon, path: MENU.path };
                                tree = [{ id: menu.id, label: menu.label, icon: menu?.icon }];
                                break;
                            }
                        }
                    }  
                }  
            }
    
            return { id, menu, level, action, tree }
        }

        return null;
    };


    //Function
    protected _IdGenerate = (lv1?: number, lv2?: number, lv3?: number, index?: number): string => {
        return `lv1id${lv1 || 0}-lv2id${lv2 || 0}-lv3id${lv3 || 0}-index${index || 0}`;
    };


    //Function
    protected _IsOption = (menu: IMenu): boolean => {
        return Tools.IsNull(menu?.items) && Tools.IsNotOnlyWhiteSpace(menu.path);
    }


    //Function
    protected _IsMenu = (item: IMenu): boolean => {
        return Tools.IsNotNull(item?.items) && Strings.Equals(item?.show, 'LIST');
    }  


    //Function
    protected _ClickOptionLv1(lv1: IMenu, lv1Id: string): void {
        if(!this.show()) return;

        this.ResetStorage(); 

        this._NavigateTo({
            id: lv1Id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }
            ]
        }, true);
    }


    //Function
    protected _ClickOptionLv2(lv2: IMenu, lv1: IMenu, lv2Id: string, lv1Id: string): void {
        if(!this.show()) return;

        this.ResetStorage();

        this._NavigateTo({
            id: lv2Id,
            menu: { ...lv2 }, 
            level: 'LV2',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }
            ]
        }, true);
    }


    //Function
    protected _ClickOptionLv3(lv3: IMenu, lv2: IMenu, lv1: IMenu, lv3Id: string, lv2Id: string, lv1Id: string): void {
        if(!this.show()) return;

        this.ResetStorage();

        this._NavigateTo({
            id: lv3Id,
            menu: { ...lv3 }, 
            level: 'LV3',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }, 
                { id: lv3Id, label: lv3.label, icon: lv3?.icon || '' }
            ]
        }, true);
    }


    //Function
    protected _ClickMenu(lv1: IMenu, action: 'OPEN' | 'CLOSED', lv1Id: string): void {
        if(!this.show()) return;
        
        if(action === 'OPEN') {
            this._NavigateTo({
                id: lv1Id,
                menu: { ...lv1 }, 
                level: 'LV1',
                action: action,
                tree: [
                    { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }
                ]
            }, false);
        }
    }


    //Function
    protected _ClickSubmenu(lv2: IMenu, lv1: IMenu, action: 'OPEN' | 'CLOSED', lv2Id: string, lv1Id: string): void {
        if(!this.show()) return;
        
        if(action === 'OPEN') {
            this._NavigateTo({
                id: lv2Id, 
                menu: { ...lv2 }, 
                level: 'LV2',
                action: action,
                tree: [
                    { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }, 
                    { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }
                ]
            }, false);
        }
    }


    //Function
    protected _ClickMenuGrid(lv1: IMenu, lv1Id: string): void {
        if(!this.show()) return;
        
        this.ResetStorage();

        this._NavigateTo({
            id: lv1Id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: 'GRID',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' }
            ]
        }, true);
    } 


    //Function
    protected _ClickSubmenuGrid(lv2: IMenu, lv1: IMenu, lv2Id: string, lv1Id: string): void {
        if(!this.show()) return;
        
        this.ResetStorage();

        this._NavigateTo({
            id: lv1Id,
            menu: { ...lv2 }, 
            level: 'LV2',
            action: 'GRID',
            tree: [
                { id: lv1Id, label: lv1.label, icon: lv1?.icon || '' },
                { id: lv2Id, label: lv2.label, icon: lv2?.icon || '' }
            ]
        }, true);
    } 


    //Function
    protected _NavigateTo(option: IMenuSelected, navigate: boolean): void {  
        const OPTION = { ...option }; 
         
        if(['NONE', 'GRID'].includes(OPTION.action)) {                           
            Tools.Sleep(0, 'update-menu-selected').then(() => {                 
                if(OPTION.action === 'GRID') {
                    if(!([...OPTION.tree].pop()?.id === 'GRID')) {
                        OPTION.tree.push({ id: 'GRID', label: 'Menu', icon: 'i91-grid' });
                    }
                     
                    if(navigate) this._router.navigateByUrl('/menu'); 
                }

                else {
                   if(navigate) this._router.navigateByUrl(String(OPTION?.menu?.path));
                } 

                if(['mv', 'xs', 'sm', 'md'].includes(screenSizeSIGNAL().breakpoint)) {
                    this.Close();
                }
            
                OPTION.menu.items = [];
                Navigation.SetSelectedMenu(OPTION);   
                selectedMenuSIGNAL.set(OPTION); 
                  
                console.log(OPTION.tree[0].id)
                HTMLElements.ScrollToElement(OPTION.tree[0].id, 'start');
                document.querySelectorAll<HTMLElement>('.selected').forEach(item => item.classList.remove('selected'));
                OPTION.tree.forEach(({ id }) => HTMLElements.AddClass(`#${id}`, 'selected')); 
                                
                //Close Menus
                for(const accordion of this._menuList() || []) {                
                    if(Strings.Equals(OPTION.level, 'LV1')) { 
                        if(!accordion.isCollapsed()) accordion.Close();
                    }
    
                    else if(Strings.Equals(OPTION.level, 'LV2')) {
                        if(Strings.Equals(OPTION.tree[0].id, accordion.id())) continue;
                        else accordion.Close();
                    }
                }  
            });
        }  

        else {    
            this._CloseMenus(OPTION);
        }    
    } 


    //Function
    protected _CloseMenus(option: IMenuSelected | null): void {        
        for(const accordion of this._menuList() || []) {
            if(option) {
                if(Strings.Equals(option.level, 'LV1')) {
                    if(Strings.Equals(accordion.id(), option.id)) { 
                        accordion.ScrollToElement();
                        continue;
                    }
    
                    else if(!accordion.isCollapsed()) accordion.Close();
                }
        
                else if(Strings.Equals(option.level, 'LV2')) {  
                    if(option.tree[0].id === accordion.id()) continue;
    
                    if(Strings.Equals(option.tree[1].id, accordion.id())) {
                        accordion.ScrollToElement();
                        continue;
                    }
                    if(!accordion.isCollapsed()) accordion.Close();                     
                }
            }

            else accordion.Close();
        }  
    } 


    //Function
    public ResetStorage(): void {
        const storage = (appSettings?.appInfo?.project as string).replaceAll(' ', '') || 'coer91';
        sessionStorage.removeItem(storage);
    }


    /** */
    public Toggle(): void {
        if(this.show()) this.Close();
        else this.Open();
    }
    
    
    /** */
    public Open(): void {
        this.show.set(true);
        this.onOpen.emit();
    }


    /** */
    public Close(): void {
        this.show.set(false);
        this._CloseMenus(null);
        this.onClose.emit();
    }  
    
    
    //Function 
    private _ClickBrowserButton(): void { 
        // const breadcrumbs = BreadcrumbsPage.Get();          

        // if(breadcrumbs.length > 0) {
        //     if(this._router.url === breadcrumbs.pop()?.path) {
        //         BreadcrumbsPage.RemoveLast();
        //     }
        // }
    }
}