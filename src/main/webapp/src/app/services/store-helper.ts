import { Injectable } from '@angular/core';
import { Store } from '../store';

@Injectable()
export class StoreHelper {
  constructor(private store: Store) {}

  get(prop) {
    const currentState = this.store.getState();
    return currentState[prop];
  }

  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
  }

  addArrayLast(prop, state: [any]) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, { [prop]: [...collection, ...state] }));
  }

  update(prop, state) {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, { [prop]: state }));
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

  findAndUpdateWithObject(prop, id, sourceObj): boolean {
    let updated = false;
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id) {
        item = Object.assign(item, sourceObj);
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

  findDeepAndAdd(prop, id, deepProp, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id) {
        item[deepProp].push(state);
      }
      return item;
    })}));
  }

  findDeepAndUpdate(prop, id, deepPropKey, deepId, fieldName, value): boolean {
    let updated = false;
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id) {
        item[deepPropKey].map(deepItem => {
          if (deepItem.id === deepId && deepItem[fieldName] !== value) {
            deepItem[fieldName] = value;
            updated = true;
          }
          return deepItem;
        });
      }
      return item;
    })}));
    return updated;
  }

  findDeepAndUpdateWithObject(prop, id, deepPropKey, deepId, sourceObj): boolean {
    let updated = false;
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id) {
        item[deepPropKey].map(deepItem => {
          if (deepItem.id === deepId) {
            deepItem = Object.assign(deepItem, sourceObj);
            updated = true;
          }
          return deepItem;
        });
      }
      return item;
    })}));
    return updated;
  }

  findDeepAndDelete(prop, id, deepPropKey, deepId) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id === id) {
        item[deepPropKey] = item[deepPropKey].filter(deepItem => deepItem.id !== deepId);
      }
      return item;
    })}));
  }




// @TODO remove this
  onGetState() {
    console.log(this.store.getState());
  }

}
