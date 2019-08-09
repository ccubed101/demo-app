import { Component } from '@angular/core';
import { ActivatedRoute, RouterState, RouterOutlet } from '@angular/router';
import { slideInAnimation, fadeOutInAnimation, batmanAnimation } from './Animations';
import { trigger, state, style, animate, query, group, animateChild, transition, keyframes, AnimationEvent } from '@angular/animations';

@Component({
	selector: 'animations',
	template: `
		<div class="title">
			Animations
		</div>
		<div style="text-align: center; margin-top: 6em;">
			<div class="pageDiv">
				<div class="pageContainer" [@routeAnimations]="prepareRoute(outlet)">
					<router-outlet #outlet="outlet"></router-outlet>
				</div>
			</div>
		</div>
		<!--
		<div style="text-align: center; margin-top: 6em;">
			<div style="border: 1px solid black; width: 300px; height: 250px; vertical-align: middle; overflow: hidden; margin-left: 30em" >
				<div [@routeAnimations]="prepareRoute(outlet)">
					<router-outlet #outlet="outlet"></router-outlet>
				</div>
			</div>
		</div>
		-->
	`,
	styles: [
		".title { text-align: center; }",
		".pageDiv { display: inline-block; }",
		// "display: table-cell; vertical-align: middle;" below are needed to center contents of container vertically.
		".pageContainer { border: 1px solid black; width: 300px; height: 250px; display: table-cell; vertical-align: middle; overflow: hidden }",
	],
	animations: [
		//slideInAnimation,
		batmanAnimation,
	],
})
export class AnimationsRootComponent {

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	}
}
