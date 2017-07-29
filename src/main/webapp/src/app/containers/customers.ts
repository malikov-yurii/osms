import { Component, OnInit, OnDestroy } from '@angular/core';
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
import 'rxjs/add/operator/map';

import { Store } from '../store';
import { CustomerService } from '../services/index';
import { slideToLeft, changeWidth } from '../ui/animations';


@Component({
  template: `

    <div class="wrapper customers-page">
    
      <div class="service-block">
        <input type="text" name="searchStream" id=""
          class="input customers-search pull-right"
          placeholder="Search in customers..."
          [@changeWidth]="searchExpanded"
          [formControl]="searchStream"
          [(ngModel)]="searchQuery"
          (focusin)="toggleAnimState()"
          (focusout)="toggleAnimState()"
        >
      </div>
        
      <div class="table-container">
        <table class="table table-customers">
          <thead>
            <th class="headcell headcell--id">ID</th>
            <th class="headcell headcell--name">Name</th>
            <th class="headcell headcell--lastName">Last name</th>
            <th class="headcell headcell--phone">Phone</th>
            <th class="headcell headcell--city">City</th>
            <th class="headcell headcell--post">Post</th>
            <th class="headcell headcell--email">Email</th>
            <th class="headcell headcell--comment">Comment</th>
          </thead>
          <tbody>
            <tr
              *ngFor="let customer of customers$ | async"
            >
              <td
                *ngFor="let key of customer | keys"
              >
                {{ customer[key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <pagination
        [total]="filteredCustomers$ | async"
        [length]="pageLength"
        [current]="page"
        (dataChanged)="paginationChanged($event)"
      >
      </pagination>
    </div>
  `,
  animations: [slideToLeft(), changeWidth()]
})
export class Customers implements OnInit, OnDestroy {

  private customers$: Observable<any[]>;
  private filteredCustomers$: Observable<number>;

  private searchStream: FormControl = new FormControl();
  searchQuery: string = '';

  private pageStream = new Subject<{page: number, length: number}>();
  page: number = 1;
  pageLength: number = 10;

  private subs: Subscription[] = [];

  private searchExpanded = 'collapsed';

  constructor(
    private customerService: CustomerService,
    private store: Store
  ) {}

  ngOnInit() {
    this.subs[this.subs.length] = this.customerService.getAllCustomers().subscribe();

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
        return this.customerService.list(params.search, params.page, params.length)
      })
      .share();

    this.customers$ = source.pluck('customers');
    this.filteredCustomers$ = source.pluck('filtered');


  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.customerService.purgeStore();
  }

  /* Pagination */
  paginationChanged({page, length}) {
    this.pageStream.next({page, length});
    this.page = page;
    this.pageLength = length;
  }


  toggleAnimState() {
    this.searchExpanded = this.searchExpanded === 'collapsed' ? 'expanded' : 'collapsed';
  }

}
