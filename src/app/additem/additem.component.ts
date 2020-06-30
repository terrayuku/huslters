import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditemService } from "../services/additem.service";

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  addItemForm: FormGroup;
  image: File;
  constructor(
    private fb: FormBuilder,
    public addItemService: AdditemService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      itemOrder: ['', Validators.required],
      image: ['', Validators.required],
      id: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  browse(event) {
    this.image = event.target.files[0];
  }

  addItem(value) {
    console.log(value, this.image);
    this.addItemService.addItem(value, this.image);
  }

}
