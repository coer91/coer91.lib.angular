import { IMenu } from "coer91.angular/interfaces";

export const NAVIGATION: IMenu[] = [   
    { Label: 'Back End', Icon: 'i91-logo-csharp-fill', MenuType: 'LIST', Items: [ 
        
    ]},

    { Label: 'Front End', Icon: 'i91-logo-angular-fill', MenuType: 'LIST', Items: [   
        //About
        { Label: 'About Library', Icon: 'i91-logo-coer91', MenuType: 'LIST', Items: [ 
            { Label: 'Install', Icon: '', Path: '/front-end/about-library/install' },
        ]},  

        //Components
        { Label: 'Components', Icon: '', MenuType: 'GRID', Items: [ 
            { Label: 'coer-button'   , Icon: 'i91-hand-pointer-fill', Path: '/front-end/components/coer-button'    },  
            { Label: 'coer-datebox'  , Icon: '',                      Path: '/front-end/components/coer-datebox'   },  
            { Label: 'coer-form'     , Icon: '',                      Path: '/front-end/components/coer-form'      },  
            { Label: 'coer-grid'     , Icon: '',                      Path: '/front-end/components/coer-grid'      },  
            { Label: 'coer-modal'    , Icon: 'i91-modal-fill',        Path: '/front-end/components/coer-modal'     },
            { Label: 'coer-numberbox', Icon: '',                      Path: '/front-end/components/coer-numberbox' },
            { Label: 'coer-secretbox', Icon: 'i91-eye-slash-fill',    Path: '/front-end/components/coer-secretbox' },
            { Label: 'coer-selectbox', Icon: 'i91-angle i91-90deg',   Path: '/front-end/components/coer-selectbox' },
            { Label: 'coer-switch'   , Icon: '',                      Path: '/front-end/components/coer-switch'    },
            { Label: 'coer-tab'      , Icon: '',                      Path: '/front-end/components/coer-tab'    },
            { Label: 'coer-textbox'  , Icon: 'i91-input-text',        Path: '/front-end/components/coer-textbox'   },  
        ]}  
    ]},  
];