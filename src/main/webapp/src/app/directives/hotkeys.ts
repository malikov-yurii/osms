import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[withHotkeys]',
  host: {
    '(keyup)': 'onKeyup($event)'
  }
})
export class hotkeysDirective {

  @Input('withHotkeys') orderId: number;
  @Output('addItem') addItem = new EventEmitter();

  constructor (private el: ElementRef) {}


  onKeyup(e) {
    if (e.ctrlKey && e.code === 'Enter') {
      this.addItem.emit();
      return false;
    }
  }


}