import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { sessionTimeoutStream } from "./services/api.service";
import { PopupService }         from "./services/popup.service";
import { NotyService }          from "./services/noty.service";

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
    <progress-bar></progress-bar>
    <nav-header></nav-header>
    <router-outlet></router-outlet>
  `,
  providers: [PopupService]
})
export class App implements OnInit {

  constructor(
    private popupService: PopupService,
    private notyService: NotyService,
    private viewRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.popupService.viewContainerRef = this.viewRef;
    this.notyService.viewContainerRef = this.viewRef;

    sessionTimeoutStream.subscribe(() => {
      this.popupService
        .renderPopup('text', 'Warning!', 'You session has timed out!\nPlease, reload the page')
        .subscribe();
    });
  }

}
