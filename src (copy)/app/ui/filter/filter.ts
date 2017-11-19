import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";

import { appear, fadeInOut } from '../animations';

@Component({
  moduleId: module.id,
  selector: 'data-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
  animations: [appear(), fadeInOut()]
})
export class DataFilter implements OnChanges, OnInit {
  public form: FormGroup;

  @Input()  filters       : {code: string; label: string; type: string; value?: any; autocomplete?: boolean}[];
  @Input()  loads         : boolean;
  @Output() filterSubmit  : EventEmitter<Observable<any>> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    const loads = changes.loads;
    if (!loads.isFirstChange() && loads.previousValue !== loads.currentValue) {
      loads.currentValue ? this.form.disable() : this.form.enable();
    }
  }

  ngOnInit() {
    this.filters.map(filter => {
      this.form.setControl(filter.code, new FormControl(filter.value || ''));
    })
  }

  onSubmit(e) {
    this.filterSubmit.emit();
  }
}