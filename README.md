# Upgrade Project

### STEP 1
``` 
    npm uninstall @angular/cli
    npm install @angular/cli@21.2.17 --save-dev
``` 

### STEP 2
```
    npm uninstall @angular/common --force
    npm uninstall @angular/compiler --force    
    npm uninstall @angular/core --force
    npm uninstall @angular/forms --force  
    npm uninstall @angular/platform-browser --force  
    npm uninstall @angular/router --force  
    npm uninstall @angular/service-worker --force 
    npm uninstall @angular/compiler-cli --force
    npm uninstall @angular/build --force
```

### STEP 3
```
    npm install @angular/common@21.2.17 --force
    npm install @angular/compiler@21.2.17 --force   
    npm install @angular/core@21.2.17 --force
    npm install @angular/forms@21.2.17 --force
    npm install @angular/platform-browser@21.2.17 --force 
    npm install @angular/router@21.2.17 --force    
    npm install @angular/service-worker@21.2.17 --force 
    npm install @angular/compiler-cli@21.2.17 --save-dev --force
    npm install @angular/build@21.2.17 --save-dev --force
```