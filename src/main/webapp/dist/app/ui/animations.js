"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
function slideToRight() {
    return animations_1.trigger('slideToRight', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateX(-100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateX(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(100%)' }))
        ])
    ]);
}
exports.slideToRight = slideToRight;
function slideToLeft() {
    return animations_1.trigger('slideToLeft', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateX(100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateX(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}
exports.slideToLeft = slideToLeft;
function slideToBottom() {
    return animations_1.trigger('slideToBottom', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateY(-100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateY(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(100%)' }))
        ])
    ]);
}
exports.slideToBottom = slideToBottom;
function slideToTop() {
    return animations_1.trigger('slideToTop', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateY(100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateY(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}
exports.slideToTop = slideToTop;
function appear() {
    return animations_1.trigger('appear', [
        animations_1.transition(':enter', [
            animations_1.style({ opacity: 0.001, height: 10 }),
            animations_1.group([
                animations_1.animate('0.25s ease', animations_1.style({ height: '*' })),
                animations_1.animate('0.35s 0.1s ease', animations_1.style({ opacity: 1 }))
            ])
        ]),
        animations_1.transition(':leave', [
            animations_1.group([
                animations_1.animate('0.25s ease', animations_1.style({ height: 0, margin: 0 })),
                animations_1.animate('0.25s 0.1s ease', animations_1.style({ opacity: 0 }))
            ])
        ])
    ]);
}
exports.appear = appear;
function changeWidth(width) {
    if (width === void 0) { width = '300px'; }
    return animations_1.trigger('changeWidth', [
        animations_1.state('collapsed', animations_1.style({ width: '*' })),
        animations_1.state('expanded', animations_1.style({ width: width })),
        animations_1.transition('collapsed <=> expanded', animations_1.animate('.3s ease')),
    ]);
}
exports.changeWidth = changeWidth;
function fadeInOut() {
    return animations_1.trigger('fadeInOut', [
        animations_1.state('collapsed', animations_1.style({ opacity: '*' })),
        animations_1.state('expanded', animations_1.style({ opacity: 0 })),
        animations_1.transition('collapsed <=> expanded', animations_1.animate('.3s ease')),
    ]);
}
exports.fadeInOut = fadeInOut;
//# sourceMappingURL=animations.js.map