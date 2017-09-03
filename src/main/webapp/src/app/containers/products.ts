import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl }   from "@angular/forms";
import { Observable }    from 'rxjs/Observable';
import { Subject }       from "rxjs/Subject";
import { Subscription }  from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';

import { Store } from '../store';
import { Product } from '../models';
import { ProductService, NotyService } from '../services/index';
import { slideToLeft, changeWidth } from '../ui/animations';


@Component({
  template: `
    <div class="wrapper products-page">
    
      <div class="service-block">
      
        <filter-static
          [filters]="{
            categories: categories,
            supplier: suppliers
          }"
          (filtered)="onFilterChange($event)"
        ></filter-static>
      
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
      
        
      <div class="table-container">
        <table class="table table-products">
          <thead>
            <th class="product-cell--id numeric">ID</th>
            <th class="product-cell--varId numeric">Variation ID</th>
            <th class="product-cell--name">Name</th>
            <th class="product-cell--categories">Category</th>
            <th class="product-cell--price numeric">Price</th>
            <th class="product-cell--quantity numeric">Quantity</th>
            <th class="product-cell--supplier">Supplier</th>
          </thead>
          <tbody>
            <tr
              *ngFor="let product of products$ | async; let odd = odd; let even = even;"
              [ngClass]="{'product': true, 'odd': odd, 'even': even}"
            >
              <ng-container
                *ngFor="let key of product | keys:['unlimited']"
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
                  <td class="product-cell--{{ key }}">
                    {{ product[key] }}
                  </td>
                </ng-template>
                
              </ng-container>
            </tr>
          </tbody>
        </table>
      </div>
      
      <pagination
        [total]="filteredProducts$ | async"
        [length]="pageLength"
        [current]="page"
        (dataChanged)="paginationChanged($event)"
      >
      </pagination>
    </div>
  `,
  animations: [slideToLeft(), changeWidth()],
  host: {'[@slideToLeft]': ''}
})
export class Products implements OnInit, OnDestroy {

  private products$: Observable<Product[]>;
  private totalProducts: any;
  private filteredProducts$: Observable<number>;

  private searchStream: FormControl = new FormControl();
  searchQuery: string = '';

  private pageStream = new Subject<{page: number, length: number}>();
  page: number = 1;
  pageLength: number = 10;

  private filterStream = new Subject<any>();
  private filterData = {supplier: '', categories: ''};

  private subs: Subscription[] = [];
  private categories: string[] = [''];
  private suppliers: string[] = [''];

  private searchExpanded = 'collapsed';

  constructor(
    private productService: ProductService,
    private notyService: NotyService,
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
        return {search: this.searchQuery, page: 1, length: this.pageLength, filterData: filterData}
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
    this.productService.purgeStore();
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
        _categories = _categories.concat(product.categories);
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

  onUpdateProductField(productId, productVarId, fieldName, {newValue, oldValue}) {
    this.productService.updateProductField(productId, productVarId, {[fieldName]: newValue})
      .subscribe(() => {
        this.notyService.renderNoty(`"${oldValue}" has been changed to "${newValue}"`);
      });
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
