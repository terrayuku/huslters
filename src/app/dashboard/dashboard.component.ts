import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../services/order.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ordersForm: FormGroup;
  orders = [];
  objectKeys = Object.keys;
  constructor(
    public orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.getAllOrders();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.ordersForm = this.fb.group({
    });
  }

  getAllOrders() {
    this.orderService.getAllOrders()
      .then(orders => {
        console.log(orders);
        orders.forEach(i => {
            // console.log(i.payload.val(), i.payload.key);
            this.orders.push(i.payload.val());
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

}
