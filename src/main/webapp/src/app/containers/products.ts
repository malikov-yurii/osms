import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';

import { Store } from '../store';
import { ProductService } from '../services/index';


@Component({
  template: `

    <div class="wrapper">
    
      <input type="text" name="searchStream" id=""
        class="input orders-search"
        placeholder="Search in products..."
        #searchControl
        [formControl]="searchStream"
        [(ngModel)]="searchQuery"
      >
        
      
      <table class="table table-products">
        <thead>
          <th>ID</th>
          <th>Variation ID</th>
          <th>Category</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Unlimited</th>
        </thead>
        <tbody>
          <tr
            *ngFor="let product of products$ | async"
          >
            <td
              *ngFor="let key of product | keys"
            >
              {{ product[key] }}
            </td>
          </tr>
        </tbody>
      </table>
      
      <pagination
        [total]="filteredProducts$ | async"
        [length]="pageLength"
        [current]="page"
        (dataChanged)="paginationChanged($event)"
      >
      </pagination>
    </div>
  `
})
export class Products implements OnInit, OnDestroy {

  private products$: Observable<any[]>;
  private totalProducts: any;
  private filteredProducts$: Observable<number>;

  @ViewChild('searchControl') searchControl: ElementRef;
  private searchStream: FormControl = new FormControl();
  searchQuery: string = '';

  private pageStream = new Subject<{page: number, length: number}>();
  page: number = 1;
  pageLength: number = 10;

  private subs: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private store: Store
  ) {}

  ngOnInit() {
    this.subs[this.subs.length] = this.productService.getAllProducts().subscribe(
      ({totalElements, elements}) => this.totalProducts = totalElements
    );

    let storeSource = this.store.changes
      .map(store => {
        return {search: this.searchQuery, page: this.page, length: this.pageLength}
      });

    let searchSource = this.searchStream
      .valueChanges
      .debounceTime(100)
      .distinctUntilChanged()
      .map(searchQuery => {
        this.page = 1;
        return {search: searchQuery, page: this.page, length: this.pageLength}
      });

    let pageSource = this.pageStream
      .map(params => {
        this.page = params.page;
        this.pageLength = params.length;
        return {search: this.searchQuery, page: params.page, length: params.length}
      });

    let source = storeSource
      .merge(searchSource, pageSource)
      .startWith({search: this.searchQuery, page: this.page, length: this.pageLength})
      .switchMap((params: {search: string, page: number, length: number}) => {
        return this.productService.list(params.search, params.page, params.length)
      })
      .share();

    this.products$ = source.pluck('products');
    this.filteredProducts$ = source.pluck('filtered');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  /* Pagination */
  paginationChanged({page, length}) {
    this.pageStream.next({page, length});
    this.page = page;
    this.pageLength = length;
  }

}
