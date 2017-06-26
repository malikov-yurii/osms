import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AutocompleteService } from '../services/index';
import { AutocompleteItem } from '../models';

@Component({
  template: `
    <ul class="autocomplete">
      
      <li 
        *ngFor="let item of list; let i = index;"
        (click)="onSelect(i)"
        [class.active]="i === selectedIndex"
      >
        {{ item.label }}
      </li>
    
    </ul>
  `
})
export class AutocompleteList implements OnInit {

  public list: AutocompleteItem[];
  public focusMoved = new Subject();
  public selectedStream = new Subject();
  public selectedSource;
  private selectedIndex: number = 0;

  constructor (private service: AutocompleteService) {

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
    });

  }

  onSelect(i) {
    this.selectedStream.next()
  }





}
