import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { OrderReducer } from './reducers/order.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from "../environments/environment";
import { AdditemComponent } from './additem/additem.component';
import { HomeComponent } from './home/home.component';
import { ShopingComponent } from './shoping/shoping.component';
import { OrderComponent } from './order/order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AdditemComponent,
    HomeComponent,
    ShopingComponent,
    OrderComponent,
    DashboardComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
    StoreModule.forRoot({ orders: OrderReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
