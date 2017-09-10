import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs/Observable";

import { appear, fadeInOut } from '../animations';

@Component({
  moduleId: module.id,
  selector: 'filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
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
    } catch (e) {
      console.warn(e);
    }

  }

  onSubmit(e) {
    this.filterSubmit.emit(this.form.value);
  }
}
