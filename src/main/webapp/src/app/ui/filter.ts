import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter',
  template: `
    <div class="filter-wrapper">
      <div
        class="filter"
        *ngFor="let filter of filters"
      >
        <div class="filter-label">
          {{ filter.label }}
        </div>
        
        <select 
          class="filter-select"
          (change)="onChange(filter.label, $event.target.value)"
        >
          <option value="">- Show all -</option>
          <option
            *ngFor="let option of filter.data"
            value="{{ option }}"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  `
})
export class Filter {
  @Input() filters;
  @Output() filtered = new EventEmitter();

  onChange(label, data) {
    this.filtered.emit({label, data});
  }
}
