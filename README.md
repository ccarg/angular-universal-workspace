# angular-universal-workspace
create angular workspace with:
 - angular application
 - universal application 
 - shared library

1. Create empty workspace

```
ng new ccarg-workspace --create-application=false

Exclude routing and select stylesheet format:
    ? Would you like to add Angular routing? (y/N) N
    ? Which stylesheet format would you like to use?  
        > SCSS   
```
        
2. Change directory 

```
cd ccarg-workspace\
```

3. Create app

```
ng g application universal-ui
```

4. Upgrade application as universal

```
ng add @nguniversal/express-engine --clientProject universal-ui
```

5. Amend angular.json

initial:

```
        "server": {
          "builder": "@angular-devkit/build-angular:server",
          "options": {
            "outputPath": "dist/server",
            "main": "projects/universal-ui/src/main.server.ts",
            "tsConfig": "projects/universal-ui/tsconfig.server.json"
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            }
          }
        }
```

amended:

```
        "server": {
          "builder": "@angular-devkit/build-angular:server",
          "options": {
            "outputPath": "dist/server",
            "main": "projects/universal-ui/src/main.server.ts",
            "tsConfig": "projects/universal-ui/tsconfig.server.json"
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "projects/universal-ui/src/environments/environment.ts",
                  "with": "projects/universal-ui/src/environments/environment.prod.ts"
                }
              ]
            }
          }
        }
```

6. Build and serve universal application

```
npm run build:ssr && npm run serve:ssr
```

7. Create and test serve second regular application

```
ng g application admin-ui
ng serve admin-ui
```

8. Create shared library and build it

```
ng generate library utils-lib --prefix=ccarg
```

9. Create sayHello function in utils service, utils-lib.service.ts

```javascript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsLibService {

  constructor() { }

  sayHello(appName: string): Observable<string>{
    return of(`service hello ${appName}`);
  }
}
```

10. Amend tsconfig.server.json

```
remove 
  "baseUrl": "."
  tsconfig.server.json to avoid exception:

  ERROR in projects\universal-ui\src\app\app.module.ts(12,5): Error during template compile of 'AppModule'
    Could not resolve utils-lib relative to [object Object]..
  projects/universal-ui/src/app/app.module.ts(3,32): error TS2307: Cannot find module 'utils-lib'.
```

11. Amend admin-ui

  app.module.ts

```
    import { UtilsLibModule } from 'utils-lib';
    ...
    imports: [
      ...
      UtilsLibModule
    ]
```

  app.component.ts

```
    import { Component } from '@angular/core';
    import { Observable } from 'rxjs';
    import { UtilsLibService } from 'utils-lib';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {

      title = 'admin-ui';
      title$: Observable<string>;

      constructor(private utils: UtilsLibService) {
        this.title$ = utils.sayHello(this.title)
      }
    }    
```

  app.component.html

```
  ...
  <hr>
    {{title$ | async}}
  <hr>  
  ...
```

12. Amend universal-ui

  app.module.ts

```
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { UtilsLibModule } from 'utils-lib';
    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        UtilsLibModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
```

  app.component.ts

```
    import { Component } from '@angular/core';
    import { Observable } from 'rxjs';
    import { UtilsLibService } from 'utils-lib';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {

      title = 'universal-ui';
      title$: Observable<string>;

      constructor(private utils: UtilsLibService) {
        this.title$ = utils.sayHello(this.title)
      }
    }    
```

  app.component.html

```
  ...
  <hr>
    {{title$ | async}}
  <hr>  
  ...  
```

13. Build library and serve both UIs to test test

```
ng build utils-lib
npm run build:ssr && npm run serve:ssr
ng serve admin-ui
```