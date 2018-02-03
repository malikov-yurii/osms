import { Directive, HostListener } from '@angular/core';
import { STATIC_DATA } from '../models/index';

@Directive({
  selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() {}

  @HostListener('keydown', ['$event'])
  onKey(event: KeyboardEvent) {
    if (event.ctrlKey || event.altKey || event.which === 8 || STATIC_DATA.serviceKeys.indexOf(+event.which) > -1) {
      return true;
    } else {
      return new RegExp('^\\d{0,14}$').test(event.key);
    }
  }

}
