import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { appearNoty } from "./animations";

@Component({
  template: `
    <div class="noty"
      [@appearNoty]="animationState"
      (@appearNoty.done)="onAnimationDone($event)"
      (click)="animationState = 'destroyed'"
      [class.error]="isError"
    >
      {{ message }}
    </div>
  `,
  styles: [`
    .noty {
      position: fixed;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      min-width: 288px;
      max-width: 568px;
      padding: 14px 24px;
      background: #323232;
      border-radius: 2px;
      color: #fff;
    }
    .noty.error {
      background: #990000;
    }
  `],
  animations: [appearNoty()]
})
export class NotyComponent {
  public destroyedStream: Subject<any>;
  public message: string;
  public isError: boolean;
  private animationState: string;
  private destroyTimeout;

  constructor() {
    this.destroyedStream = new Subject();
    this.message = 'Noty message!';
    this.isError = false;
    this.animationState = 'idle';

    this.destroy();
  }

  private onAnimationDone(e) {
    if (e.toState === 'destroyed') {
      this.destroyedStream.next();
    }
  }

  public destroy(delay = 3000) {
    clearTimeout(this.destroyTimeout);
    this.destroyTimeout = setTimeout(() => this.animationState = 'destroyed', delay);
  }

}
