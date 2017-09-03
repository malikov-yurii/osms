import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs/Observable";

import { appear, fadeInOut } from '../animations';

@Component({
  selector: 'filter',
  template: `
    <div [@appear] class="filter-container">
      <form [formGroup]="form" (ngSubmit)="onSubmit($event)" class="filter__form">
        <div
          class="filter filter__block"
          *ngFor="let filter of filters"
        >
          <div class="filter__label">
            {{ filter.label }} :
          </div>
          
          <ng-container [ngSwitch]="filter.type">
            <input *ngSwitchCase="'text'" type="text" class="input filter__input" formControlName="{{filter.code}}">
            
            <input *ngSwitchCase="'date'" type="date" class="input filter__input" formControlName="{{filter.code}}">
          
            <select
              *ngSwitchCase="'select'"
              formControlName="{{ filter.code }}"
              class="filter__select input"
            >
              <option value="" selected>- Show all -</option>
              <option
                *ngFor="let option of filters[filter]"
                value="{{ option }}"
              >
                {{ option }}
              </option>
            </select>
            
          </ng-container>
  
        </div>
        
        <button type="submit" class="btn filter__block filter__submit">Submit</button>
      </form>
      <div *ngIf="loads" [@fadeInOut] class="filter-overlay">
        <img class="filter-overlay__image" src="/assets/images/loading.svg" alt="">
      </div>
    </div>
  `,
  styles: [`
    .filter-container {
        position: relative;
        margin-bottom: 20px;
    }
    
    .filter__form {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;
    }
    
    .filter__block {
        width: 27%;
        margin: 5px 0 0 0;
    }
    
    .filter {
        display: flex;
        align-items: center;
    }
    
    .filter__label {
        margin: 0 10px 0 0;
        width: 100px;
        text-transform: capitalize;
        font-size: 15px;
        word-break: break-word;
    }
    .filter__select {
        width: 140px;
        cursor: pointer;
        font-size: 15px;
    }
    .filter__submit {
        height: 35px;
        margin-top: 10px;
        margin-left: auto;
    }
    
    .filter-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, .7);
    }
    
    .filter-overlay__image {
        max-width: 300px;
        max-height: 300px;
    }
    
    @media only screen and (max-width: 900px) {
        .filter {
            justify-content: space-between;
            width: 100%;
            max-width: 450px;
            margin-left: auto;
            margin-right: auto;
        }
    }
    
    @media only screen and (max-width: 500px) {
        .filter__label {
            width: 42%;
        }
    
        .filter__input,
        .filter__select {
            width: 47%;
        }
    }
  `],
  animations: [appear(), fadeInOut()]
})
export class Filter implements OnChanges {
  private form: FormGroup;

  @Input()  filters       : {code: string; label: string; type: string; value?: any}[];
  @Input()  loads         : boolean;
  @Output() filterSubmit  : EventEmitter<Observable<any>> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges() {
    let filters = {};
    this.filters.forEach(filter => {
      filters[filter.code] = filter.value || '';
    });

    try {
      this.form = this.fb.group(filters);
    } catch (e) {console.warn(e)}

  }

  onSubmit(e) {
    this.filterSubmit.emit(this.form.value);
  }
}
