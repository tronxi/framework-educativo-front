import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {FrameworkEducativoModule} from './framework-educativo/framework-educativo.module';
import {TokenInterceptorService} from './interceptors/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule, RouterModule,
    AppRoutingModule,
    FrameworkEducativoModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
