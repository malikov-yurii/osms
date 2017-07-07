import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'pagination',
  template: `
    <div class="pagination-block">
      <select name="" id="" class="pagination__length"
        (change)="onChangeLength($event.target.value)"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>
    
    </div>

    <ul class="pagination">
      <li (click)="selectPage(1)">First</li>
      <li (click)="selectPage(getPrevPage())">Prev</li>
      <li 
        *ngFor="let page of pages"
        [class.active]="page === currentPageNumber"
        (click)="selectPage(page)"
      >
        {{ page }}
      </li>
      <li (click)="selectPage(getNextPage())">Next</li>
      <li (click)="selectPage(getLastPage())">Last</li>
    </ul>
  `
})
export class Pagination implements OnInit, OnChanges {
  @Input('total') totalItems: number = 0;
  @Input('length') pageLength: number = 10;
  private currentPageNumber: number;
  private currentPageStream = new BehaviorSubject<number>(1);
  private lastPage: number;
  private pages: number[];
  private pagesToDisplay: number = 5;
  @Output() pageSelected = new EventEmitter<number>();
  @Output() lengthChanged = new EventEmitter<number>();


  ngOnInit() {
    this.currentPageStream.subscribe(page => {
      this.currentPageNumber = page;
      this.setPages();
    });
  }

  ngOnChanges() {
    this.lastPage = Math.ceil(this.totalItems / this.pageLength);
    this.setPages();
  }

  selectPage(page: number) {
    if (page > 0) {
      this.currentPageStream.next(page);
      this.pageSelected.emit(page);
    }
  }

  getPrevPage() {
    if (this.currentPageNumber > 1) {
      return --this.currentPageNumber;
    }
  }

  getNextPage() {
    if (this.currentPageNumber < this.lastPage) {
      return ++this.currentPageNumber;
    }
  }

  getLastPage() {
    return this.lastPage;
  }

  setPages() {
    let start = 1;
    let current = this.currentPageNumber;
    let ptd = this.pagesToDisplay;

    if (current > Math.ceil(ptd / 2)) {
      start =  current - Math.floor(ptd / 2);
    }
    if ((current + Math.floor(ptd / 2)) > this.lastPage) {
      start =  this.lastPage - ptd + 1;
    }

    this.pages = Array.from(new Array(ptd), (v, i) => i + start);
  }

  onChangeLength(length) {
    this.lengthChanged.emit(+length);
  }





}
