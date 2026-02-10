import { Component, computed, effect, signal } from '@angular/core';
import { navigationSIGNAL, selectedMenuSIGNAL } from 'coer91.angular/signals';
import { Collections, Page, Strings, Tools } from 'coer91.angular/tools';
import { IMenu } from 'coer91.angular/interfaces';  


@Component({
    selector: 'menu-page',
    templateUrl: './menu.component.html', 
    styleUrl: './menu.component.scss',
    standalone: false
})
export class MenuPage extends Page { 
     
    //variables
    protected menu  = signal<IMenu[]>([]);
    protected title = signal<string>('Menu');

    constructor() { 
        super('Menu');

        effect(() => { 
            const TREE = selectedMenuSIGNAL()?.tree.filter(x => !Strings.Equals(x.id, 'GRID')) || [];

            if(TREE.length > 0) { 
                this.menu.set([]);
                this.title.set(TREE[0].label);
                this.SetPageName(TREE[TREE.length - 1].label); 
                const INDEX_MENU = Number(TREE[0].id.split('index')[1]);
                const MENU = navigationSIGNAL()[INDEX_MENU]?.items || [];
                                    
                if(TREE.length > 1) {
                    const INDEX_SUBMENU = Number(TREE[1].id.split('index')[1]);
                    const SUBMENU = MENU[INDEX_SUBMENU]?.items || [];
                    this.menu.set(SUBMENU);
                }

                else Tools.Sleep().then(() => this.menu.set(MENU));
            } 
        }); 
    }  


    //Function
    protected _isPage = (item: IMenu): boolean => {
        return Tools.IsNull(item?.items) && Tools.IsNotOnlyWhiteSpace(item?.path);
    }


    //Function
    protected _getPath = (item: IMenu): string | null => {
        return (this._isPage(item) && item.path!.length > 0) ? item.path! : null;
    } 
    
    
    //Computed
    protected _pages = computed<IMenu[]>(() => {
        return Collections.SetId(this.menu().filter(item => this._isPage(item)));
    });


    //Computed
    protected _submenu = computed<IMenu[]>(() => {
        return Collections.SetId(this.menu().filter(item => !this._isPage(item)));
    }); 
}