const appSettings = { 
    appInfo: {
        id: 0,
        project: 'coer91',
        title: 'COER 91',
        version: '1.0.0', 
        imageURL: '',
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
        useJWT: true
    },
    dateTime: {
        format: 'MDY'
    },
    navigation: {
        static: true 
    }
}