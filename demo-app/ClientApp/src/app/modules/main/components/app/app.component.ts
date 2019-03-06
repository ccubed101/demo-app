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
	];



}
