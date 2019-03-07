import { Component } from '@angular/core';

import { NavMenuItem } from '../app/expanding-nav-menu/NavMenuItem';

@Component({
    selector: 'app-root',
	template: `
		<expanding-nav-menu [navMenuTree]="navMenuTree"></expanding-nav-menu>
		<router-outlet></router-outlet>
    `,
  styles: [
  ]
})
export class AppComponent {
	title = 'app';

	navMenuTree: NavMenuItem[] = [
		new NavMenuItem("Splash", "/", null),
		//new NavMenuItem("Commit History", "analytics", null),
		new NavMenuItem("Reactive Forms Examples", null, [
			new NavMenuItem("Reactive Forms Example #1", "reactive-forms-demo/reactive-forms-example1", null),
			new NavMenuItem("Reactive Forms Example #2", "reactive-forms-demo/reactive-forms-example2", null),
			new NavMenuItem("Reactive Forms Example #3", "reactive-forms-demo/reactive-forms-example3", null),
		]),
	];

	//navMenuTree: { Text: string, Route: string, Children: {} }[] = [
	//	{ Text: "Splash", Route: "/", Children: null },
	//	{ Text: "Commit History", Route: "reactive-forms-demo", Children: null },
	//	{ Text: "Reactive Forms Examples", Route: null, Children: [
	//			{ Text: "Reactive Forms Example #1", Route: "reactive-forms-demo/reactive-forms-example1", Children: null },
	//			{ Text: "Reactive Forms Example #2", Route: "reactive-forms-demo/reactive-forms-example2", Children: null },
	//			{ Text: "Reactive Forms Example #3", Route: "reactive-forms-demo/reactive-forms-example3", Children: null },
	//		]
	//	},
	//];


}
