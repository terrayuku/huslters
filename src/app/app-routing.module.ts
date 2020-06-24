import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditemComponent } from "./additem/additem.component";
import { HomeComponent } from "./home/home.component";
import { OrderComponent } from "./order/order.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CheckoutComponent } from "./checkout/checkout.component";

const routes: Routes = [
   { path: '', component: HomeComponent },
  { path: 'additem', component: AdditemComponent },
  { path: 'order', component: OrderComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'checkout/:url/:price/:description/:name', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
