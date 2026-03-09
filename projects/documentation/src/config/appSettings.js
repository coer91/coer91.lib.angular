const appSettings = { 
    appInfo: {
        id: 0,
        project: 'MySystem',
        title: 'COER 91',
        version: '1.0.0', 
        forCompany: 'COER 91'
    },
    webAPI: {
        development: {
            mySystem: 'https://localhost:5001'
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
        login: 'clip.mp4'
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