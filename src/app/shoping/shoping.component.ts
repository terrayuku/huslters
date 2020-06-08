import { Component, OnInit } from '@angular/core';
import { AdditemService } from "../services/additem.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../services/order.service";

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  shoppingForm: FormGroup;
  orderForm: FormGroup;
  items = [];
  cartList = [];
  success: Boolean;
  error: Boolean;
  shopping: Boolean;
  constructor(
    public addItemService: AdditemService,
    public orderService: OrderService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllItems();
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

  showShop() {
    if(this.shopping)
      this.shopping = false;
    else
      this.shopping = true;
    console.log(this.shopping);
  }

  clear() {
    this.cartList = [];
  }

  ok() {
    this.success = false;
  }

  addToCart(value, item) {
    this.cartList.push({
      "item": item,
      "order": value
    });
    this.shoppingForm.reset();
    console.log(this.cartList);
  }

  order(user) {
    this.orderService.order(this.cartList, user)
      .then(res => {
        this.success = true;
        this.shoppingForm.reset();
        this.cartList = [];
      })
      .catch(err => {
        this.error = false;
      });
  }

}
