import { IMenu } from "coer91.angular/interfaces";

export const NAVIGATION: IMenu[] = [   
    //{ Label: 'Back End', Icon: 'i91-logo-csharp-fill', MenuType: 'LIST', Items: [ 
        
    //]},

    { Label: 'Front End', Icon: 'i91-logo-angular-fill', MenuType: 'LIST', Items: [   
        { Label: 'Install', Icon: 'i91-logo-coer91', Path: '/front-end/install' },  

        { Label: 'Components', Icon: '', MenuType: 'GRID', Items: [ 
            { Label: 'Accordion'   , Icon: 'i91-square-half i91-90deg', Path: '/front-end/components/coer-accordion'  },  
            { Label: 'Button'      , Icon: 'i91-hand-pointer-fill'    , Path: '/front-end/components/coer-button'     }, 
            { Label: 'Datebox'     , Icon: 'i91-calendar-days'        , Path: '/front-end/components/coer-datebox'    },  
            { Label: 'Form'        , Icon: 'i91-file-edit-fill'       , Path: '/front-end/components/coer-form'       },  
            { Label: 'Grid'        , Icon: 'i91-table-list'           , Path: '/front-end/components/coer-grid'       },  
            { Label: 'Loading'     , Icon: 'i91-arrows-rotate'        , Path: '/front-end/components/coer-loading'    },  
            { Label: 'Modal'       , Icon: 'i91-modal-fill'           , Path: '/front-end/components/coer-modal'      },
            { Label: 'Numberbox'   , Icon: 'i91-123'                  , Path: '/front-end/components/coer-numberbox'  },
            { Label: 'Page Title'  , Icon: 'i91-signpost-double-fill' , Path: '/front-end/components/coer-page-title' },
            { Label: 'Radio Button', Icon: 'i91-radio-button'         , Path: '/front-end/components/coer-radio'      },
            { Label: 'Secretbox'   , Icon: 'i91-eye-slash-fill'       , Path: '/front-end/components/coer-secretbox'  },
            { Label: 'Selectbox'   , Icon: 'i91-angle i91-90deg'      , Path: '/front-end/components/coer-selectbox'  },
            { Label: 'Switch'      , Icon: 'i91-switch-on'            , Path: '/front-end/components/coer-switch'     },
            { Label: 'Tab Panel'   , Icon: 'i91-ellipsis'             , Path: '/front-end/components/coer-tab'        },
            { Label: 'Text Area'   , Icon: 'i91-textarea'             , Path: '/front-end/components/coer-textarea'   },
            { Label: 'Textbox'     , Icon: 'i91-input-text'           , Path: '/front-end/components/coer-textbox'    },  
        ]},
        
        { Label: 'Styles', Icon: '', MenuType: 'GRID', Items: [ 
            { Label: 'Animation', Icon: '', Path: '/front-end/styles/animation' },  
            { Label: 'Border'   , Icon: '', Path: '/front-end/styles/border'    }, 
            { Label: 'Color'    , Icon: '', Path: '/front-end/styles/color'     },  
            { Label: 'Container', Icon: '', Path: '/front-end/styles/container' },  
            { Label: 'Cursor'   , Icon: '', Path: '/front-end/styles/cursor'    },  
        ]}
    ]},  
];