import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../services/order.service";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ordersForm: FormGroup;
  loginForm: FormGroup;
  orders = [];
  objectKeys = Object.keys;
  loggedIn: Boolean;
  constructor(
    public orderService: OrderService,
    public afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.getAllOrders();
  }

  ngOnInit(): void {

    console.log(this.afAuth.currentUser);
  }

  createForm() {
    this.ordersForm = this.fb.group({
    });

    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  getAllOrders() {
    this.orderService.getAllOrders()
      .then(orders => {
        console.log(orders);
        orders.forEach(i => {
            console.log(i.payload.val(), i.payload.key);
            this.orders.push(i.payload.val());
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  doLogin(value){
    console.log(value);
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.loggedIn = true;
        console.log(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.signOut();
        this.loggedIn = false;
        resolve();
      }
      else{
        reject();
      }
    });
  }

}
