import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const _state = new BehaviorSubject<boolean>(null);

@Injectable()
export class ProgressBarService {
  private state = _state;
  public stateChanges = this.state.asObservable().distinctUntilChanged();

  show() {
    this.state.next(true);
  }

  hide() {
    this.state.next(false);
  }

  isVisible(): boolean {
    return this.state.getValue();
  }
}