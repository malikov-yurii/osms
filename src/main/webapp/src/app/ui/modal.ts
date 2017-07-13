import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  template: `
    <div class="modal">
      <div class="modal-head">
        Update customer
      </div>
      <div class="modal-close">X</div>
      
      <form class="modal-content" [formGroup]="modalForm" (ngSubmit)="onSubmit()">
      
        
        <div class="modal-formgroup">
          <label>ID</label>
          <div class="modal-input">{{ data.id }}</div>
        </div>
      
        <div class="modal-formgroup" *ngFor="let key of data | keys:['id']">
          <label for="{{ key }}">{{ key }}</label>
          <input id="{{ key }}" type="text" formControlName="key">
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  `
})
export class ModalComponent {
  @Input() data: any;

  modalForm = new FormGroup(this.data);

  onSubmit() {
    console.log(this.modalForm.getRawValue());
    console.log(this.modalForm.value);
  }
}
