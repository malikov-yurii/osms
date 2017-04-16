import { Component } from '@angular/core';

@Component({
  template: `
    <nav-header></nav-header>

    <div>
        <router-outlet></router-outlet>
    </div>
  `
})

export class Main {}
