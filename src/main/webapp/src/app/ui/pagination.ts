import {Component, Input, Output, OnInit, OnChanges, EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'pagination',
  template: `
    <div class="pagination">
    
      <select name="" id="" class="pagination__length"
        (change)="onChangeLength($event.target.value)"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>
      
      <div class="pagination__info">
        Displaying {{ (currentPageNumber - 1) * pageLength + 1}} – {{ currentPageNumber * pageLength }} of {{ totalItems }} items
      </div>

      <ul class="pagination__selector"
        *ngIf="totalItems > pageLength"
      >
        <li (click)="selectPage(getPrevPage())">Prev</li>
        <li (click)="selectPage(1)" [class.active]="currentPageNumber === 1">1</li>        
        <li *ngIf="isPrevSpreadShown()">...</li>
        
        <li 
          *ngFor="let page of pages"
          [class.active]="page === currentPageNumber"
          (click)="selectPage(page)"
        >
          {{ page }}
        </li>
        
        <li *ngIf="isNextSpreadShown()">...</li>
        <li (click)="selectPage(lastPage)"  [class.active]="currentPageNumber === lastPage">{{ lastPage }}</li>
        <li (click)="selectPage(getNextPage())">Next</li>
      </ul>
    
    </div>
  `,
  styles: [`
    .pagination__selector {
      display: flex;
      list-style: none;
    }    
    .pagination__selector li {
      padding: 5px 10px;
      user-select: none;
      cursor: pointer;
    }
    .pagination__selector li:hover,
    .pagination__selector .active {
      background: #f0f0f0;
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
    if (this.currentParentPage === 1) {
      this.currentPageStream.next(1);
    }
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

      if (this.lastPage < ptd) {
        end = this.lastPage;
      }
    }

    this.pages = Array.from(new Array(end), (v, i) => i + start);
  }

  onChangeLength(length) {
    this.lengthChanged.emit(+length);
  }

  isPrevSpreadShown() {
    return this.lastPage > this.pagesToDisplay + 4 && this.currentPageNumber > this.pagesToDisplay + 1;
  }

  isNextSpreadShown() {
    return this.lastPage > this.pagesToDisplay + 4 && this.currentPageNumber < this.lastPage - this.pagesToDisplay;
  }



}
