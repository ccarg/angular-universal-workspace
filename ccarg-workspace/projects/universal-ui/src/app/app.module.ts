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
