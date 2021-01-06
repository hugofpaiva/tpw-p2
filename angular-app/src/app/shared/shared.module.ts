import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasepageComponent} from './components/basepage/basepage.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {StoreComponent} from '../core/components/store/store.component';
import {InitialpageComponent} from '../core/components/initialpage/initialpage.component';
import {AboutusComponent} from '../core/components/aboutus/aboutus.component';
import {LoginComponent} from '../core/components/login/login.component';
import {RegisterComponent} from '../core/components/register/register.component';
import {NotfoundComponent} from '../core/components/notfound/notfound.component';
import {AppRoutingModule} from '../app-routing.module';


@NgModule({
  declarations: [

    FooterComponent,
    NavbarComponent,
    StoreComponent,
    InitialpageComponent,
    AboutusComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

  ],
  exports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreComponent,
    InitialpageComponent,
    AboutusComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    NavbarComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
