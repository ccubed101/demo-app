"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.slideInAnimation = animations_1.trigger('routeAnimations', [
    animations_1.transition('Page1 <=> Page2', [
        animations_1.style({ position: 'relative' }),
        animations_1.query(':enter, :leave', [
            animations_1.style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        animations_1.query(':enter', [
            animations_1.style({ left: '-100%' })
        ]),
        animations_1.query(':leave', animations_1.animateChild()),
        animations_1.group([
            animations_1.query(':leave', [
                animations_1.animate('300ms ease-out', animations_1.style({ left: '100%' }))
            ]),
            animations_1.query(':enter', [
                animations_1.animate('300ms ease-out', animations_1.style({ left: '0%' }))
            ])
        ]),
        animations_1.query(':enter', animations_1.animateChild()),
    ]),
]);
exports.fadeOutInAnimation = animations_1.trigger('routeAnimations', [
    animations_1.transition('Page1 <=> Page2', [
        animations_1.query(':enter', animations_1.style({ position: 'fixed', opacity: '0' })),
        animations_1.query(':leave', [
            animations_1.style({ opacity: '1' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ opacity: '0' })),
            animations_1.style({ position: 'fixed' }),
        ]),
        animations_1.query(':enter', [
            animations_1.style({ position: 'static', opacity: '0' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ opacity: '1' }))
        ]),
    ]),
]);
// Programmer note: Only elements positioned by the box model can be transformed. As a rule 
// of rule of thumb, an element is positioned by the box model if it has display: block.
exports.batmanAnimation = animations_1.trigger('routeAnimations', [
    animations_1.transition('Page1 <=> Page2', [
        animations_1.query(':enter', animations_1.style({ position: 'fixed', opacity: '0' })),
        animations_1.group([
            animations_1.query(':leave', [
                animations_1.style({ opacity: '1' }),
                animations_1.animate('1s ease-in', animations_1.style({ opacity: '0' })),
                animations_1.style({ position: 'fixed' }),
            ]),
            animations_1.query('table', [
                animations_1.style({ transform: 'rotateZ(0turn) scale(1, 1)' }),
                animations_1.animate('1s ease-in', animations_1.style({ transform: 'rotateZ(3.0turn) scale(0.1, 0.1)' })),
            ]),
        ]),
        animations_1.group([
            animations_1.query(':enter', [
                animations_1.style({ position: 'static', opacity: '0' }),
                animations_1.animate('1s ease-out', animations_1.style({ opacity: '1' })),
            ]),
            animations_1.query('table', [
                animations_1.style({ transform: 'rotateZ(0turn) scale(0.1, 0.1)' }),
                animations_1.animate('1s ease-out', animations_1.style({ transform: 'rotateZ(-3.0turn) scale(1, 1)' })),
            ]),
        ]),
    ]),
]);
//# sourceMappingURL=Animations.js.map