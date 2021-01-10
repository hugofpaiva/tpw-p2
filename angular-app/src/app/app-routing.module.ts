import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreComponent} from './core/components/store/store.component';
import {InitialpageComponent} from './core/components/initialpage/initialpage.component';
import {AboutusComponent} from './core/components/aboutus/aboutus.component';
import {LoginComponent} from './core/components/login/login.component';
import {RegisterComponent} from './core/components/register/register.component';
import {NotfoundComponent} from './core/components/notfound/notfound.component';
import {ProductComponent} from './core/components/product/product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: InitialpageComponent},
      {path: 'shop',
        children: [
          {path: '', component: StoreComponent},
          {path: 'product/:id', component: ProductComponent}
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
