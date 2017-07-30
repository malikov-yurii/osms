import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { sessionTimeoutStream } from "./services/api";
import { PopupService } from "./services/popup";
import { NotyService } from "./services/noty";

@Component({
  selector: 'app',
  templateUrl: '/assets/templates/app.html',
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
        .renderPopup('Warning!', 'You session has timed out!\nPlease, reload the page')
        .subscribe();
    });
  }

}
