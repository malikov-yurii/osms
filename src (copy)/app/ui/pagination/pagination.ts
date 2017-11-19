import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  moduleId: module.id,
  selector: 'pagination',
  templateUrl: 'pagination.html',
  styleUrls: ['./pagination.css']
})
export class Pagination implements OnInit, OnChanges {
  @Input('total') totalItems: number = 0;
  @Input('length') pageLength: number = 10;
  @Input('current') currentParentPage: number = 1;
  public currentPageNumber: number;
  public currentPageStream = new BehaviorSubject<number>(1);
  public lastPage: number;
  public pages: number[];
  public pagesToDisplay: number = 3;
  @Output() dataChanged = new EventEmitter<{page: number, length: number}>();
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
    this.currentPageStream.next(this.currentParentPage);
  }

  selectPage(page: number) {
    if (page > 0) {
      this.currentPageStream.next(page);
      this.dataChanged.emit({page: page, length: this.pageLength});
    }
  }

  changeLength(length) {
    this.dataChanged.emit({page: 1, length: +length});
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
    let start = 2;
    let current = this.currentPageNumber;
    let ptd = this.pagesToDisplay;
    let end = ptd;

    if (current <= ptd + 1) {
      end = 4;
    }

    if (current > ptd + 1) {
      start = current - 1;

      if (current >= this.lastPage - ptd) {
        start = this.lastPage - ptd - 1;
        end = 4;
      }
    }

    if (this.lastPage <= ptd + 4) {
      start = 2;
      end = ptd + 2;

      if (this.lastPage <= ptd + 2) {
        end = this.lastPage - 2;
      }
    }

    this.pages = Array.from(new Array(Math.max(0, end)), (v, i) => i + start);
  }

  isPrevSpreadShown() {
    return this.lastPage > this.pagesToDisplay + 4 && this.currentPageNumber > this.pagesToDisplay + 1;
  }

  isNextSpreadShown() {
    return this.lastPage > this.pagesToDisplay + 4 && this.currentPageNumber < this.lastPage - this.pagesToDisplay;
  }



}
