import { IMenu } from "coer91.angular/interfaces";

export const NAVIGATION: IMenu[] = [   
    { Label: 'Back End', Icon: 'i91-logo-csharp-fill', MenuType: 'LIST', Items: [ 
        
    ]},

    { Label: 'Front End', Icon: 'i91-logo-angular-fill', MenuType: 'LIST', Items: [   
         
        { Label: 'Components', Icon: '', MenuType: 'GRID', Items: [ 
            { Label: 'coer-button'    , Icon: 'i91-hand-pointer-fill',   Path: '/front-end/components/coer-button'     },  
            { Label: 'coer-datebox'   , Icon: 'i91-calendar-days',       Path: '/front-end/components/coer-datebox'    },  
            { Label: 'coer-form'      , Icon: 'i91-form',                Path: '/front-end/components/coer-form'       },  
            { Label: 'coer-grid'      , Icon: 'i91-table-list',          Path: '/front-end/components/coer-grid'       },  
            { Label: 'coer-loading'   , Icon: 'i91-arrows-rotate',       Path: '/front-end/components/coer-loading'    },  
            { Label: 'coer-modal'     , Icon: 'i91-modal-fill',          Path: '/front-end/components/coer-modal'      },
            { Label: 'coer-numberbox' , Icon: 'i91-123',                 Path: '/front-end/components/coer-numberbox'  },
            { Label: 'coer-page-title', Icon: 'i91-signpost-doble-fill', Path: '/front-end/components/coer-page-title' },
            { Label: 'coer-secretbox' , Icon: 'i91-eye-slash-fill',      Path: '/front-end/components/coer-secretbox'  },
            { Label: 'coer-selectbox' , Icon: 'i91-angle i91-90deg',     Path: '/front-end/components/coer-selectbox'  },
            { Label: 'coer-switch'    , Icon: 'i91-switch-on',           Path: '/front-end/components/coer-switch'     },
            { Label: 'coer-tab'       , Icon: 'i91-tab',                 Path: '/front-end/components/coer-tab'        },
            { Label: 'coer-textbox'   , Icon: 'i91-input-text',          Path: '/front-end/components/coer-textbox'    },  
        ]}  
    ]},  
];