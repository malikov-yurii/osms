import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';

import {OrderService} from '../../services/orders.service';
import {PopupService} from '../../services/popup.service';
import {NotyService} from '../../services/noty.service';
import {Store} from '../../store';
import {Order, STATIC_DATA, IOrderFilter, IPageStream} from '../../models/index';
import {slideToLeft, appear, changeWidth} from '../../ui/animations';
import {DataFilter} from '../../ui/index';


@Component({
    moduleId: module.id,
    templateUrl: 'orders.component.html',
    animations: [slideToLeft(), appear()],
    host: {'[@slideToLeft]': ''},
    providers: [PopupService]
})

export class OrdersComponent implements OnInit, OnDestroy {
    public orders$: Observable<Order[]>;

    public totalOrders: number = 0;
    public preloadedOrders: number = 0;
    public page: number = 1;
    public pageLength: number = 10;
    public pageStream: Subject<IPageStream> = new Subject();

    public subs: Subscription[] = [];

    public infoBlocks = STATIC_DATA.infoBlocks;

    public showFilters: boolean = false;
    public filterSubmitted: boolean = false;

    public showSuppliers: boolean = false;
    @ViewChild('dataFilter') dataFilter: DataFilter;


    constructor(private store: Store,
                private orderService: OrderService,
                private popupService: PopupService,
                private notyService: NotyService,
                private viewRef: ViewContainerRef) {
    }

    ngOnInit() {

        this.onGetOrders();

        let storeSource = this.store.changes
            .map(store => {
                this.preloadedOrders = store.order.length;
                return {page: this.page, length: this.pageLength};
            });

        let pageSource = this.pageStream
            .map(params => {
                this.page = params.page;
                this.pageLength = params.length;
                if (params.apiGet !== false) {
                    if (this.filterSubmitted) {
                        this.onFilterSubmit();
                    } else {
                        this.onGetOrders();
                    }
                }

                return {page: params.page, length: params.length};
            });

        let source = storeSource
            .merge(pageSource)
            .startWith({page: this.page, length: this.pageLength})
            .switchMap(({page, length}) => {
                return this.orderService.list(page, length);
            })
            .share();

        this.orders$ = source.pluck('orders');

        this.popupService.viewContainerRef = this.viewRef;
    }


    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
        this.orderService.purgeStore();
    }

    // Manage orders
    onGetOrders() {
        this.subs[this.subs.length] = this.orderService
            .getOrders(this.page - 1, this.pageLength)
            .subscribe(resp => this.totalOrders = resp.totalElements);
    }

    onAddOrder() {
        this.orderService.addOrder().subscribe(
            ({orderId, orderItemId}) => this.notyService.renderNoty(`Order № ${orderId} has been added`),
            error => this.notyService.renderNoty(error, true)
        );

        let apiGet = this.page !== 1; // Trace if it's needed to send http GET request for orders
        this.paginationChanged({page: 1, length: this.pageLength, apiGet});
    }

    onDeleteOrder(orderId) {
        if (confirm('Действительно удалить этот заказ?')) {
            this.orderService.deleteOrder(orderId).subscribe(
                () => this.notyService.renderNoty(`Order № ${orderId} has been deleted`),
                error => this.notyService.renderNoty(error, true)
            );
        }
    }

    onPrintOrder(order: Order, link) {
        this.orderService.printOrder(order.id).subscribe(
            resp => {
                const date = new Date(order.createdDateTime);
                const name = this.transliterate(order.customerLastName);
                const fileName = `${name}_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.pdf`;
                setTimeout(() => {
                    link.href = `data:application/octet-stream;base64,${resp}`;
                    link.download = fileName;
                    link.target = "_blank";
                    link.click();
                    // const myPrintWindow = window.open('url', 'window name');
                    // myPrintWindow.document.write(`<embed width="100%" height="100%" name="plugin" id="plugin" src="data:application/pdf;base64,${resp}" type="application/pdf" internalinstanceid="10">`);
                    // if (myPrintWindow.document.readyState !== 'complete') {
                    //     myPrintWindow.document.addEventListener('load', () => {
                    //         myPrintWindow.document.title = fileName;
                    //     });
                    // } else {
                    //     myPrintWindow.document.title = fileName;
                    // }
                }, 50);
            }
        );
    }


    // Manage pagination
    paginationChanged({page, length, apiGet}) {
        this.pageStream.next({page, length, apiGet});
    }


    // Manage filter
    private onFilterSubmit() {
        if (!this.filterSubmitted) {
            this.page = 1;
            if (this.pageLength === 10) {
                this.pageLength = 20;
            }
        }
        const filters: IOrderFilter = this.dataFilter.form.value;
        this.filterSubmitted = true;
        this.orderService.filterOrders(this.page, this.pageLength, filters)
            .subscribe(response => this.totalOrders = response.totalElements);
    }

    resetFilter() {
        this.showFilters = false;
        this.filterSubmitted = false;
        this.page = 1;
        this.onGetOrders();
    }


    // Manage order info
    onUpdateInfoField(orderId, fieldName, {newValue, oldValue}) {
        this.orderService.updateInfoField(orderId, fieldName, newValue)
            .subscribe(
                () => this.notyService.renderNoty(`${oldValue} has been changed to ${newValue}`),
                error => this.notyService.renderNoty(error, true)
            );
    }

    onUpdateInfoInput(orderId, fieldName, value) {
        this.orderService.updateInfoInput(orderId, fieldName, value)
            .subscribe(
                () => this.notyService.renderNoty(`${fieldName} has been changed to ${value}`),
                error => this.notyService.renderNoty(error, true)
            );
    }

    onAutocompleteInfo(orderId, data) {
        this.orderService.autocompleteInfo(orderId, data).subscribe(
            () => this.notyService.renderNoty(`${data.label} has been added`),
            error => this.notyService.renderNoty(error, true)
        );
    }


    // Manage order products
    onAddProduct(orderId) {
        this.orderService.addProduct(orderId).subscribe(
            () => this.notyService.renderNoty(`Product for order ${orderId} has been added`),
            error => this.notyService.renderNoty(error, true)
        );
    }

    onUpdateProductField(orderId, productId, fieldName, {newValue, oldValue}) {
        this.orderService.updateProductField(orderId, productId, fieldName, newValue)
            .subscribe(
                () => this.notyService.renderNoty(`${oldValue} has been changed to ${newValue}`),
                error => this.notyService.renderNoty(error, true)
            );
    }

    onUpdateProductInput(orderId, productId, fieldName, value) {
        this.orderService.updateProductInput(orderId, productId, fieldName, value)
            .subscribe(
                () => this.notyService.renderNoty(`${fieldName} has been changed to ${value}`),
                error => this.notyService.renderNoty(error, true)
            );
    }

    onAutocompleteProduct(orderId, productId, data) {
        this.orderService.autocompleteProduct(orderId, productId, data).subscribe(
            () => this.notyService.renderNoty(`${data.label} has been added`),
            error => this.notyService.renderNoty(error, true)
        );
    }

    onDeleteProduct(id, productId) {
        if (confirm('Действительно удалить эту позицию?')) {
            this.orderService.deleteProduct(id, productId).subscribe(
                () => this.notyService.renderNoty(`Product ${productId} has been deleted`),
                error => this.notyService.renderNoty(error, true)
            );
        }
    }


    // Manage customers
    onEditCustomer(customerId) {
        this.popupService.renderPopup('Update customer').subscribe(customer => {
            this.orderService.saveCustomer(customerId, customer).subscribe(
                () => this.notyService.renderNoty(`Customer ${customerId} has been edited`),
                error => this.notyService.renderNoty(error, true)
            );
        });
        this.orderService.getCustomer(customerId).subscribe(customer => {
            this.popupService.onProvideWithFormData(customer);
        });
    }

    onPersistCustomer(orderId) {
        this.orderService.persistCustomer(orderId).subscribe(
            () => this.notyService.renderNoty(`Customer for order ${orderId} has been saved`),
            error => this.notyService.renderNoty(error, true)
        );
    }


    // General functions
    hasInput(key) {
        return key === 'status' || key === 'paymentType' || key === 'quantity' ? true : false;
    }

    trackById(index: number, value) {
        return value.id;
    }

    onMoveFocus(el, fromInfoBlock) {
        let parentNextSibling = el.parentNode.nextElementSibling;
        if (parentNextSibling) {
            if (fromInfoBlock) {
                el.parentNode.nextElementSibling.children[0].children[0].focus();
            } else {
                let index = Array.from(el.parentNode.children).indexOf(el);
                parentNextSibling.children[index].focus();
            }
        }
    }

    transliterate(input: string): string {
        const str = input.toLowerCase();
        const dash = '-';
        const mapping = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
            'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': dash, 'ы': 'y', 'ь': dash, 'э': 'e', 'ю': 'yu', 'я': 'ya',
            ' ': dash, '_': dash, '`': dash, '~': dash, '!': dash, '@': dash,
            '#': dash, '$': dash, '%': dash, '^': dash, '&': dash, '*': dash,
            '(': dash, ')': dash, '-': dash, '\=': dash, '+': dash, '[': dash,
            ']': dash, '\\': dash, '|': dash, '/': dash, '.': dash, ',': dash,
            '{': dash, '}': dash, '\'': dash, '"': dash, ';': dash, ':': dash,
            '?': dash, '<': dash, '>': dash, '№': dash
        };

        let result = '';
        let current_sim = '';

        for (let i = 0; i < str.length; i++) {
            if (mapping[str[i]] !== undefined) {
                if (current_sim !== mapping[str[i]] || current_sim !== dash) {
                    if (i === 0) {
                        result += mapping[str[i]].toUpperCase();
                    } else {
                        result += mapping[str[i]];
                    }
                    current_sim = mapping[str[i]];
                }
            } else {
                if (i === 0) {
                    result += str[i].toUpperCase();
                } else {
                    result += str[i];
                }
                current_sim = str[i];
            }
        }

        return result;
    }


// @TODO remove this
    onGetAllOrders() {
        this.orderService.getAllOrders().subscribe(resp => console.log(resp.data));
    }

    onGetStore() {
        this.orderService.getStore();
    }

    console() {
        // this.orderService.hello();
    }
}
