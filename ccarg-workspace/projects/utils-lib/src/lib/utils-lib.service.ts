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
