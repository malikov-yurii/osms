import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged'

export interface Order {
  id: number,
  customerId: number,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  city: string,
  postOffice: string,
  totalSum: number,
  paymentType: string,
  date: string,
  status: string,
  comment: string,
  orderItemTos: any
}

export interface State {
  orders: Order[]
}

const defaultState: State = {
  orders: []
}

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private store = _store;
  changes = this.store.asObservable().distinctUntilChanged();

  setState(state: State) {
    this.store.next(state);
  }

  getState() {
    return this.store.value
  }

  purge() {
    this.store.next(defaultState)
  }

}
