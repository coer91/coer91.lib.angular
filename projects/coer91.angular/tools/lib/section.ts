import { AfterViewInit, Component, inject, input, OnDestroy, signal } from "@angular/core"; 
import { CoerAlert } from "./coer-alert/coer-alert.component";  
import { Router } from "@angular/router";
import { Strings } from "./strings";
import { Tools } from "./generic";
import { ICallbackItem } from "coer91.angular/interfaces";

@Component({ template: '' })
export abstract class Section implements AfterViewInit, OnDestroy {

    //Injection
    protected readonly router = inject(Router);
    protected readonly alert  = new CoerAlert(); 
    
    //Helper tools
    protected readonly IsNull              = Tools.IsNull;
    protected readonly IsNotNull           = Tools.IsNotNull;
    protected readonly IsOnlyWhiteSpace    = Tools.IsOnlyWhiteSpace;
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected readonly IsBooleanTrue       = Tools.IsBooleanTrue;
    protected readonly IsBooleanFalse      = Tools.IsBooleanFalse; 
    protected readonly Equals              = Strings.Equals;

    //Variables
    public readonly isLoading = signal<boolean>(false);

    //Inputs
    public readonly isLoadingExternal = input<boolean>(false);
    public readonly isUpdating        = input<boolean>(false);
    public readonly canCreate         = input<boolean>(false);
    public readonly canUpdate         = input<boolean>(false);
    public readonly canDelete         = input<boolean>(false); 

    ngAfterViewInit(): void {  
        Tools.Sleep().then(() => this.StartSection());
    } 


    ngOnDestroy(): void {
        this.Destroy();
    }


    /** Main method */
    protected StartSection(): void {}; 


    /** Main method */
    protected Destroy(): void {}; 


    /** */
    protected Log(value: any, logName: string | null = null): void {
        if (Tools.IsNotNull(logName)) console.log({ log: logName, value });
        else console.log(value);
    } 


    /** */
    protected iconTemplate = (data: ICallbackItem<any>): string => {
        return `<i class='${data.row.Icon}'></i>`;
    } 


    /** */
    protected isActiveTemplate = (data: ICallbackItem<any>): string => {
        return Tools.IsBooleanTrue(data.row?.IsActive) 
            ? `<span class='color-green font-weight-bold'>ACTIVE</span>` 
            : `<span class='color-gray font-weight-bold'>DISABLED</span>`;
    } 
}