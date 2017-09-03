import { Component } from '@angular/core';

import { fadeInOut } from './animations';

@Component({
  selector: 'nav-header',
  templateUrl: '/assets/templates/ui/header.html',
  styleUrls: ['assets/css/ui/header.css'],
  animations: [fadeInOut({paramsVoid: 'collapsed', paramsAny: 'expanded'})]
})
export class Header {
  private menuState: string;

  constructor() {
    this.menuState = 'collapsed';
  }

  toggleMenuState() {
    this.menuState = this.menuState === 'collapsed' ? 'expanded' : 'collapsed';
  }
}
