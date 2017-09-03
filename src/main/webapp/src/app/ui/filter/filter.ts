import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { appear } from '../animations';

@Component({
  selector: 'filter',
  template: `
    <form class="filter-container" [formGroup]="form" [@appear]>
      <div
        class="filter"
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
    </form>
  `,
  styles: [`
    .filter-container {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }
    
    .filter {
        display: flex;
        align-items: center;
        width: 30%;
        margin: 5px 3% 0 0;
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
  animations: [appear()]
})
export class Filter implements OnInit, OnChanges {
  @Input() filters: {code: string; label: string; type: string; value?: any}[];
  @Output() filtered = new EventEmitter<{any}>();

  private form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.form.valueChanges
      .debounceTime(500)
      .subscribe(value => this.filtered.emit(value));
  }

  ngOnChanges() {
    let filters = {};
    this.filters.forEach(filter => {
      filters[filter.code] = filter.value ? filter.value : '';
    });

    try {
      this.form = this.fb.group(filters);
    } catch (e) {console.warn(e)}

  }
}
