import { Component, ViewChild } from '@angular/core';
import { RotatorComponent } from '../RotatorComponent/Rotator.component';

@Component({
	selector: 'rotator-wrapper',
	template: `
		<div style="text-align: center; overflow: hidden">
			<button (click)="onPanel1()">&lt;= Rotate</button>
			<button (click)="onPanel2()">Rotate =&gt;</button>
			<rotator perspective='600px' (onMidTransition)='onMidRotation($event)' style="padding: 2em; display: block">
				<thick-frame-3d class="frame">
					<div style="height: 250px; padding: 1em">
						<div *ngIf="panel == 'panel1'">
							{{banner}}
							<div style="position: relative; top: 20px; left: 20px; width: 30px; height: 15px; background-color: red"></div>
						</div>
						<div *ngIf="panel == 'panel2'">
							------{{banner}}-----
							<div>Text</div>
							<div>Text</div>
							<div>Text</div>
							<div>Text</div>
						</div>
						<div *ngIf="panel == 'panel3'">{{banner}}</div>
					</div>
				</thick-frame-3d>
			</rotator>
		</div>
	`,
})
export class RotatorWrapperComponent {

	constructor() { }


	// Access to child components
	@ViewChild(RotatorComponent, { static: true }) rotator: RotatorComponent;

	// Constants

	// Panels
	readonly panel1: string = 'panel1';
	readonly panel2: string = 'panel2';


	// Instance variables.

	banner: string = this.panel2;

	panel: string = this.panel2;


	onPanel1() {
		this.rotator.rotateClockwise();
	}

	onPanel2() {
		this.rotator.rotateCounterClockwise();
	}

	onMidRotation($event) {
		console.log($event);
	}

}
