import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(obj: any, keysToFilter?: any[]): any {

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
