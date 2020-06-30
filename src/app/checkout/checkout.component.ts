import { Component, OnInit } from '@angular/core';
import { AdditemService } from "../services/additem.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../services/order.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  constructor(
    public addItemService: AdditemService,
    public orderService: OrderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllItems();
    console.log(this.route.snapshot.paramMap.get('url'),
    this.route.snapshot.paramMap.get('price'),
    this.route.snapshot.paramMap.get('description'),
    this.route.snapshot.paramMap.get('name')
  );
    this.itemUrl = this.route.snapshot.paramMap.get('url');
    this.itemPrice = this.route.snapshot.paramMap.get('price');
    this.itemDescription = this.route.snapshot.paramMap.get('description');
    this.itemName = this.route.snapshot.paramMap.get('name');
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
