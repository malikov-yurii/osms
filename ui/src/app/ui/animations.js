import { trigger, state, group, animate, style, transition } from '@angular/animations';
export function slideToRight() {
    return trigger('slideToRight', [
        state('void', style({ position: 'fixed', width: '100%' })),
        state('*', style({ position: 'fixed', width: '100%' })),
        transition(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}
export function slideToLeft() {
    return trigger('slideToLeft', [
        state('void', style({})),
        transition(':enter', [
            style({ transform: 'translateX(100%)', position: 'fixed', width: '100%' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)', position: 'fixed', width: '100%' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}
export function slideToBottom() {
    return trigger('slideToBottom', [
        state('void', style({ position: 'fixed', width: '100%', height: '100%' })),
        state('*', style({ position: 'fixed', width: '100%', height: '100%' })),
        transition(':enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
        ])
    ]);
}
export function slideToTop() {
    return trigger('slideToTop', [
        state('void', style({ position: 'fixed', width: '100%', height: '100%' })),
        state('*', style({ position: 'fixed', width: '100%', height: '100%' })),
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}
export function appear() {
    return trigger('appear', [
        transition(':enter', [
            style({ 'transform': 'translateY(-20px)', opacity: 0 }),
            group([
                animate('0.25s ease', style({ 'transform': 'translateY(0)' })),
                animate('0.35s 0.1s ease', style({ opacity: 1 }))
            ])
        ]),
        transition(':leave', [
            style({ 'transform': 'translateX(0)', opacity: 1 }),
            group([
                animate('0.25s ease', style({ 'transform': 'translateX(100px)' })),
                animate('0.25s 0.1s ease', style({ opacity: 0 }))
            ])
        ])
    ]);
}
export function changeWidth(width) {
    if (width === void 0) { width = '300px'; }
    return trigger('changeWidth', [
        state('collapsed', style({ width: '*' })),
        state('expanded', style({ width: width })),
        transition('collapsed <=> expanded', animate('.3s ease')),
    ]);
}
export function fadeInOut(params) {
    return trigger('fadeInOut', [
        state(params ? params.paramsVoid : 'void', style({ display: 'none', opacity: 0 })),
        state(params ? params.paramsAny : 'any', style({ display: '*', opacity: 1 })),
        transition((params ? params.paramsVoid : 'void') + " <=> " + (params ? params.paramsAny : 'any'), animate('.2s ease')),
    ]);
}
export function appearNoty() {
    return trigger('appearNoty', [
        transition(':enter', [
            style({ transform: 'translate(-50%, 100%)', color: 'transparent' }),
            group([
                animate('275ms', style({ transform: 'translate(-50%, 0)', easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)' })),
                animate('275ms 100ms ease', style({ color: '#fff' }))
            ])
        ]),
        transition('* => destroyed', [
            animate('250ms', style({ transform: 'translate(-50%, 100%)', easing: 'cubic-bezier(0.4, 0.0, 1, 1)' }))
        ])
    ]);
}
