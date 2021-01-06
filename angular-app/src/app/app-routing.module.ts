import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreComponent} from './core/components/store/store.component';
import {InitialpageComponent} from './core/components/initialpage/initialpage.component';
import {AboutusComponent} from './core/components/aboutus/aboutus.component';
import {LoginComponent} from './core/components/login/login.component';
import {RegisterComponent} from './core/components/register/register.component';

const routes: Routes = [
  {path: '', component: InitialpageComponent},
  {path: 'shop', component: StoreComponent},
  {path: 'about_us', component: AboutusComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign_up', component: RegisterComponent},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
