import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'pagination',
  template: `
    <div class="pagination">
    
      <div class="pagination__info">
        Displaying {{ (currentPageNumber - 1) * pageLength + 1}} – {{ currentPageNumber * pageLength }} of {{ totalItems }} items
      </div>
      
      <div class="pagination__right">
        <select name="" id="" class="pagination__length input"
          (change)="changeLength($event.target.value)"
        >
          <option
            *ngFor="let value of [10, 20, 50, 100, 200]"
            value="{{ value }}"
            [attr.selected]="value === pageLength ? '' : null"
          >
            {{ value }}
          </option>
        </select>
  
        <ul class="pagination__selector"
          *ngIf="totalItems > pageLength"
        >
          <li
            (click)="selectPage(getPrevPage())"
            [class.disabled]="currentPageNumber === 1"
          >Prev</li>
          <li
            (click)="selectPage(1)"
            [class.active]="currentPageNumber === 1"
          >1</li>        
          <li class="spread" *ngIf="isPrevSpreadShown()">...</li>
          
          <li 
            *ngFor="let page of pages"
            [class.active]="page === currentPageNumber"
            (click)="selectPage(page)"
          >
            {{ page }}
          </li>
          
          <li class="spread" *ngIf="isNextSpreadShown()">...</li>
          <li
            (click)="selectPage(lastPage)"
            [class.active]="currentPageNumber === lastPage"
          >
            {{ lastPage }}
          </li>
          <li
            (click)="selectPage(getNextPage())"
            [class.disabled]="currentPageNumber === lastPage"
          >Next</li>
        </ul>
        
      </div>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      font-size: 15px;
    }
    .pagination__right {
      text-align: right;
    }
    .pagination__length {
      margin: 0 0 10px;
      font-size: 15px;
    }
    .pagination__selector {
      display: flex;
      list-style: none;
    }    
    li {
      padding: 5px 10px;
      user-select: none;
      cursor: pointer;
    }
    li:hover,
    li.active {
      background: #00bcd4;
      color: #fff;
    }
    li.disabled,
    li.disabled:hover
    li.spread,
    li.spread:hover {
        background: transparent;
        color: #999;
        cursor: default;
    }
  `]
})
export class Pagination implements OnInit, OnChanges {
  @Input('total') totalItems: number = 0;
  @Input('length') pageLength: number = 10;
  @Input('current') currentParentPage: number = 1;
  private currentPageNumber: number;
  private currentPageStream = new BehaviorSubject<number>(1);
  private lastPage: number;
  private pages: number[];
  private pagesToDisplay: number = 3;
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
