import { Directive, HostListener } from '@angular/core';
import { STATIC_DATA } from '../models/index';

@Directive({
  selector: '[phoneNumber]'
})
export class PhoneNumberDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKey(event) {
    if (event.ctrlKey || event.altKey || event.which === 8 || event.which === 46 || STATIC_DATA.serviceKeys.indexOf(+event.which) > -1) {
      return true;
    } else {
      const value = event.target.value || event.target.innerText;
      return new RegExp('^\\d$').test(event.key) && value.length < 14;
    }
  }

}
