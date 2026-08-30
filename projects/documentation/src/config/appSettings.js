const appSettings = { 
    appInfo: {
        id: 0,
        project: 'MySystem',
        title: 'COER 91',
        version: '1.0.0', 
        forCompany: 'COER System'
    },
    webAPI: {
        development: {
            mySystem: ''
        },
        staging: {
            mySystem: ''
        },
        production: {  
            mySystem: ''
        }
    },
    background: {
        home: 'coer-system-91.png',
        login: ''
    },
    security: {
        useJWT: false
    },
    region: {
        dateTime: 'MDY',
        language: 'en',
        currencyCode: 'MXN',
        currency: '$'
    }, 
    navigation: {
        static: true,
        showHome: true,
        redirectTo: '/home' 
    }
}