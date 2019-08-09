import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterState } from '@angular/router';
import { Observable, Observer, PartialObserver, Subscription, of } from 'rxjs';

@Component({
	selector: 'RoutingExamples',
	template: `
		<div style="margin-left: 10em; margin-right: 10em">
			<div class="anchorContainer">
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RouteParameterExample1', 1, 2, 3, {extra: 4}] }}]">[routerLink]=[&#123; outlets: &#123;primary :['Route Parameter Example 1', 1, 2, 3, &#123;extra: 4&#125;] &#125;&#125;]</a>
				</div>
			</div>
		</div>
		<div class="flexContainer">
			<div class="flexItem routerOutletContainer">
				<div>primary router-outlet</div>
				<router-outlet></router-outlet>
			</div>
			<div class="flexItem routerOutletContainer">
				<div>second router-outlet</div>
				<router-outlet name="second"></router-outlet>
			</div>
			<div class="flexItem routerOutletContainer">
				<div>third router-outlet</div>
				<router-outlet name="third"></router-outlet>
			</div>
			<div class="flexItem routerOutletContainer">
				<div>fourth router-outlet</div>
				<router-outlet name="fourth"></router-outlet>
			</div>
		</div>
	`,
	styles: [
		".centerText { text-align: center }",
		".routerOutletContainer { border: 1px solid black; height: 200px; }",
		".anchorContainer { display: flex; flex-wrap: wrap; justify-content: center; }",
		".anchorItem { display: flex; border: 1px solid black; padding: 1em; margin: 1em; }",
		".flexContainer { display: flex; flex-wrap: wrap; border: 1px solid black }",								// Can't use '.container' because it is in use elsewhere.
		".flexItem { width: 50% }",
	]
})
export class RouteParamExamplesComponent implements OnInit, OnDestroy {

	// Construction.
	constructor(private activatedRoute: ActivatedRoute) {
	}


	// Instance variables.

	subscriptions: Subscription[] = [];


	// Life-cycle

	ngOnInit() {
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}

/* Programmer Notes:
 *
 * >> In the statement below 'RoutingExample1' will be interpreted as a property of the RoutingExamplesComponent class.
 *		<a [routerLink]="RoutingExample1">Link #1</a>
 *    Intead use
 *		<a [routerLink]="['RoutingExample1']">Link #1</a>
 *
 *
 */
