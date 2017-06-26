import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'order-block',
  template: `
    <div class="order">
        <div class="order__lastname">
        </div>
        <div class="order__firstname">
        </div>
        <div class="order__phone">
        </div>
    </div>
    <div class="order-items">
      
    </div>
  `
})
export class Order {
  @Input() order = {};
}
