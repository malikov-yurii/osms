import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from "@angular/forms";
import { trigger, state, style, transition, animate } from '@angular/animations';
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
import { Product } from '../models';
import { ProductService } from '../services/index';


@Component({
  template: `

    <div class="wrapper">
    
      <div class="service-block">
      
        <filter
          [filters]="[
            {label: 'category', data: suppliers},
            {label: 'supplier', data: suppliers}
          ]"
          (filtered)="onFilterChange($event)"
        ></filter>
      
        <input type="text" name="searchStream" id=""
          class="input search-input"
          placeholder="Search in products..."
          [@changeWidth]="searchExpanded"
          #searchControl
          [formControl]="searchStream"
          [(ngModel)]="searchQuery"
          (focusin)="toggleAnimState()"
          (focusout)="toggleAnimState()"
        >
      
      </div>
      
        
      
      <table class="table table-products">
        <thead>
          <th>ID</th>
          <th>Variation ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Unlimited</th>
          <th>Supplier</th>
        </thead>
        <tbody>
          <tr
            *ngFor="let product of products$ | async; let odd = odd; let even = even;"
            [ngClass]="{'product': true, 'odd': odd, 'even': even}"
          >
            <ng-container
              *ngFor="let key of product | keys"
            >
              
              <ng-template [ngIf]="isEditable(key)">
                <td
                  class="product-cell--{{ key }} editable"
                  contenteditable
                  [(contenteditableModel)]="product[key]"
                  (contentChanged)="onUpdateProductField(product.id, product.variationId, key, $event)"
                ></td>
              </ng-template>
              
              
              <ng-template [ngIf]="!isEditable(key)">
              
                <ng-template [ngIf]="isCategory(key)">
                  <td class="product-cell--category">
                    {{ printCategories(product[key]) }}
                  </td>
                </ng-template>
              
                <ng-template [ngIf]="!isCategory(key)">
                  <td class="product-cell--{{ key }}">
                    {{ product[key] }}
                  </td>
                </ng-template>
                
              </ng-template>
              
            </ng-container>
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
  `,
  animations: [
    trigger('changeWidth', [
      state('collapsed', style({width: '190px'})),
      state('expanded', style({width: '300px'})),
      transition('collapsed <=> expanded', animate('.3s ease')),
    ])
  ]
})
export class Products implements OnInit, OnDestroy {

  private products$: Observable<Product[]>;
  private totalProducts: any;
  private filteredProducts$: Observable<number>;

  @ViewChild('searchControl') searchControl: ElementRef;
  private searchStream: FormControl = new FormControl();
  searchQuery: string = '';

  private pageStream = new Subject<{page: number, length: number}>();
  page: number = 1;
  pageLength: number = 10;

  private filterStream = new Subject<any>();
  private filterData = {label: 'supplier', data: ''};

  private subs: Subscription[] = [];
  private categories: string[] = [];
  private suppliers: string[] = [];

  private searchExpanded = 'collapsed';

  constructor(
    private productService: ProductService,
    private store: Store
  ) {}

  ngOnInit() {
    this.subs[this.subs.length] = this.productService.getAllProducts().subscribe(
      ({totalElements, elements}) => {
        this.totalProducts = totalElements;
        this.getFiltersList(elements);
      }
    );

    let storeSource = this.store.changes
      .map(store => {
        return {search: this.searchQuery, page: this.page, length: this.pageLength, filterData: this.filterData}
      });

    let searchSource = this.searchStream
      .valueChanges
      .debounceTime(100)
      .distinctUntilChanged()
      .map(searchQuery => {
        this.page = 1;
        return {search: searchQuery, page: this.page, length: this.pageLength, filterData: this.filterData}
      });

    let pageSource = this.pageStream
      .map(params => {
        this.page = params.page;
        this.pageLength = params.length;
        return {search: this.searchQuery, page: params.page, length: params.length, filterData: this.filterData}
      });

    let filterSource = this.filterStream
      .map(filterData => {
        this.filterData = filterData;
        return {search: this.searchQuery, page: this.page, length: this.pageLength, filterData: filterData}
      });

    let source = storeSource
      .merge(searchSource, pageSource, filterSource)
      .startWith({search: this.searchQuery, page: this.page, length: this.pageLength, filterData: this.filterData})
      .switchMap((params: {search: string, page: number, length: number, filterData}) => {
        return this.productService.list(params.search, params.page, params.length, params.filterData)
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



  getFiltersList(products: Product[]) {
    let _categories = [];
    let _suppliers = [];

    products.forEach(product => {
      if (product.categories) {
        _categories.concat(product.categories);
      }
      if (product.supplier) {
        _suppliers.push(product.supplier);
      }
    });

    this.categories = Array.from(new Set(_categories));
    this.suppliers = Array.from(new Set(_suppliers));
  }

  onFilterChange(e) {
    this.filterStream.next(e);
  }

  onUpdateProductField(productId, productVarId, fieldName, value) {
    this.productService.updateProductField(productId, productVarId, {[fieldName]: value});
  }







  printCategories(array) {
    return array.join('<br>');
  }

  isEditable(key) {
    return key === 'price' || key === 'quantity' ? true : false;
  }

  isCategory(key) {
    return key === 'categories' ? true : false;
  }

  toggleAnimState() {
    this.searchExpanded = this.searchExpanded === 'collapsed' ? 'expanded' : 'collapsed';
  }

}
