import { Injectable } from '@angular/core';
import { Store } from '../store';

@Injectable()
export class SearchService {

  constructor(private store: Store) {}

  search(items, searchQuery) {
    function _ifValueConsistQuery(value): boolean {
      // Return true if given value isn't empty and matches search text
      if (value) {
        value += '';
        return value.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
      }
    }

    function _deepSearch(item) {
      for (let key in item) {
        if (item.hasOwnProperty(key)) {
          // At first checks in values of given object, e.g. 'firstName/phoneNumber'
          // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'
          if (
            _ifValueConsistQuery(item[key]) ||
            typeof item[key] === 'object' && _deepSearch(item[key])
          ) { return true; }

        }
      }
    }

    return items.length && searchQuery ? items.filter(_deepSearch) : items;
  }
}
