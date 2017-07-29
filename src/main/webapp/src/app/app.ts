import { Component, OnInit, ViewContainerRef, AfterViewInit } from '@angular/core';

import { sessionTimeoutStream } from "./services/api";
import { PopupService } from "./services/popup";

@Component({
  selector: 'app',
  templateUrl: '/assets/templates/app.html',
  providers: [PopupService]
})
export class App implements OnInit, AfterViewInit {

  constructor(
    private popupService: PopupService,
    private viewRef: ViewContainerRef
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.popupService.viewContainerRef = this.viewRef;

    sessionTimeoutStream.subscribe(() => {
      this.popupService
        .renderPopup('Warning!', 'You session has timed out!\nPlease, reload the page')
        .subscribe();
    });

  }

}
