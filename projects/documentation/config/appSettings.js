const appSettings = { 
    appInfo: {
        id: 1,
        project: 'coer91.angular',
        title: 'COER 91',
        version: '1.0.0', 
        company: 'COER System',
        icon: 'i91-logo-coer91'
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
        home: '',
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