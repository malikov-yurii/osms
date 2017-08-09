import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';

import { Order, Product } from './models';


export interface State {
  order: Order[],
  product: Product[],
  customer: any[]
}

const defaultState: State = {
  order: [],
  product: [],
  customer: []
};

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private store = _store;
  changes = this.store.asObservable().distinctUntilChanged();

  setState(state: State) {
    this.store.next(state);
  }

  getState() {
    return this.store.value;
  }

  purge() {
    this.store.next(defaultState);
  }

}
