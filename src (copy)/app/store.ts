import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { Injectable }        from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';

import { IState }            from './models/index';

const defaultState: IState = {
  order: [],
  product: [],
  productAggregators: [],
  customer: []
};

const _store = new BehaviorSubject<IState>(defaultState);

@Injectable()
export class Store {
  private store = _store;
  changes = this.store.asObservable().distinctUntilChanged();

  setState(state: IState) {
    this.store.next(state);
  }

  getState() {
    return this.store.value;
  }

  purge() {
    this.store.next(defaultState);
  }

}
