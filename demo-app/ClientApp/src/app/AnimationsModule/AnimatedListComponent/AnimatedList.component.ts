import { Component } from '@angular/core';
import { trigger, transition, animate, style, query, stagger, animateChild } from '@angular/animations';

@Component({
	selector: 'animated-list',
	template: `
		<div class='buttons'>
			<button (click)="toggle()">Show / Hide Items</button>
			<button (click)="removeLast()">Remove Last Item</button>
		</div>
		<div style="text-align: center">
			<div class="listContainer" [@listAnimation]='listItems.length'>
				<div *ngFor="let item of listItems; let i=index">
					<div style="text-align: center">
						<div class="listItem">
							<div>{{item.title}}</div>
							<div>{{item.id}}</div>
							<div>{{item.date | date}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	styles: [
		".buttons { text-align: center; margin-top: 2em }",
		".listContainer { margin-top: 3em; display: inline-block; }",
		".listItem { border: 1px solid black; margin-bottom: 1em; padding: 1em; white-space: nowrap; overflow: hidden; border-radius: 10px; width: 300px; text-align: left; display: inline-block }",
	],

	// In the following animation the 'trigger' is applied to the container div not the
	// individual list items.  So the trigger fires whenever the # of list items change.
	// You must then use query() to specify that all the list items should be animated
	// when they 'enter' or 'leave' the page.
	animations: [
		trigger('listAnimation', [
			transition('* => *', [
				query(':enter .listItem', [
					style({ width: 0, opacity: 0 }),
					stagger(50, [
						animate('100ms', style({ width: '*', opacity: 1 })),
					])
				], { optional: true }), 
				query(':leave .listItem', [
					stagger(-50, [
						animate('100ms', style({ width: 0, opacity: 0 }))
					]),
				], { optional: true })
			]),
		]),
	],
})
export class AnimatedListComponent {

	items: { title: string, id: number, date: number }[] = [
		{ title: 'How To Write Crazy Lists', id: 12345, date: Date.now() },
		{ title: 'How Crazy Lists Changed My Life', id: 222, date: Date.now() },
		{ title: 'The Crazy Lists Craze', id: 54321, date: Date.now() },
		{ title: 'Crazy Lists Ruined My Life', id: 3232, date: Date.now() },
	];

	listItems: { title: string, id: number, date: number }[] = [];

	show: boolean = true;


	ngOnInit() {
		this.items.forEach((item) => {
			this.listItems.push(item);''
		})
	}

	display() {
		return this.show ? '' : 'none';
	}

	toggle() {
		this.show = !this.show;
		if (this.show) {
			this.items.forEach((item) => {
				this.listItems.push(item);
			})
		}
		else {
			while (this.listItems.length > 0)
				this.listItems.pop();
		}
	}

	removeLast() {
		if (this.listItems.length > 0)
			this.listItems.pop();
	}
}
