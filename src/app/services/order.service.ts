import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    public db: AngularFireDatabase
  ) { }

  order(order, person) {
    return new Promise<any>((resolve, rejects) => {
      this.db.database.ref("orders/" + person.userName + "-" + person.userPhone).
        set({
          person: person,
          order: order
        }).then(response => {
          console.log("Ordered");
          resolve(response);
        }).catch(error => {
          console.log("Rejected order");
          rejects(error);
        });
    });
  }

  getAllOrders() {
    return new Promise<any>((resolve, reject) => {
      this.db.list("orders").snapshotChanges()
        .subscribe(orders => {
          resolve(orders);
        });
    });
  }
}
