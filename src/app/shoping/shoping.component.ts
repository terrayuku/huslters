import { Component, OnInit, ViewChild} from '@angular/core';
import { AdditemService } from "../services/additem.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../services/order.service";
import * as firebase from 'firebase';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  listOfItemsInCategory = [];
  success: Boolean;
  error: Boolean;
  shopping: Boolean;
  id: String;
  itemName: String;
  itemUrl: String;
  itemPrice: String;
  itemDescription: String;
  selected: Boolean;
  order: Boolean;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  constructor(
    public addItemService: AdditemService,
    public orderService: OrderService,
    private fb: FormBuilder,
    private router: Router
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

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
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

  getAllItemsInCategory(category) {
    this.listOfItemsInCategory = [];
    this.addItemService.getAllItemsInCategory(category)
      .then(res => {
        res.items.forEach(element => {
          firebase.storage().ref().child(element.location.path).getDownloadURL().
            then(url => {
              this.listOfItemsInCategory.push(url);
            }).catch(error => {
              switch (error.code) {
                case 'storage/object-not-found':
                  // File doesn't exist
                  break;

                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
        });
      }).catch(error => console.log(error));
  }

  showShop() {
    if(this.shopping)
      this.shopping = false;
    else
      this.shopping = true;
    console.log(this.shopping);
  }

  checkout(url, image, price, description, name, id) {
    this.itemUrl = image;
    this.itemPrice = price;
    this.itemDescription = description;
    this.itemName = name;
    this.id = id;
    console.log(url, image, price, description, name, id);
    this.selected = true;
    this.shopping = false;
    // ['checkout', categoryItemUrl, item.itemPrice, item.itemDescription, item.itemName]
    // this.router.navigate([url, image, price, description, name]);
  }

  clear() {
    this.cartList = [];
  }

  removeItem(itemIndex) {
    this.cartList.slice(itemIndex, 1);
    for(var index = 0; index <= this.cartList.length; index++) {
      if(index === itemIndex) {
        this.cartList.splice(itemIndex, 1);
      }
    }
  }

  ok() {
    this.success = false;
    this.router.navigate(['']);
    this.shopping = true;
  }

  addToCart(item) {
    console.log(item);
    this.selected = false;
    this.shopping = true;
    this.cartList.push({
      "item": item
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
