import { trigger, state, style, animate, query, group, animateChild, transition, sequence, keyframes, AnimationEvent } from '@angular/animations';

export const slideInAnimation =
	trigger('routeAnimations', [
		transition('Page1 <=> Page2', [
			style({ position: 'relative' }),
			query(':enter, :leave', [
				style({
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%'
				})
			]),
			query(':enter', [
				style({ left: '-100%' })
			]),
			query(':leave', animateChild()),
			group([
				query(':leave', [
					animate('300ms ease-out', style({ left: '100%' }))
				]),
				query(':enter', [
					animate('300ms ease-out', style({ left: '0%' }))
				])
			]),
			query(':enter', animateChild()),
		]),
	]);

export const fadeOutInAnimation =
	trigger('routeAnimations', [
		transition('Page1 <=> Page2', [
			query(':enter', style({ position: 'fixed', opacity: '0' })),
			query(':leave', [
				style({ opacity: '1'}),
				animate('0.5s ease-in-out', style({ opacity: '0' })),
				style({ position: 'fixed'}),
			]),
			query(':enter', [
				style({ position: 'static', opacity: '0' }),
				animate('0.5s ease-in-out', style({ opacity: '1' }))
			]),
		]),
	]);


// Programmer note: Only elements positioned by the box model can be transformed. As a rule 
// of thumb, an element is positioned by the box model if it has display: block.

export const batmanAnimation =
	trigger('routeAnimations', [
		transition('Page1 <=> Page2', [
			query(':enter', style({ position: 'fixed', opacity: '0' })),
			group([
				query(':leave', [
					style({ opacity: '1'}),
					animate('1s ease-in', style({opacity: '0'})),
					style({ position: 'fixed' }),
				]),
				query('table', [
					style({ transform: 'rotateZ(0turn) scale(1, 1)' }),
					animate('1s ease-in', style({ transform: 'rotateZ(3.0turn) scale(0.1, 0.1)' })),
				]),
			]),
			group([
				query(':enter', [
					style({ position: 'static', opacity: '0' }),
					animate('1s ease-out', style({ opacity: '1' })),
				]),
				query('table', [
					style({ transform: 'rotateZ(0turn) scale(0.1, 0.1)' }),
					animate('1s ease-out', style({ transform: 'rotateZ(-3.0turn) scale(1, 1)' })),
				]),
			]),
		]),
	]);


