import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterState } from '@angular/router';
import { Observable, Observer, PartialObserver, Subscription, of } from 'rxjs';

@Component({
	selector: 'RoutingExamples',
	template: `
		<div style="margin-left: 10em; margin-right: 10em">
			<div class="anchorContainer">
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { second: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;second :['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { third: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;third :['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { fourth: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;fourth :['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample2'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample2'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { second: ['RoutingExample2'] }}]">[routerLink]=[&#123; outlets: &#123;second :['RoutingExample2'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { third: ['RoutingExample2'] }}]">[routerLink]=[&#123; outlets: &#123;third :['RoutingExample2'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { fourth: ['RoutingExample2'] }}]">[routerLink]=[&#123; outlets: &#123;fourth :['RoutingExample2'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample3'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample3'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { second: ['RoutingExample3'] }}]">[routerLink]=[&#123; outlets: &#123;second :['RoutingExample3'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { third: ['RoutingExample3'] }}]">[routerLink]=[&#123; outlets: &#123;third :['RoutingExample3'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { fourth: ['RoutingExample3'] }}]">[routerLink]=[&#123; outlets: &#123;fourth :['RoutingExample3'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample4'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample4'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { second: ['RoutingExample4'] }}]">[routerLink]=[&#123; outlets: &#123;second :['RoutingExample4'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { third: ['RoutingExample4'] }}]">[routerLink]=[&#123; outlets: &#123;third :['RoutingExample4'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { fourth: ['RoutingExample4'] }}]">[routerLink]=[&#123; outlets: &#123;fourth :['RoutingExample4'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample4'], second: ['RoutingExample3'], third: ['RoutingExample2'], fourth: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample4'], second: ['RoutingExample3'], third: ['RoutingExample2'], fourth: ['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="['none']">[routerLink]=['none']</a>
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
export class RoutingExamplesComponent implements OnInit, OnDestroy {

	// Construction.
	constructor(private activatedRoute: ActivatedRoute) {
		console.log('---- activatedRoute.paremt ----');
		console.log(this.activatedRoute.parent);
		console.log('---- activatedRoute.outlet ----');
		console.log(this.activatedRoute.outlet);
		console.log('---- activatedRoute.firstChild ----');
		console.log(this.activatedRoute.firstChild);
		console.log('---- children ----')
		this.activatedRoute.children.forEach((child) => {
			console.log(child);
		});
		console.log('---- observables ----');
	}


	// Instance variables.

	subscriptions: Subscription[] = [];


	// Life-cycle

	ngOnInit() {
		this.subscriptions.push(
			this.activatedRoute.url.subscribe(this.url$),
		);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}


	// Observers

	url$: PartialObserver<any> = {
		next: (item) => { console.log(item); }
	};


	// Event handlers.
	navigationStart() {
		console.log('Event: NavigationStart');
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
