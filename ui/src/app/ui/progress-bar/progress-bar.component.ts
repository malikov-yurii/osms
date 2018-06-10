import { Component } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';

@Component({
  moduleId: module.id,
  selector: `progress-bar`,
  template: `<div *ngIf="isVisible" class="progress-bar"></div>`,
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  isVisible: boolean;

  constructor(private service: ProgressBarService) {
    this.service.stateChanges.subscribe(state => this.isVisible = state);
  }

}