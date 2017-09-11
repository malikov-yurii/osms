import { Component } from '@angular/core';

import { fadeInOut } from '../animations';

@Component({
  moduleId: module.id,
  selector: 'nav-header',
  templateUrl: 'header.html',
  styleUrls: ['header.css'],
  animations: [fadeInOut({paramsVoid: 'collapsed', paramsAny: 'expanded'})]
})
export class Header {
  public menuState: string;

  constructor() {
    this.menuState = 'collapsed';
  }

  toggleMenuState() {
    this.menuState = this.menuState === 'collapsed' ? 'expanded' : 'collapsed';
  }
}
