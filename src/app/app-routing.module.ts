import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditemComponent } from "./additem/additem.component";
import { HomeComponent } from "./home/home.component";


const routes: Routes = [
   { path: '', component: HomeComponent },
  { path: 'additem', component: AdditemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
