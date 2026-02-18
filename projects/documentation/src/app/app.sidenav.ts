import { IMenu } from "coer91.angular/interfaces";

export const NAVIGATION: IMenu[] = [  
    { label: 'Install'   , icon: 'i91-logo-coer91', path: '/install' },  
    
    { label: 'Back End', icon: 'i91-logo-csharp-fill', show: 'LIST', items: [ 
          
    ]},

    { label: 'Front End', icon: 'i91-logo-angular-fill', show: 'LIST', items: [ 

        //Components
        { label: 'Components', icon: '', show: 'GRID', items: [ 
            { label: 'coer-button'   , icon: 'i91-hand-pointer-fill', path: '/components/coer-button'    },  
            { label: 'coer-modal'    , icon: 'i91-modal-fill',        path: '/components/coer-modal'     },
            { label: 'coer-secretbox', icon: 'i91-eye-slash-fill',    path: '/components/coer-secretbox' },
            { label: 'coer-textbox'  , icon: 'i91-input-text',        path: '/components/coer-textbox'   },  
        ]}  
    ]},  
];