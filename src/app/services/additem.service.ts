import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

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
                itemUrl: downloadURL
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
          resolve(items);
        });
    });
  }
}
