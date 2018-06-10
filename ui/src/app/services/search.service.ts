import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  search(items: any[], query: string, fieldsToSearch: string[]): any[] {
    if (!(items.length && query)) {
      return items;
    }

    return items.filter(item => {
      for (let i = 0; i < fieldsToSearch.length; i++) {
        const fieldValue = item[fieldsToSearch[i]];

        if (fieldValue && this._ifValueConsistQuery(fieldValue, query)) {
          return true;
        }

      }
    });
  }

  private _ifValueConsistQuery(value, query): boolean {
    // Return true if given value isn't empty and matches search text
    if (value) {
      value += '';
      return value.toLowerCase().includes(query.toLowerCase());
    }
  }

  private _deepSearch(query, item) {
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        // At first checks in values of given object, e.g. 'firstName/phoneNumber'
        // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'.
        if (
          this._ifValueConsistQuery(query, item[key])
          || typeof item[key] === 'object'
          && this._deepSearch(query, item[key])
        ) {
          return true;
        }
      }
    }
  }

  private static _search(query, item) {

  }
}
