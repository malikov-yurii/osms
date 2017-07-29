import {trigger, state, group, animate, style, transition} from '@angular/animations';

export function slideToRight() {
  return trigger('slideToRight', [
    state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

export function slideToLeft() {
  return trigger('slideToLeft', [
    state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}

export function slideToBottom() {
  return trigger('slideToBottom', [
    state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
    state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
    ])
  ]);
}

export function slideToTop() {
  return trigger('slideToTop', [
    state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
    state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
    ])
  ]);
}

export function appear() {
  return trigger('appear', [
    transition(':enter', [
      style({opacity: 0.001, height: 10}),
      group([
        animate('0.25s ease', style({height: '*'})),
        animate('0.35s 0.1s ease', style({opacity: 1}))
      ])
    ]),
    transition(':leave', [
      group([
        animate('0.25s ease', style({height: 0, margin: 0})),
        animate('0.25s 0.1s ease', style({opacity: 0}))
      ])
    ])
  ])
}

export function changeWidth(width: string = '300px') {
  return trigger('changeWidth', [
    state('collapsed', style({width: '*'})),
    state('expanded', style({width: width})),
    transition('collapsed <=> expanded', animate('.3s ease')),
  ])
}

export function fadeInOut() {
  return trigger('fadeInOut', [
    state('collapsed', style({opacity: '*'})),
    state('expanded', style({opacity: 0})),
    transition('collapsed <=> expanded', animate('.3s ease')),
  ])
}
