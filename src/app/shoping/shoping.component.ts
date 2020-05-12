import { Component, OnInit } from '@angular/core';
import { AdditemService } from "../services/additem.service";

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {

  items = [];
  constructor(
    public addItemService: AdditemService
  ) { }

  ngOnInit(): void {
    this.getAllItems()
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

}
