import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';

@Component({
	selector: 'rotator',
	template: `
		<div id="test">
			<!-- When 'perspective' style is applied to div below it can have some unusual effect on other
				 parts of the DOM.  In particular the EpandingNavMenu would unexpectedly close as soon as
                 the mouse was over the div.  To alleviate this problem the div below is also styled as
                 'display: inline-block' so that content of div determines the dimensions of the div.  Then
				 add containing div (above) so that standard div behavior is maintained. -->
			<div style="display: inline-block" [ngStyle]="{'perspective': perspective }">
				<div class="target" [@rotate]="{ value: state, params: { } }" (@rotate.done)="onAnimationEvent($event)">
					<ng-content></ng-content>
				</div>
			</div>
		</div>
	`,
	animations: [
		trigger('rotate', [
			state('rotateNeg90',
				style({ transform: 'rotateY(-90deg)' })
			),
			state('rotate0',
				style({ transform: 'rotateY(0deg)' })
			),
			state('rotate90',
				style({ transform: 'rotateY(90deg)' })
			),
			transition('rotate0 => rotate90', [
				animate(250, keyframes([
					style({ transform: 'rotateY(0deg)' }),
					style({ transform: 'rotateY(90deg)' }),
				])),
			]),
			transition('rotate0 => rotateNeg90', [
				animate(250, keyframes([
					style({ transform: 'rotateY(0deg)' }),
					style({ transform: 'rotateY(-90deg)' }),
				])),
			]),
			transition('rotate90 => rotate0', [
				animate(250, keyframes([
					style({ transform: 'rotateY(90deg)' }),
					style({ transform: 'rotateY(0deg)' }),
				])),
			]),
			transition('rotateNeg90 => rotate0', [
				animate(250, keyframes([
					style({ transform: 'rotateY(-90deg)' }),
					style({ transform: 'rotateY(0deg)' }),
				])),
			]),
		],
		)],
})
export class RotatorComponent {

	constructor() { }

	// Inputs

	@Input() perspective: string;


	// Outputs

	@Output() onMidTransition = new EventEmitter()


	// Constants

	// States
	readonly rotateNeg90: string = 'rotateNeg90';
	readonly rotate0: string = 'rotate0';
	readonly rotate90: string = 'rotate90';


	// Instance variables.

	state: string = this.rotate0;

	states: string[] = [];

	// Set to 'true' while a transition is occurring.
	inTransition: boolean = false;


	// Methods

	rotateClockwise() {

		while (this.states.length > 0)
			this.states.pop();

		this.states.push(this.rotateNeg90, this.rotate90, this.rotate0);

		// Start the transitions
		this.state = this.states.shift();
		this.inTransition = true;
	}

	rotateCounterClockwise() {

		while (this.states.length > 0)
			this.states.pop();

		this.states.push(this.rotate90, this.rotateNeg90, this.rotate0);

		// Start the transitions
		this.state = this.states.shift();
		this.inTransition = true;
	}


	// Event handlers

	onAnimationEvent(event: AnimationEvent) {

		if (this.states.length > 0) {

			if (event.fromState === this.rotate0)
				this.onMidTransition.emit({ exampleProp: 'examplePropValue' });

			this.state = this.states.shift();
		}
		else {
			this.inTransition = false;
		}
	}
}
