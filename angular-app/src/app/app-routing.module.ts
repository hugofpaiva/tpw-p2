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
import {ShowDeveloperComponent} from './core/components/show-developer/show-developer.component';

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
              // component used to show developer
              {path: 'dev/:id', component: ShowDeveloperComponent},
              // component used to add/Edit Review
              {path: 'review', component: AddreviewComponent}
            ]
          },
        ]
      },
      {path: 'account', component: AccountclientComponent},
      {path: 'admin', component: AccountadminComponent},
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
