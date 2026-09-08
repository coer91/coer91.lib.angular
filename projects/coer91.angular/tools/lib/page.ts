import { IAppSource, ICallbackItem, ICellSwitch, ITitleBreadcrumb, ITitleGoBack } from 'coer91.angular/interfaces';
import { AfterViewInit, Component, computed, Inject, inject, OnDestroy, signal } from "@angular/core"; 
import { CoerAlert } from "./coer-alert/coer-alert.component";
import { ActivatedRoute, Router } from "@angular/router";
import { BreadcrumbsPage } from "./page-breadcrumbs";
import { ResponsePage } from "./page-response"; 
import { FiltersPage } from "./page-filters"; 
import { Translatory } from "./translatory";
import { Collections } from "./collections";
import { SourcePage } from "./page-source";
import { Navigation } from "./navigation";
import { Strings } from "./strings";
import { Tools } from "./generic";
import { Access } from "./access";

@Component({ template: '' })
export abstract class Page implements AfterViewInit, OnDestroy {

    //Injection
    protected readonly router = inject(Router);
    protected readonly alert = new CoerAlert();
    protected translatory = new Translatory('en');
    private readonly _activatedRoute = inject(ActivatedRoute);  

    /** */
    protected readonly isUpdating = signal<boolean>(false);

    /** */
    protected readonly isLoading = signal<boolean>(true);

    /** */
    protected readonly canCreate = signal<boolean>(false);
    
    /** */
    protected readonly canUpdate = signal<boolean>(false);

    /** */
    protected readonly canDelete = signal<boolean>(false);

    /** */
    protected readonly breadcrumbs = signal<ITitleBreadcrumb[]>([]);

    /** */
    protected readonly responsePage = signal<any>(null);

    /** */
    protected readonly filters = signal<any>({});


    /** */
    protected readonly pageTitle = signal<string>('');

    /** */
    protected readonly language = signal<'en' | 'es' | 'fr' | 'ko' | 'zh'>('en');

    /** */
    protected goBack: ITitleGoBack = { show: false }; 

    /** */
    protected isReadonly = computed(() => {
        return (this.isUpdating()  && !this.canUpdate()) 
            || (!this.isUpdating() && !this.canCreate())
    });
    
    //Helper tools
    protected readonly IsNull = Tools.IsNull;
    protected readonly IsNotNull = Tools.IsNotNull;
    protected readonly IsOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected readonly IsBooleanTrue  = Tools.IsBooleanTrue;
    protected readonly IsBooleanFalse = Tools.IsBooleanFalse;
    protected readonly SetId = Collections.SetId; 
    protected readonly SetIndex = Collections.SetIndex;
    protected readonly Equals = Strings.Equals;

    //Private Variables
    private _path: string = '';
    private _pageName: string = '';
    private _sourcePage: IAppSource | null = null; 
    private _routeParams: any;
    private _queryParams: any;

    /** */
    constructor(@Inject(String) pageName: string) {         
        this._SetPath();
        
        if(Tools.IsOnlyWhiteSpace(this.GetParam('__menuId__'))) {
            this._SetAccess();
            this._SetLanguage();
            this.SetSource(pageName);
            this.SetPageName(pageName);
            this._sourcePage = SourcePage.Get();
            this._SetBreadcrumbs();
            this._SetGoBack();
            this.filters.set(FiltersPage.Get(this._path));
            this._GetResponsePage(); 
        }
    }  


    ngAfterViewInit(): void {  
        Tools.Sleep().then(() => this.StartPage());
    } 


    ngOnDestroy(): void {
        this.Destroy();
    }


    /** Main method */
    protected StartPage(): void {}; 


    /** Main method */
    protected Destroy(): void {};   


    //Function
    private _SetPath() {
        this._routeParams = this._activatedRoute.snapshot.params;
        this._queryParams = this._activatedRoute.snapshot.queryParams; 
       
        this._path = this.router.url; 

        if (this._path.includes('?')) {
            this._path = this._path.split('?')[0];
        }  
    }


    //Function
    private async _SetAccess(): Promise<void> {
        await Tools.Sleep();
        const activeKey = this._activatedRoute.snapshot.data['activeKey'] as string;        
        
        if(Tools.IsNotOnlyWhiteSpace(activeKey)) {
            const GetNavigationKeys = this._activatedRoute.snapshot.data['GetNavigationKeys'];               

            if(Tools.IsFunction(GetNavigationKeys)) {  
                const NAVIGATION_KEYS: any[] = Array.from(GetNavigationKeys().values()).filter((x: any) => Tools.IsNotOnlyWhiteSpace(x.activeKey));
                
                const ACTIVE_KEY = NAVIGATION_KEYS.find(x => x.activeKey === activeKey.toUpperCase());
                                 
                if(ACTIVE_KEY) {
                    this.canCreate.set(ACTIVE_KEY.canCreate);
                    this.canUpdate.set(ACTIVE_KEY.canUpdate);
                    this.canDelete.set(ACTIVE_KEY.canDelete);    
                }  
            } 
        }  
    } 


    //Function
    private async _SetLanguage(): Promise<void> { 
        const Language: any = Access.GetUser()?.Language;
        this.language.set(Tools.IsNotOnlyWhiteSpace(Language) ? Language : null);
        this.translatory = new Translatory(this.language());
    } 


    /** */
    protected SetSource(pageName: string): void {         
        SourcePage.Set(pageName, this._path);
        this.pageTitle.set(Navigation.GetPageTitle());
    }   


    /** */
    protected SetPageName(pageName: string, id?: string | number): void {
        this._pageName = pageName; 

        if (Tools.IsNotOnlyWhiteSpace(id)) {
            const PATH_ARRAY = this._path.split('/');             
            PATH_ARRAY[PATH_ARRAY.length - 1] = String(id);
            this._path = PATH_ARRAY.join('/');
        }         

        if (BreadcrumbsPage.Get().pop()?.page != pageName) {  
            BreadcrumbsPage.UpdateLast(pageName, this._path);   
            this._SetBreadcrumbs();
        }          

        this.router.navigateByUrl(this._path);  
    }  


    //Function
    private _SetBreadcrumbs(): void {  
        const breadcrumbs = BreadcrumbsPage.Get();
            
        if(breadcrumbs.length > 1) {
            const last = breadcrumbs.pop(); 
            const last2 = breadcrumbs.pop(); 

            if(last?.path === last2?.path) {
                BreadcrumbsPage.RemoveLast();
            } 
        }

        const BREADCRUMBS: IAppSource[] = BreadcrumbsPage.Get().map(item => ({
            page: item.page,
            path: item.path,
            click: () => BreadcrumbsPage.RemoveByPath(item.path)
        })); 

        if(BREADCRUMBS.length <= 0) { 
            BREADCRUMBS.push({ page: this._pageName, path: this._path });
        }

        this.breadcrumbs.set([...BREADCRUMBS]); 
    }


    //Function
    private _SetGoBack(): void { 
        this.goBack = {
            show: Tools.IsNotNull(this._sourcePage),
            path: this._sourcePage?.path,
            click: () => BreadcrumbsPage.RemoveLast()
        }; 
    }       


    /** */
    protected SetResponsePage<T>(response: T): void { 
        ResponsePage.Set(this._path, '', response); 
    }; 


    //Function
    private _GetResponsePage(): void {
        const responsePage = ResponsePage.Get<any>(); 

        if(Tools.IsNotOnlyWhiteSpace(responsePage?.sender)) {
            if(responsePage.sender != this._path) { 
                ResponsePage.Set('', this._path, responsePage.response); 
                this.responsePage.set({ ...responsePage.response }); 
            }
        } 
        
        else if(Tools.IsNotOnlyWhiteSpace(responsePage?.receiver)) {
            if(responsePage.receiver == this._path) {  
                this.responsePage.set({ ...responsePage.response }); 
            }

            else {
                ResponsePage.Remove();
            }
        }
    };


    /** Navigate to previous page */
    protected GoToSource<T>(responsePage?: T): void {
        if(this._sourcePage) {
            BreadcrumbsPage.RemoveLast();
            this.SetResponsePage(responsePage);
            this.RemovePageFilter();
            Tools.Sleep().then(() => this.router.navigateByUrl(this._sourcePage!.path)); 
        }
    }; 


    /** */
    protected ReloadPage(): void {
        this.isLoading.set(true); 
        BreadcrumbsPage.RemoveLast(); 
        Tools.Sleep().then(() => window.location.reload());
    }


    /** */
    protected SetPageFilters<T>(filters: T): void {
        const FILTERS = Tools.BreakReference<T>(filters);
        this.filters.set(FILTERS);
        FiltersPage.Set(this._path, FILTERS); 
    }


    /** */
    protected RemovePageFilter(): void { 
        FiltersPage.Remove(this._path); 
        this.filters.set({});
    }


    /** */
    protected GetParam(param: string, origin?: 'ROUTE_PARAMS' | 'QUERY_PARAMS'): string { 
        return origin != 'QUERY_PARAMS' 
            ? this._routeParams[param] || ''
            : this._queryParams[param] || '';
    }


    /** */
    protected Log(value: any, logName: string | null = null): void {
        if (Tools.IsNotNull(logName)) console.log({ log: logName, value });
        else console.log(value);
    } 


    /** */
    protected iconTemplate = (data: ICallbackItem<any>): string => {
        return `<i class='${data.value}'></i>`;
    } 


    /** */
    protected isActiveTemplate = (data: ICallbackItem<any>): string => {
        return data.value 
            ? `<span class='color-green font-weight-bold'>ACTIVE</span>` 
            : `<span class='color-gray font-weight-bold'>DISABLED</span>`;
    } 


    /** */
    protected switchTemplate = (_: ICallbackItem<any>): ICellSwitch => {
        return {
            showInput: true,
            isReadonly: this.isLoading() || this.isReadonly()
        }
    }  
}