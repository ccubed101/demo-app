import { Component, NgZone, ApplicationRef} from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';

@Component({
	selector: 'rotation',
	template: `
		<div style="text-align: center; overflow: hidden">
			<button id="panel1Bttn" (click)="onPanel1()">Panel 1</button>
			<button id="panel2Bttn" (click)="onPanel2()">Panel 2</button>
			<button id="panel3Bttn" (click)="onPanel3()">Panel 3</button>
			<div>
				<!-- When 'perspective' style is applied to div below it can have some unusual effect on other
					 parts of the DOM.  In particular the EpandingNavMenu would unexpectedly close as soon as
                     the mouse was over the div.  To alleviate this problem the div below is also styled as
                     'display: inline-block' so that content of div determines the dimensions of the div.  Then
					 add containing div (above) so that standard div behavior is maintained. -->
				<div style="display: inline-block" [style.perspective.px]='perspective'>
					<div class="target" [@rotate]="{ value: state, params: { } }" (@rotate.done)="onAnimationEvent($event)">
						<thick-frame-3d class="frame">
								<div style="height: 250px">
									<div *ngIf="panel == 'panel1'">
										{{banner}}
										<div style="position: relative; top: 20px; left: 20px; width: 30px; height: 15px; background-color: red"></div>
									</div>
									<div *ngIf="panel == 'panel2'">
										{{banner}}
										<div>Text</div>
										<div>Text</div>
										<div>Text</div>
										<div>Text</div>
									</div>
									<div *ngIf="panel == 'panel3'">{{banner}}</div>
							</div>
						</thick-frame-3d>
					</div>
				</div>
			</div>
		</div>
	`,
	styles: [
		".target { width: 400px; margin-left: auto; margin-right: auto; margin-top: 10em; margin-bottom: 10em }",
	],
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
export class RotationComponent {

	constructor(private zone: NgZone, private applicationRef: ApplicationRef) { }

	// Constants

	// Panels
	readonly panel1: string = 'panel1';
	readonly panel2: string = 'panel2';
	readonly panel3: string = 'panel3';

	// States
	readonly rotateNeg180: string = 'rotateNeg180';
	readonly rotateNeg90: string = 'rotateNeg90';
	readonly rotate0: string = 'rotate0';
	readonly rotate90: string = 'rotate90';
	readonly rotate180: string = 'rotate180';


	// Instance variables.

	perspective: number = 600;

	banner: string = this.panel2;

	panel: string = this.panel2;

	state: string = this.rotate0;

	states: string[] = [];

	inTransition: boolean = false;


	onPanel1() {

		if (this.panel !== this.panel1 && this.inTransition === false) {

			while (this.states.length > 0)
				this.states.pop();

			if (this.panel === this.panel2)
				this.states.push(this.rotateNeg90, this.rotate90, this.rotate0);
			if (this.panel === this.panel3)
				this.states.push(this.rotateNeg90, this.rotate90, this.rotate0, this.rotateNeg90, this.rotate90, this.rotate0);

			this.state = this.states.shift();

			this.inTransition = true;
		}
	}

	onPanel2() {

		if (this.panel !== this.panel2 && this.inTransition === false) {

			while (this.states.length > 0)
				this.states.pop();

			if (this.panel === this.panel1)
				this.states.push(this.rotate90, this.rotateNeg90, this.rotate0);
			if (this.panel === this.panel3)
				this.states.push(this.rotateNeg90, this.rotate90, this.rotate0);

			this.state = this.states.shift();

			this.inTransition = true;
		}
	}

	onPanel3() {

		if (this.panel !== this.panel3 && this.inTransition === false) {

			while (this.states.length > 0)
				this.states.pop();

			if (this.panel === this.panel2)
				this.states.push(this.rotate90, this.rotateNeg90, this.rotate0);
			// panel 1 => panel 3
			if (this.panel === this.panel1)
				this.states.push(this.rotate90, this.rotateNeg90, this.rotate0, this.rotate90, this.rotateNeg90, this.rotate0);

			this.state = this.states.shift();

			this.inTransition = true;
		}
	}

	onAnimationEvent(event: AnimationEvent) {

		if (this.states.length > 0) {

			this.state = this.states.shift();

			if (event.toState === this.rotate90 && event.fromState !== this.rotateNeg90)
				this.banner = this.panel = (this.panel === this.panel1) ? this.panel2 : this.panel3;

			else if (event.toState === this.rotateNeg90 && event.fromState !== this.rotate90)
				this.banner = this.panel = (this.panel === this.panel3) ? this.panel2 : this.panel1;

			if (this.states.length === 0)
				this.inTransition = false;
		}
	}
}
