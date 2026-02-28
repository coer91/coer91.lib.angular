import { IMenu } from "coer91.angular/interfaces";

export const NAVIGATION: IMenu[] = [   
    { label: 'Back End', icon: 'i91-logo-csharp-fill', show: 'LIST', items: [ 
        //About
        { label: 'About Library', icon: 'i91-logo-coer91', show: 'LIST', items: [ 
             
        ]},
    ]},

    { label: 'Front End', icon: 'i91-logo-angular-fill', show: 'LIST', items: [   
        //About
        { label: 'About Library', icon: 'i91-logo-coer91', show: 'LIST', items: [ 
            { label: 'Install', icon: '', path: '/front-end/about-library/install' },
        ]},  

        //Components
        { label: 'Components', icon: '', show: 'GRID', items: [ 
            { label: 'coer-button'   , icon: 'i91-hand-pointer-fill', path: '/front-end/components/coer-button'    },  
            { label: 'coer-modal'    , icon: 'i91-modal-fill',        path: '/front-end/components/coer-modal'     },
            { label: 'coer-secretbox', icon: 'i91-eye-slash-fill',    path: '/front-end/components/coer-secretbox' },
            { label: 'coer-selectbox', icon: 'i91-angle i91-90deg',   path: '/front-end/components/coer-selectbox' },
            { label: 'coer-textbox'  , icon: 'i91-input-text',        path: '/front-end/components/coer-textbox'   },  
        ]}  
    ]},  
];