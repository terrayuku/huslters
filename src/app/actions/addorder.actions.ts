
import {Action} from '@ngrx/store';
export enum OrderActionTypes {
  Add = '[Order Component] Add',
  Remove = '[Order Component] Remove'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class AddOrder implements ActionEx {
  readonly type = OrderActionTypes.Add;
  constructor(public payload: any) {
  }
}
export class OrderRemove implements ActionEx {
  readonly type = OrderActionTypes.Remove;
  constructor(public payload: any) {
  }
}
