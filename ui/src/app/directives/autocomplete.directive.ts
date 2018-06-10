import { Directive, Input, Output, ViewContainerRef, ComponentFactoryResolver, ComponentRef, EventEmitter } from '@angular/core';

import { OrderService } from '../services/index';
import { AutocompleteList } from '../ui/index';
import { STATIC_DATA } from '../models/index';

@Directive({
  selector: '[autocomplete]',
  host: {
    '(keydown)': 'onKeyDown($event)',
    '(blur)': 'onBlur($event)'
  }
})
export class Autocomplete {

  @Input('autocomplete') types: string[];
  @Output('selectedAutocomplete') selected = new EventEmitter();

  private term: string;
  private refreshTimer: any = undefined;
  private searchRequired: boolean = false;
  private searchInProgress: boolean = false;
  private isBlurred: boolean = true;
  private listComponent: ComponentRef<AutocompleteList> = undefined;


  constructor(
    private orderService: OrderService,
    private viewRef: ViewContainerRef,
    private compiler: ComponentFactoryResolver
  ) {}


  onKeyDown(e) {

    if (this.listComponent) {
      switch (e.code) {
        case 'ArrowDown' :
          this.listComponent.instance.focusMoved.next('next');
          return false;
        case 'ArrowUp' :
          this.listComponent.instance.focusMoved.next('prev');
          return false;
        case 'Enter' :
          this.listComponent.instance.selectedStream.next();
          return false;
        case 'NumpadEnter' :
          this.listComponent.instance.selectedStream.next();
          return true;
        case 'Escape' :
          this.removeList();
          return false;
      }

    }

    if (STATIC_DATA.serviceKeys.indexOf(e.which) === -1 ) {
      setTimeout(() => this.onKeyUp(e), 0);
    }
  }


  onKeyUp(e) {
    this.isBlurred = false;
    this.term = e.target.innerText || e.target.value || '';
    if (this.term && !this.refreshTimer) {
      this.refreshTimer = setTimeout(
        () => {
          if (!this.searchInProgress && this.term && !this.isBlurred) {
            this.doSearch();
          } else {
            this.searchRequired = true;
            this.refreshTimer = undefined;
          }
        },
        800
      );
    }

    if (this.listComponent && !this.term) {
      this.removeList();
    }

  }

  onBlur() {
    this.isBlurred = true;
    setTimeout(() => {
      this.removeList();
    }, 500);
  }

  private doSearch() {
    this.refreshTimer = undefined;
    this.searchInProgress = true;

    this.orderService.requestAutocomplete(this.types, this.term).subscribe(
      resp => {
        this.searchInProgress = false;
        if (this.searchRequired) {
          this.searchRequired = false;
          this.doSearch();
        } else if (resp.length) {
          this.renderList(resp);
        } else {
          this.removeList();
        }
      }
    );

  }

  private renderList(resp) {

    if (!this.listComponent) {
      let componentFactory = this.compiler.resolveComponentFactory(AutocompleteList);
      this.listComponent = this.viewRef.createComponent(componentFactory);

      let offsetTop = this.viewRef.element.nativeElement.offsetTop + this.viewRef.element.nativeElement.offsetHeight;
      let offsetLeft = this.viewRef.element.nativeElement.offsetLeft;

      this.listComponent.instance.styleTop = offsetTop;
      this.listComponent.instance.styleLeft = offsetLeft;


      this.listComponent.instance.selectedSource.subscribe(
        item => {
          this.selected.emit(item.value);
          this.removeList();
          setTimeout(() => {
            this.viewRef.element.nativeElement.blur();
          }, 50);
        }
      );
    }

    this.listComponent.instance.list = resp;

  }

  private removeList() {
    this.refreshTimer = undefined;
    this.searchInProgress = false;
    this.searchRequired = false;
    if (this.listComponent) {
      this.listComponent.destroy();
      this.listComponent = undefined;
    }
  }
}
