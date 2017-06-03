import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[withHotkeys]',
  host: {
    '(keypress)': 'onKeypress($event)'
  }
})
export class HotkeysDirective {

  @Output('addProduct') addProduct = new EventEmitter();
  @Output('moveFocus') moveFocus = new EventEmitter();

  constructor (private el: ElementRef) {}


  onKeypress(e) {
    if (e.ctrlKey && e.code === 'Enter') {
      this.addProduct.emit();
      return false;
    } else if (e.shiftKey && e.code === 'Enter') {
      this.moveFocus.emit();
      return false;
    } else if (e.code === 'Enter') {
      this.el.nativeElement.blur();
      return false;
    }
  }




}