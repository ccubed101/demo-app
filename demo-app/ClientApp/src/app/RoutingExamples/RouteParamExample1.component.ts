import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Observer, PartialObserver, Subscription, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'RouteParamExample1',
	template: `
		<div style="text-align: center">
			Route Parameter Example #1
		</div>
		<div  style="text-align: center" *ngFor="let param of params$ | async">
			{{param}}
		</div>
	`,
	styles: [
	]
})
export class RouteParamExample1Component implements OnInit, OnDestroy {

	// Construction.
	constructor(private activatedRoute: ActivatedRoute) {
	}


	// Instance variables.

	subscriptions: Subscription[] = [];

	params$: Observable<string[]>;



	// Life-cycle

	ngOnInit() {
		this.params$ = this.activatedRoute.paramMap.pipe(

			map((paramMap: ParamMap) => {
				let paramValues = [];
				paramMap.keys.forEach(key => paramValues.push(paramMap.get(key)));
				return paramValues;

				//switchMap((paramMap: ParamMap) => from(paramMap.keys).pipe(map(key => paramMap.get(key))))
			})
		);
		this.params$.subscribe(
			item => console.log(item)
		)
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
