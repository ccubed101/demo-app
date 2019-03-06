import { Component, Input } from '@angular/core';

import { NavMenuItem } from './NavMenuItem';

@Component({
	selector: 'nav-menu-items',
	template: `
		<div>
			<ul>
				<li *ngFor="let item of navMenuItems">
					<a [routerLink]="item.Route" *ngIf="item.Route">
						{{item.text}}
					</a>
					<span *ngIf="!(item.Route)" class="noselect">{{item.text}}</span>
					<nav-menu-items [navMenuItems]="item.Children" *ngIf="item.Children"></nav-menu-items>
				</li>
			</ul>
		</div>
	`,
	styles: [
		"ul {									\
			display: block;						\
			list-style-type: none;				\
			margin-top: 0em;					\
			margin-bottom: 0.2em;				\
			margin left: 0;						\
			margin-right: 0;					\
			padding-left: 0.5em;				\
			padding-right: 0.5em;				\
		}",
		"li {									\
			display: list-item;					\
		}",
		".noselect {																\
			-webkit-touch-callout: none;	/* iOS Safari */						\
			-webkit-user-select: none;		/* Safari */							\
			-khtml-user-select: none;		/* Konqueror HTML */					\
			-moz-user-select: none;			/* Firefox */							\
			-ms-user-select: none;			/* Internet Explorer/Edge */			\
			user - select: none;			/* Non-prefixed version, currently		\
												supported by Chrome and Opera */	\
		}",
	],
})
export class NavMenuItemComponent {

	@Input() navMenuItems: NavMenuItem[];

}
