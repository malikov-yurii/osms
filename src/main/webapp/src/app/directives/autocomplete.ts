import { Directive, Input, Output, ViewContainerRef, ComponentFactoryResolver, ComponentRef, EventEmitter } from '@angular/core';

import { OrderService } from '../services/index';
import { AutocompleteList } from '../ui/index';
import { StaticDATA } from '../models';

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

  private fieldsToAutocomplete = StaticDATA.autocompleteBlocks;
  private term: string;
  private refreshTimer: any = undefined;
  private searchRequired: boolean = false;
  private searchInProgress: boolean = false;
  private listComponent: ComponentRef<AutocompleteList> = undefined;


  constructor(
    private orderService: OrderService,
    private viewRef: ViewContainerRef,
    private compiler: ComponentFactoryResolver
  ) {}


  onKeyDown(e) {
    if (this.fieldsToAutocomplete.indexOf(this.types[1]) > -1) {

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
            return true;
          case 'NumpadEnter' :
            this.listComponent.instance.selectedStream.next();
            return false;
          case 'Tab' :
            this.listComponent.instance.selectedStream.next();
            return true;
          case 'Escape' :
            this.removeList();
            return false;
        }

      }

      if (StaticDATA.keycodesNotToAutocomplete.indexOf(e.which) === -1 ) {
        setTimeout(() => this.onKeyUp(e), 0);
      }

    }
  }


  onKeyUp(e) {
    this.term = e.target.innerText;
    if (this.term && !this.refreshTimer) {
      this.refreshTimer = setTimeout(
        () => {
          if (!this.searchInProgress && this.term) {
            this.doSearch();
          } else {
            this.searchRequired = true;
          }
        },
        800
      );
    }

    if (this.listComponent && !this.term) {
      this.removeList();
    }

  }

  onBlur(e) {
    this.removeList();
  }

  private doSearch() {
    this.refreshTimer = undefined;
    this.searchInProgress = true;

    this.orderService.autocomplete(this.types, this.term).subscribe(
      resp => {
        this.searchInProgress = false;
        if (this.searchRequired) {
          this.searchRequired = false;
          this.doSearch();
        } else {
          this.renderList(resp);
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
