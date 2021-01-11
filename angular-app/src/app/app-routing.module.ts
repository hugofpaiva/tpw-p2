import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreComponent} from './core/components/store/store.component';
import {InitialpageComponent} from './core/components/initialpage/initialpage.component';
import {AboutusComponent} from './core/components/aboutus/aboutus.component';
import {LoginComponent} from './core/components/login/login.component';
import {RegisterComponent} from './core/components/register/register.component';
import {NotfoundComponent} from './core/components/notfound/notfound.component';
import {ProductComponent} from './core/components/product/product.component';
import {AccountadminComponent} from './core/components/accountadmin/accountadmin.component';
import {AccountclientComponent} from './core/components/accountclient/accountclient.component';
import {AddreviewComponent} from './core/components/add-review/addreview/addreview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: InitialpageComponent},
      {path: 'shop',
        children: [
          {path: '', component: StoreComponent},
          {path: 'product/:id',
            children: [
              {path: '', component: ProductComponent},
              // component used to add/Edit Review
              {path: 'review', component: AddreviewComponent}
            ]
          },
        ]
      },
      {path: 'accountclient', component: AccountclientComponent},
      {path: 'accountadmin', component: AccountadminComponent},
      {path: 'admin',
        children: [
          {path: 'purchases', component: StoreComponent},//TODO AdminPurchasesComponent
          {path: 'users', component: ProductComponent},//TODO AdminUsersComponent
          {path: 'apps',
            children: [
              {path: '', component: StoreComponent},//TODO AdminAppsComponent
              {path: 'add', component: StoreComponent},//TODO AdminAddAppComponent
            ]
          },
          {path: 'developers', component: ProductComponent},//TODO AdminDeveloperComponent
          {path: 'categories', component: ProductComponent},//TODO AdminCategoriesComponent
        ]
      },
      {path: 'about_us', component: AboutusComponent},
      {path: 'login', component: LoginComponent},
      {path: 'sign_up', component: RegisterComponent},

    ],
  },
  {path: 'not_found', component: NotfoundComponent},

  { path: '**', redirectTo: 'not_found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
