import { SidenavAccordion } from './coer-sidenav-accordion/coer-sidenav-accordion.component'; 
import { Component, computed, effect, inject, input, output, signal, viewChildren } from '@angular/core';  
import { HTMLElements, Strings, Tools, Navigation, Collections, Screen } from 'coer91.angular/tools';
import { isLoadingSIGNAL, navigationSIGNAL, screenSizeSIGNAL, selectedMenuSIGNAL } from 'coer91.angular/signals';
import { IMenu, IMenuSelected } from 'coer91.angular/interfaces';
import { ResolveEnd, Router } from '@angular/router'; 
import { map } from 'rxjs/operators';
import { filter } from 'rxjs';
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
            const NAVIGATION = this.navigation();

            if(NAVIGATION.length > 0) {
                const NAVIGATION_HOME: IMenu[] = !Tools.IsBooleanFalse(appSettings?.navigation?.showHome) 
                    ? [{ id: 1, label: 'Home', icon: 'i91-home-door-fill', path: '/home' }] : []; 

                this._navigation.set(
                    ([] as IMenu[]) 
                    .concat(NAVIGATION_HOME)
                    .concat(NAVIGATION)
                );  
                 
                Tools.Sleep().then(() => this._SetSelectedMenu());
            }
        });

        effect(() => {
            const breakpoint = screenSizeSIGNAL().breakpoint; 
            if(breakpoint === 'xxl') this.Open();
            else this.Close();           
        }); 

        this._router.events
            .pipe(
                filter(event => event instanceof ResolveEnd),
                map((event: ResolveEnd) => ({ requested: event.url, resolved: event.urlAfterRedirects })) 
            )            
            .subscribe(url => { 
                if(url.requested != url.resolved) { 
                    this._ResetStorage();
                    this._SetSelectedMenu();
                }  
            }
        );
    }   


    //Computed
    protected _width = computed<'width-sidenav' | 'width-40px cursor-pointer' | 'width-0px'>(() => {
        return this.show() 
            ? 'width-sidenav' 
            : (['xl', 'xxl'].includes(screenSizeSIGNAL().breakpoint) ? 'width-40px cursor-pointer' : 'width-0px');
    });


    //Function
    protected async _SetSelectedMenu(): Promise<void> {
        await Tools.Sleep();
        const NAVIGATION = this._navigation(); 
        
        if(NAVIGATION.length > 0) {                 

            const PATH = appSettings?.navigation?.redirectTo || 'home';
            const SELECTED_MENU = Navigation.GetSelectedMenu() || this._GetSelectedMenuByPath(PATH);   
             
            if(SELECTED_MENU) { 
                this._NavigateTo(SELECTED_MENU, false);   
            }
        } 
    } 


    //Function
    protected _GetSelectedMenuByPath = (path: string): IMenuSelected | null => {
        if(!path.startsWith('/')) path = `/${path}`;
        const NAVIGATION = this._navigation();

        if(NAVIGATION.length > 0) { 
            
            let id     : any = this._IdGenerated(1, 0, 0, 0);
            let menu   : any = { ...NAVIGATION[0] };
            let level  : any = 'LV1';
            let action : any = 'NONE';
            let tree   : any = [{ id, label: NAVIGATION[0]?.label, icon: NAVIGATION[0]?.icon }]
    
            const ELEMENT = HTMLElements.SelectElement(`.${path?.replaceAll('/', '__')}`);
    
            if(ELEMENT) {
                const ELEMENT_ID = ELEMENT.getAttribute('id');
    
                if(ELEMENT_ID) {
                    id = ELEMENT_ID; 

                    const GET_FATHER = (ELEMENT: HTMLElement | null): HTMLElement | null => {
                        if(ELEMENT) {
                            let times = 10;  
                            let FATHER: HTMLElement | null = ELEMENT.getFather();
    
                            do { 
                                if(FATHER && HTMLElements.HasClass(FATHER, 'accordion-body')) {
                                    return FATHER.getFather()?.getChildren().find(x => HTMLElements.HasClass(x, 'accordion-header')) || null; 
                                }
    
                                else if(FATHER) {
                                    FATHER = FATHER.getFather();
                                    times--;
                                }
    
                                else break;
                            } while(times > 0);
                        }

                        return null;
                    } 

                    //GET LEVEL
                    let [LV1, LV2, LV3] = ELEMENT_ID.split('-');
                    LV1 = LV1.split('id')[1]; 
                    LV2 = LV2.split('id')[1]; 
                    LV3 = LV3.split('id')[1]; 


                    if(Number(LV3) > 0) {
                        level = 'LV3';

                        const SELECTED_MENU_LV1 = NAVIGATION
                            .filter(x => x.items && x.items.length > 0)
                            .find(x => x.items!.some(x => x.items?.some(x => x!.path === path)));  

                        const SELECTED_MENU_LV2 = NAVIGATION
                            .filter(x => x.items && x.items.length > 0).flatMap(x => x.items)
                            .find(x => x!.items!.some(x => x!.path === path)); 

                        const SELECTED_MENU_LV3 = NAVIGATION
                            .filter(x => x.items && x.items.length > 0).flatMap(x => x.items)
                            .filter(x => x && x.items && x.items.length > 0).flatMap(x => x!.items)
                            .find(x => x!.path === path);
                            
                        const ID_LV3 = ELEMENT_ID;

                        const ELEMENT_LV2 = GET_FATHER(ELEMENT);
                        const ID_LV2 = ELEMENT_LV2?.getAttribute('id');  

                        const ELEMENT_LV1 = GET_FATHER(ELEMENT_LV2);
                        const ID_LV1 = ELEMENT_LV1?.getAttribute('id'); 

                        if(SELECTED_MENU_LV1 && SELECTED_MENU_LV2 && SELECTED_MENU_LV3 && ID_LV1 && ID_LV2 && ID_LV3) { 
                            menu = { id: ID_LV3, label: SELECTED_MENU_LV3.label, icon: SELECTED_MENU_LV3.icon, path: SELECTED_MENU_LV3.path };
                            tree = [
                                { id: ID_LV1, label: SELECTED_MENU_LV1.label, icon: SELECTED_MENU_LV1?.icon },
                                { id: ID_LV2, label: SELECTED_MENU_LV2.label, icon: SELECTED_MENU_LV2?.icon },
                                { id: ID_LV3, label: SELECTED_MENU_LV3.label, icon: SELECTED_MENU_LV3?.icon }
                            ]; 
                        } 
                    }

                    else if(Number(LV2) > 0) {
                        level = 'LV2';
                        
                        const SELECTED_MENU_LV1 = NAVIGATION
                            .filter(x => x.items && x.items.length > 0)
                            .find(x => x.items!.some(x => x.items?.some(x => x!.path === path))); 

                        const SELECTED_MENU_LV2 = NAVIGATION
                            .filter(x => x.items && x.items.length > 0).flatMap(x => x.items)
                            .find(x => x!.path === path);
                            
                        const ID_LV2 = ELEMENT_ID;

                        const ELEMENT_LV1 = GET_FATHER(ELEMENT);
                        const ID_LV1 = ELEMENT_LV1?.getAttribute('id');

                        if(SELECTED_MENU_LV1 && SELECTED_MENU_LV2 && ID_LV1 && ID_LV2) { 
                            menu = { id: ID_LV2, label: SELECTED_MENU_LV2.label, icon: SELECTED_MENU_LV2.icon, path: SELECTED_MENU_LV2.path };
                            tree = [
                                { id: ID_LV1, label: SELECTED_MENU_LV1.label, icon: SELECTED_MENU_LV1?.icon },
                                { id: ID_LV2, label: SELECTED_MENU_LV2.label, icon: SELECTED_MENU_LV2?.icon } 
                            ]; 
                        } 
                    }

                    else {
                        level = 'LV1';
                        const SELECTED_MENU = NAVIGATION.find(x => x.path === path);

                        if(SELECTED_MENU) { 
                            menu =  { id: ELEMENT_ID, label: SELECTED_MENU.label, icon: SELECTED_MENU.icon, path: SELECTED_MENU.path };
                            tree = [{ id: ELEMENT_ID, label: SELECTED_MENU.label, icon: SELECTED_MENU?.icon }]; 
                        }
                    };  
                }  
            }
    
            return { id, menu, level, action, tree }
        }

        return null;
    };


    //Function
    protected _IdGenerated = (lv1?: number, lv2?: number, lv3?: number, index?: number): string => {
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

        this._ResetStorage(); 

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

        this._ResetStorage();

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

        this._ResetStorage();

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
        
        this._ResetStorage();

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
        
        this._ResetStorage();

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
    protected _ResetStorage(): void {
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