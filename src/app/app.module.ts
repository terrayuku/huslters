import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from "../environments/environment";
import { AdditemComponent } from './additem/additem.component';
import { HomeComponent } from './home/home.component';
import { ShopingComponent } from './shoping/shoping.component';

@NgModule({
  declarations: [
    AppComponent,
    AdditemComponent,
    HomeComponent,
    ShopingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
