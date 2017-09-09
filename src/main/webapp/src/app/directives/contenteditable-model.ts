import {Directive, ElementRef, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[contenteditableModel]',
  host: {
    '(blur)': 'onBlur()',
    '(keypress)': 'onKeydown($event)'
  }
})
export class ContenteditableModel {
  // https://stackoverflow.com/questions/35378087/how-to-use-ngmodel-on-divs-contenteditable-in-angular2

  @Input('contenteditableModel') model: string;
  @Output('contenteditableModelChange') update = new EventEmitter();
  @Output('contentChanged') changed = new EventEmitter();

  /**
   * By updating this property on keyup, and checking against it during
   * ngOnChanges, we can rule out change events fired by our own onKeyup.
   * Ideally we would not have to check against the whole string on every
   * change, could possibly store a flag during onKeyup and test against that
   * flag in ngOnChanges, but implementation details of Angular change detection
   * cycle might make this not work in some edge cases?
   */
  private lastViewModel: string;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
      this.lastViewModel = this.model;
      this.refreshView();
    }
  }

  onKeydown(e) {
    if (e.keyCode === 13 || e.keyCode === 27) { // Enter and Escape
      this.el.nativeElement.blur();
      return false;
    }
  }

  /** This should probably be debounced. */
  onBlur() {
    var value = this.el.nativeElement.innerText;
    if (this.lastViewModel != value) { // nonstrict comparison is needed
      // debugger
      this.changed.emit({newValue: value, oldValue: this.lastViewModel});
      this.lastViewModel = value;
    }
    this.update.emit(value);
  }

  private refreshView() {
    this.el.nativeElement.innerText = this.model;
  }
}
