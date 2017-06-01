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
  findAndUpdate(prop, id, fieldName, value): boolean {
    let updated = false;
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id && item[fieldName] !== value) {
        item[fieldName] = value;
        updated = true;
      }
      return item;
    })}));
    return updated;
  }
  findAndDelete(prop, id) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.filter(item => item.id !== id)}));
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
  findProductAndUpdate(prop, orderId, productId, fieldName, value): boolean {
    let updated = false;
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === orderId) {
        item.orderItemTos.map(product => {
          if (product.id === productId && product[fieldName] != value) {
            product[fieldName] = value;
            updated = true;
          }
          return product;
        });
      }
      return item;
    })}));
    return updated;
  }
  findProductAndDelete(prop, id, productId) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id) {
        item.orderItemTos = item.orderItemTos.filter(product => product.id !== productId);
      }
      return item;
    })}));
  }





  onGetState() {
    console.log(this.store.getState());
  }

}
