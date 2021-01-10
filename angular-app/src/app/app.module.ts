import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { StoreComponent } from './core/components/store/store.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InitialpageComponent } from './core/components/initialpage/initialpage.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AboutusComponent } from './core/components/aboutus/aboutus.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { BasepageComponent } from './shared/components/basepage/basepage.component';
import {AuthHeaderInterceptor} from './core/interceptor/auth-header-interceptor';
import {DynamicScriptLoaderService} from './core/services/scripts/dynamic-script-loader-service.service';
import { ProductComponent } from './core/components/product/product.component';
import { AccountadminComponent } from './core/components/accountadmin/accountadmin.component';
import { DisplayReviewsComponent } from './core/components/show-reviews/display-reviews.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StoreComponent,
    InitialpageComponent,
    AboutusComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    BasepageComponent,
    ProductComponent,
    AccountadminComponent,
    DisplayReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    DynamicScriptLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
