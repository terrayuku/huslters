
import {ActionEx, OrderActionTypes} from '../actions/addorder.actions';
export const initialState = [];
export function OrderReducer(state = initialState, action: ActionEx) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case OrderActionTypes.Add:
      return [...state, action.payload];
    case OrderActionTypes.Remove:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
}
