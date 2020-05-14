import { Component, OnInit } from '@angular/core';
import { AdditemService } from "../services/additem.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  shoppingForm: FormGroup;
  items = [];
  cartList = [];
  constructor(
    public addItemService: AdditemService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllItems();
  }

  createForm() {
    this.shoppingForm = this.fb.group({
      amount: ['', Validators.required],
      small: ['', Validators.required],
      large: ['', Validators.required],
      xlarge: ['', Validators.required],
      xxlarge: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  getAllItems() {
    this.addItemService.getAllItems()
      .then(items => {
        console.log(items);
        items.forEach(i => {
            console.log(i.payload.val(), i.payload.key);
            this.items.push(i.payload.val());
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  addToCart(value, item) {
    console.log(value, item);
    this.cartList.push({
      "item": item,
      "order": value
    });

    console.log(this.cartList);
  }

}
