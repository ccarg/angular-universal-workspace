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
