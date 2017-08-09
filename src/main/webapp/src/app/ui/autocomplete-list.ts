import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AutocompleteItem } from '../models';

@Component({
  template: `
    <ul class="autocomplete"
      [style.top]="styleTop + 'px'"
      [style.left]="styleLeft + 'px'"
      (click)="onClick()"
    >
      
      <li 
        *ngFor="let item of list; let i = index;"
        (mouseenter)="setSelected(i)"
        [class.active]="i === selectedIndex"
      >
        {{ item.label }}
      </li>
    
    </ul>
  `
})
export class AutocompleteList implements OnInit {

  public list: AutocompleteItem[] = [];
  public focusMoved = new Subject();
  public selectedStream = new Subject();
  public selectedSource;
  private selectedIndex: number = 0;

  public styleTop;
  public styleLeft;

  constructor (private viewRef: ViewContainerRef) {

    this.selectedSource = this.selectedStream.map(() => {
      return Observable.of(this.list[this.selectedIndex]);
    });

  }

  ngOnInit() {

    this.focusMoved.subscribe(direction => {
      if (direction === 'next' && this.selectedIndex < this.list.length - 1) {
        this.selectedIndex++;
      } else if (direction === 'prev' && this.selectedIndex > 0) {
        this.selectedIndex--;
      }
      this.resolveScroll();
    });

  }

  onClick() {
    console.log(this.selectedIndex);
    console.log(this.list[this.selectedIndex]);
    this.selectedStream.next();
  }

  setSelected(index) {
    this.selectedIndex = index;
  }

  resolveScroll() {
    let activeEl = this.viewRef.element.nativeElement.querySelector('.active');
    activeEl.scrollIntoViewIfNeeded();
  }



}
