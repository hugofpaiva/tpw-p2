import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { StoreComponent } from './core/components/store/store.component';
import {FormsModule} from '@angular/forms';
import { InitialpageComponent } from './core/components/initialpage/initialpage.component';
import {HttpClientModule} from '@angular/common/http';
import { AboutusComponent } from './core/components/aboutus/aboutus.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StoreComponent,
    InitialpageComponent,
    AboutusComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
