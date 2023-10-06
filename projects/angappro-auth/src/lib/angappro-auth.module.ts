import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { BannerComponent } from './components/banner/banner.component';
import {RouterModule} from "@angular/router";
import {NavDropdownComponent} from "./components/nav-dropdown/nav-dropdown.component";
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./interceptor/token.interceptor";
import {AuthService} from "./services/auth.service";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    BannerComponent,
    NavDropdownComponent
  ],
  exports: [
    BannerComponent,
  ],
  providers: [
    // Je fournis à mon contexte un intercepteur par sa classe en lui permettant de travailler sur plusieurs requêtes
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    FormsModule,
    AuthenticationRoutingModule
  ]
})
export class AngapproAuthModule { }
