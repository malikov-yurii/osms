import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'order-block',
  template: `
    <div class="order">
        <div class="order-firstName">
            {{ order.firstName }}
        </div>
        <div class="order-phone">
            {{ order.phoneNumber }}
        </div>
    </div>
  `
})
export class Order {
  @Input() order = {};
}