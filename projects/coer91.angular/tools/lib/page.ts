import { AfterViewInit, Component, Inject, inject } from "@angular/core"; 
import { CoerAlert } from "./coer-alert/coer-alert.component";
import { ActivatedRoute, Router } from "@angular/router";
import { IAppSource, ITitleBreadcrumb, ITitleGoBack } from "coer91.angular/interfaces";
import { BreadcrumbsPage } from "./page-breadcrumbs";
import { ResponsePage } from "./page-response"; 
import { FiltersPage } from "./page-filters"; 
import { SourcePage } from "./page-source";
import { Tools } from "./generic";

@Component({ template: '' })
export abstract class Page implements AfterViewInit {

    //Injection
    protected readonly router = inject(Router);
    protected readonly alert = new CoerAlert();
    private readonly _activatedRoute = inject(ActivatedRoute); 

    /** */
    protected isUpdatingPage: boolean = false;

    /** */
    protected isLoadingPage: boolean = false;

    /** */
    protected isReadonlyPage: boolean = true;

    /** */
    protected isReadyPage: boolean = false;   

    /** */
    protected breadcrumbsPage: ITitleBreadcrumb[] = [];

    /** */
    protected responsePage: any = null;

    /** */
    protected filtersPage: any = {};

    /** */
    protected goBackPage: ITitleGoBack = { show: false };  
   

    //Private Variables
    private _path: string = '';
    private _pageName: string = '';
    private _sourcePage: IAppSource | null = null; 
    private _routeParams: any;
    private _queryParams: any;

    /** */
    constructor(@Inject(String) pageName: string) {
        this._SetPath();
        this.SetPageName(pageName);
        SourcePage.Set(this._pageName, this._path);
        this._sourcePage = SourcePage.Get();
        this._SetBreadcrumbs();
        this._SetGoBack();
        this.filtersPage = FiltersPage.Get(this._path);
        this._GetResponsePage(); 
    } 


    ngAfterViewInit(): void {  
        Tools.Sleep().then(() => {
            this.isReadyPage = true;
            this.StartPage(); 
        });
    } 


    /** Main method */
    protected StartPage(): void {}; 


    //Function
    private _SetPath(): void {
        this._routeParams = this._activatedRoute.snapshot.params;
        this._queryParams = this._activatedRoute.snapshot.queryParams;
        this._path = this.router.url; 

        if (this._path.includes('?')) {
            this._path = this._path.split('?')[0];
        }
    }


    /** */
    protected SetPageName(pageName: string, id?: string | number): void {
        this._pageName = pageName; 

        if (Tools.IsNotOnlyWhiteSpace(id)) {
            const PATH_ARRAY = this._path.split('/');             
            PATH_ARRAY[PATH_ARRAY.length - 1] = String(id);
            this._path = PATH_ARRAY.join('/');
        }
         
        if (this.breadcrumbsPage.length > 0) { 
            this.breadcrumbsPage[this.breadcrumbsPage.length - 1].page = pageName;
            this.breadcrumbsPage[this.breadcrumbsPage.length - 1].path = this._path;
            BreadcrumbsPage.UpdateLast(pageName, this._path); 
        } 

        this.router.navigateByUrl(this._path);
    }  


    //Function
    private _SetBreadcrumbs(): void {       
        this.breadcrumbsPage = BreadcrumbsPage.Get().map(item => ({
            page: item.page,
            path: item.path,
            click: () => BreadcrumbsPage.RemoveByPath(item.path)
        }));  

        if(this.breadcrumbsPage.length <= 0) { 
            this.breadcrumbsPage = [{ page: this._pageName, path: this._path }];
        }
    }


    //Function
    private _SetGoBack(): void { 
        this.goBackPage = {
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
                this.responsePage = { ...responsePage.response }; 
            }
        } 
        
        else if(Tools.IsNotOnlyWhiteSpace(responsePage?.receiver)) {
            if(responsePage.receiver == this._path) {  
                this.responsePage = { ...responsePage.response }; 
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
        this.isLoadingPage = true; 
        BreadcrumbsPage.RemoveLast(); 
        Tools.Sleep().then(() => window.location.reload());
    }


    /** */
    protected SetPageFilters<T>(filters: T): void {
        this.filtersPage = Tools.BreakReference<T>(filters);
        FiltersPage.Set(this._path, this.filtersPage); 
    }


    /** */
    protected RemovePageFilter(): void { 
        FiltersPage.Remove(this._path); 
        this.filtersPage = {};
    }


    /** */
    protected GetParam(param: string, origin?: 'ROUTE_PARAMS' | 'QUERY_PARAMS'): string { 
        return origin != 'QUERY_PARAMS' 
            ? this._routeParams[param] || ''
            : this._queryParams[param] || '';
    }
}