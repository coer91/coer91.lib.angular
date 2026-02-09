import { IMenu } from "coer91.angular/interfaces";

export const NAVIGATION: IMenu[] = [  
    { label: 'Coer 91'   , icon: 'i91-logo-coer91', path: '/components/coer-button'    },  
    
    { label: 'Back End', icon: 'i91-logo-csharp-fill', show: 'LIST', items: [ 
          
    ]},

    { label: 'Front End', icon: 'i91-logo-angular-fill', show: 'LIST', items: [ 
        { label: 'Components', icon: '', show: 'GRID', items: [ 
            { label: 'coer-button', icon: 'i91-hand-pointer-fill', path: '/components/coer-button'    },  
            { label: 'coer-modal' , icon: 'i91-hand-pointer-fill', path: '/components/coer-modal'    },  
        ]}  
    ]},  
];