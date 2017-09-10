import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  search(items: any[], searchQuery: string): any[] {
    // To enable deep search, change "_search" to "_deepSearch" in following line
    return items.length && searchQuery ? items.filter(SearchService._search.bind(this, searchQuery)) : items;
  }

  private static _ifValueConsistQuery(query, value): boolean {
    // Return true if given value isn't empty and matches search text
    if (value) {
      value += '';
      return value.toLowerCase().indexOf(query.toLowerCase()) > -1;
    }
  }

  private static _deepSearch(query, item) {
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        // At first checks in values of given object, e.g. 'firstName/phoneNumber'
        // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'.
        if (
          SearchService._ifValueConsistQuery(query, item[key])
          || typeof item[key] === 'object'
          && SearchService._deepSearch(query, item[key])
        ) {
          return true;
        }
      }
    }
  }

  private static _search(query, item) {
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        // Checks in values of given object, e.g. 'firstName/phoneNumber'

        if (SearchService._ifValueConsistQuery(query, item[key])) {
          return true;
        }
      }
    }
  }
}
