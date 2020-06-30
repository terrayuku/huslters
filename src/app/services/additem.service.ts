import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdditemService {
  constructor(
    public db: AngularFireDatabase,
    public storage: AngularFireStorage
  ) { }

addItem(value, image) {
  console.log(value, image);
  return new Promise<any>((resolve, reject) => {
    const task = this.storage.ref("items/" + image.name).put(image);
    task.then(t => {
      if (t.task.snapshot.state === 'success') {
          t.task.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.db.database.ref("items/" + value.name)
              .set({
                itemName: value.name,
                itemPrice: value.price,
                itemDescription: value.description,
                itemOrder: value.itemOrder,
                itemUrl: downloadURL,
                id: value.id,
                category: value.category
              }).then(response => {
                console.log("Uploaded");
                resolve(response);
              }).catch(error => {
                console.log("Error Uploading");
                console.log(error);
              });
          });
        }
      });
    });
  }

  getAllItems() {
    return new Promise<any>((resolve, reject) => {
      this.db.list("items").snapshotChanges()
        .subscribe(items => {
          console.log(items);
          resolve(items);
        });
    });
  }

  getAllItemsInCategory(category) {
    console.log("service", category);
    return new Promise<any>((resolve, reject) => {
      firebase.storage().ref().child('items').child(category).listAll().then(res => {
        console.log("Category Items", res);
        resolve(res);
      }).catch(error => reject(error));
    })
  }
}
