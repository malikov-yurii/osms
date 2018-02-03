import { Directive, HostListener } from '@angular/core';
import { STATIC_DATA } from '../models/index';

@Directive({
  selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() {}

  @HostListener('keydown', ['$event'])
  onKey(event: KeyboardEvent) {
    if (event.ctrlKey || event.altKey || event.which === 8 || event.which === 46 || STATIC_DATA.serviceKeys.indexOf(+event.which) > -1) {
      return true;
    } else {
      const target = event.target as HTMLElement;
      return new RegExp('^\\d$').test(event.key) && target.innerText.length < 14;
    }
  }

}
