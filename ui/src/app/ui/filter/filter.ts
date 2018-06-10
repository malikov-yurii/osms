import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/take';

import { appear, fadeInOut } from '../animations';

@Component({
  moduleId: module.id,
  selector: 'data-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
  animations: [appear(), fadeInOut()]
})
export class DataFilter implements OnInit {
  public form: FormGroup;

  @Input()  filters       : {code: string; label: string; type: string; value?: any; autocomplete?: boolean}[];
  @Output() filterSubmit  : EventEmitter<Observable<any>> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.filters.forEach(filter => {
      this.form.addControl(filter.code, new FormControl(filter.value || ''));
    });

    this.form.addControl('productId', new FormControl(null));
    this.form.addControl('productVariationId', new FormControl(null));
  }

  onSubmit() {
    this.filterSubmit.emit(this.form.value);
  }

  onAutocomplete(event, code) {
    this.form.get(code).setValue(event.productName);

    let idType;
    if (event.productVariationId) {
      idType = 'productVariationId';
    } else if (event.productId) {
      idType = 'productId';
    }

    if (event[idType]) {
      this.form.get(idType).setValue(event[idType]);
      this.form.get(code).valueChanges.take(1).subscribe(() => {
        console.log('hello');
        this.form.get(idType).setValue(null)
      });
    }

  }
}