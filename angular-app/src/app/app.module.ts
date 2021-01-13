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
import { AccountclientComponent } from './core/components/accountclient/accountclient.component';
import { ClientgenComponent } from './core/components/accountclient/clientgen/clientgen.component';
import { AddreviewComponent } from './core/components/add-review/addreview/addreview.component';
import {ClientpwComponent} from './core/components/accountclient/clientpw/clientpw.component';
import { ClientfavsComponent } from './core/components/accountclient/clientfavs/clientfavs.component';
import { AdminpurchasesComponent } from './core/components/accountadmin/adminpurchases/adminpurchases.component';
import { AdminusersComponent } from './core/components/accountadmin/adminusers/adminusers.component';
import { AdminappsComponent } from './core/components/accountadmin/adminapps/adminapps.component';
import { AdminadddevComponent } from './core/components/accountadmin/adminadddev/adminadddev.component';
import { AdminaddcatComponent } from './core/components/accountadmin/adminaddcat/adminaddcat.component';
import {AdminaddappComponent} from './core/components/accountadmin/adminaddapp/adminaddapp.component';
import { PurchaseComponent } from './core/components/purchase/purchase.component';
import { UpdatefavoritesComponent } from './core/components/updatefavorites/updatefavorites.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { ClientappsComponent } from './core/components/accountclient/clientapps/clientapps.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteReviewComponent } from './core/components/delete-review/delete-review.component';
import { ClientrevsComponent } from './core/components/accountclient/clientrevs/clientrevs.component';


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
    AccountclientComponent,
    ClientgenComponent,
    AddreviewComponent,
    ClientpwComponent,
    ClientfavsComponent,
    AdminpurchasesComponent,
    AdminusersComponent,
    AdminappsComponent,
    AdminadddevComponent,
    AdminaddcatComponent,
    PurchaseComponent,
    UpdatefavoritesComponent,
    AlertComponent,
    ClientappsComponent,
    AdminaddappComponent,
    DeleteReviewComponent,
    ClientrevsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule
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
