import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreComponent} from './components/store/store.component';
import {InitialpageComponent} from './components/initialpage/initialpage.component';

const routes: Routes = [
  {path: 'initial', component: InitialpageComponent},
  {path: 'shop', component: StoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
