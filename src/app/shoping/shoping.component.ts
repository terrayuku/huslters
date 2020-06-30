import { Component, OnInit, ViewChild} from '@angular/core';
import { AdditemService } from "../services/additem.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../services/order.service";
import * as firebase from 'firebase';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

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

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  constructor(
    public addItemService: AdditemService,
    public orderService: OrderService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.createForm();
    this.getAllItems();
    this.getAllItemsInCategory('tshirts');
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
    console.log(category);
    this.addItemService.getAllItemsInCategory(category)
      .then(res => {
        res.items.forEach(element => {
          console.log("Element", element.location.path);
          firebase.storage().ref().child(element.location.path).getDownloadURL().
            then(url => {
              this.listOfItemsInCategory.push(url);
              console.log(this.listOfItemsInCategory);
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

}
