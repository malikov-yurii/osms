import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(obj: any, keysToFilter?: any[]): any {
    if (obj) {

      let keys = Object.keys(obj);
      if (keysToFilter) {
        return keys.filter(function (i) {
          return keysToFilter.indexOf(i) < 0;
        });
      } else {
        return keys;
      }

    }
  }
}


@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(items: any, searchQuery: string): any {

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
          // At first checks in values of given object, e.g. 'firstName/totalSum'
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