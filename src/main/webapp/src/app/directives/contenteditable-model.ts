import {Directive, ElementRef, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[contenteditableModel]',
  host: {
    '(blur)': 'onBlur()'
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
    if (changes['model'].previousValue && changes['model'].previousValue !== this.lastViewModel) {
      this.changed.emit(this.lastViewModel);
    }
  }

  /** This should probably be debounced. */
  onBlur() {
    var value = this.el.nativeElement.innerText;
    this.lastViewModel = value;
    this.update.emit(value);
  }

  private refreshView() {
    this.el.nativeElement.innerText = this.model;
  }
}
