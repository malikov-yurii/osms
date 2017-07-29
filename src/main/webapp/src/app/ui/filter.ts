import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'filter',
  template: `
    <form class="filter-container" [formGroup]="form">
      <div
        class="filter"
        *ngFor="let filter of filters | keys"
      >
        <div class="filter__label">
          {{ filter }} :
        </div>
        
        <select
          class="filter__select input"
          formControlName="{{ filter }}"
          (change)="onChange(filter, $event.target.value)"
        >
          <option value="" selected>- Show all -</option>
          <option
            *ngFor="let option of filters[filter]"
            value="{{ option }}"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </form>
  `,
  styles: [`
    .filter {
        display: flex;
        align-items: center;
        margin: 5px 0;
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
    @media only screen and (max-width: 500px) {
      .filter {
          justify-content: space-between;
      }
      .filter__label {
          width: 42%;
      }
      
      .filter__select {
          width: 47%;
      }
    }
  `]
})
export class Filter implements OnChanges {
  @Input() filters: {any};
  @Output() filtered = new EventEmitter<{any}>();

  private form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges() {
    try {
      this.form = this.fb.group(this.filters);
    } catch (e) {}
  }

  onChange() {
    this.filtered.emit(this.form.value);
  }
}
