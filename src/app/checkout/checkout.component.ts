import { Component, OnInit, Inject } from '@angular/core';
import { AdditemService } from "../services/additem.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../services/order.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AddOrder, OrderRemove } from '../actions/addorder.actions';
import {Order} from '../models/order';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  shoppingForm: FormGroup;
  orderForm: FormGroup;
  items = [];
  cartList = [];
  success: Boolean;
  order: Boolean;
  error: Boolean;
  shopping: Boolean;
  itemName: String;
  itemUrl: String;
  itemPrice: String;
  itemDescription: String;
  orders: Observable<Order[]>;
  url: string;

  constructor(
    public addItemService: AdditemService,
    public orderService: OrderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private store: Store<{ orders: Order[] }>
  ) {
    this.orders = store.pipe(select('orders'));
  }

  ngOnInit(): void {
    this.createForm();
    this.getAllItems();

    this.itemUrl = this.route.snapshot.paramMap.get('url');
    this.itemPrice = this.route.snapshot.paramMap.get('price');
    this.itemDescription = this.route.snapshot.paramMap.get('description');
    this.itemName = this.route.snapshot.paramMap.get('name');
    // var i;
    // for(i = 0; i > 1; i++) {
    //   console.log("Refresh")

    // }
  }


  createForm() {
    this.shoppingForm = this.fb.group({
      small: [null, Validators.required],
      medium: [null, Validators.required],
      large: [null, Validators.required],
      xlarge: [null, Validators.required],
      xxlarge: [null, Validators.required],
      quantity: [1, Validators.required],
      color: [null, Validators.required]
    });

    this.orderForm = this.fb.group({
      userName: ['', Validators.required],
      userPhone: ['', Validators.required]
    });
  }

  getAllItems() {
    this.addItemService.getAllItems()
      .then(items => {

        items.forEach(i => {
            this.items.push(i.payload.val());
        });

        this.items.sort((a, b) => a.itemOrder - b.itemOrder);
      })
      .catch(err => {
        console.log(err);
      })
  }

  clear() {
    this.cartList = [];
  }

  ok() {
    this.success = false;
    this.router.navigate(['']);
  }

  addToCart(value, item) {
    console.log(value, item);
    this.cartList.push({
      "item": item,
      "order": value
    });
    this.shoppingForm.reset();
    console.log(this.cartList);
  }

  addOrder(item) {
    // const order = new Order();
    // order.name = item.itemName;
    // order.description = item.itemDescription;
    // order.price = item.itemPrice;
    // order.color = item.itemColor;
    // order.quantity = item.itemQuantity;
    // order.url = item.itemUrl;
    //
    // console.log(order);
    //
    // this.store.dispatch(new AddOrder(order));
  }

  orderItem(user) {
    console.log(user, this.cartList);
    this.orderService.order(this.cartList, user)
      .then(res => {
        this.order = false;
        this.success = true;
        this.shoppingForm.reset();
        this.cartList = [];
      })
      .catch(err => {
        this.error = false;
      });
  }

}
