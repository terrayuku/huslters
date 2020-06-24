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
    // this.createForm();
    this.getAllItems();
  }

  getAllItems() {
    this.addItemService.getAllItems()
      .then(items => {

        items.forEach(i => {
            this.items.push(i.payload.val());
        });
        console.log(this.items);
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

}
