import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {FrameworkEducativoModule} from './framework-educativo/framework-educativo.module';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
