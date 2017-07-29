import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'nav-header',
  templateUrl: '/assets/templates/ui/header.html',
  styleUrls: ['assets/css/ui/header.css'],
  animations: [
    trigger('fadeInOut', [
      state('collapsed', style({display: 'none', opacity: 0})),
      state('expanded', style({display: 'block', opacity: 1})),
      transition('collapsed <=> expanded', animate('.3s ease')),
    ])
  ]
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
