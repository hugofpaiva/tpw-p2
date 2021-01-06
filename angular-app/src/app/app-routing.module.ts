import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreComponent} from './core/components/store/store.component';
import {InitialpageComponent} from './core/components/initialpage/initialpage.component';
import {AboutusComponent} from './core/components/aboutus/aboutus.component';

const routes: Routes = [
  {path: 'initial', component: InitialpageComponent},
  {path: 'shop', component: StoreComponent},
  {path: 'about_us', component: AboutusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
