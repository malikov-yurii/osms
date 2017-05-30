import { Injectable } from '@angular/core';
import { Store } from '../store';
@Injectable()
export class StoreHelper {
  constructor(private store: Store) {}
  update(prop, state) {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, { [prop]: state }));
  }
  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
  }
  findAndUpdate(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id !== state.id) {
        return item;
      }
      return Object.assign({}, item, state)
    })}))
  }
  findAndAddProduct(prop, id, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id) {
        item.orderItemTos.push(state);
      }
      return item;
    })}));
  }
  findAndDelete(prop, id) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.filter(item => {console.log(item); return item.id !== id})}));
  }
  findProductAndDelete(prop, id, prodId) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id) {
        item.orderItemTos = item.orderItemTos.filter(product => product.orderItemId !== prodId);
      }
      return item;
    })}));
  }

  onGetState() {
    console.log(this.store.getState());
  }

}
