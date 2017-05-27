import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'order-block',
  template: `
    <div class="order">
        <div class="order__lastname">
            {{ order.lastName }}
        </div>
        <div class="order__firstname">
            {{ order.firstName }}
        </div>
        <div class="order__phone">
            {{ order.phoneNumber }}
        </div>
    </div>
    <div class="order-items">
      
    </div>
  `
})
export class Order {
  @Input() order = {};
}
