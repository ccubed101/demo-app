import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { NavMenuItemComponent } from './nav-menu-item.component';
import { NavMenuItem } from './NavMenuItem';

import * as $ from 'jquery'		// Needed in order to use jQuery in this component.
								// "declare var $: any;" will also work...but you will not have intellisense functionality
								// Note that for intellisense to work for jQuery you have to "npm install @types/jquery --save-dev".

@Component({
	selector: 'expanding-nav-menu',
	template: `
		<div id="nav-menu" >
			<div id="nav-menu-text">Nav Menu</div>
			<div id="expandedContent">
				<nav-menu-items [navMenuItems]="navMenuTree" ></nav-menu-items>
			</div>
		</div>
    `,
	styles: [
		"#nav-menu {							\
			width: 6em;							\
			height: 3em;						\
			color: black;						\
			background-color: cyan;				\
			opacity: 0.25;						\
			margin: 0.5em;						\
			padding: 0.5em;						\
			border: 2px solid cyan;				\
			position: fixed;					\
			top: 0;								\
			left: 0;							\
			transition:							\
				width .3s,						\
				height .3s,						\
				color .3s,						\
				background-color .3s,			\
				border .3s;						\
				opacity .3s;					\
			-webkit-transition:					\
				width .3s,						\
				height .3s,						\
				color .3s,						\
				background-color .2s,			\
				border .3s;						\
				opacity .3s;					\
		}",
		"#expandedContent {						\
			display: none;						\
			color: black;						\
			white-space: nowrap;				\
			overflow: hidden;					\
		}",
		//"#nav-menu:hover {					\
		//	width: 30em;						\
		//	height: 30em;						\
		//	color: transparent;					\
		//	background-color: white;			\
		//	opacity: 1.0;						\
		//	border: 2px solid black;			\
		//	position: fixed;					\
		//	top: 0;								\
		//	left: 0								\
		//}",
	]
})
export class ExpandingNavMenuComponent implements OnInit, OnDestroy {

	// Construction.
	constructor() {
	}


	// Params from parent.
	@Input() navMenuTree: NavMenuItem[] = [];


	// Life-cycle

	ngOnInit() {

		let navMenu = $("#nav-menu");
		let expandedContent = $("#expandedContent");

		// Record the width of the nav-menu element after it is rendered for the 1st time.
		// It will be used to determine whether the element is expanded or collapsed.
		this.collapsedWidth = navMenu.width();

		// Setup event that fires when mouse hovers over nav-menu.  This is effectively the
		// beginning of the transition.  Do appropriate stuff here.
		navMenu.hover(() => {


			// Initiate transitions by changing the properties that are set to transition.
			// Going from collapsed to expanded.
			if (this.collapsed()) {
				navMenu.css("width",
					expandedContent.outerWidth() +
					parseInt(navMenu.css("padding-left"), 10) +
					parseInt(navMenu.css("padding-right"), 10) +
					parseInt(navMenu.css("border-width"), 10)
				);
				navMenu.css("height",
					expandedContent.outerHeight() +
					parseInt(navMenu.css("padding-top"), 10) +
					parseInt(navMenu.css("padding-bottom"), 10) +
					parseInt(navMenu.css("border-width"), 10)
				);
				navMenu.css("color", "transparent");
				navMenu.css("background-color", "white");
				navMenu.css("border", "2px solid black");
				navMenu.css("opacity", "1.0");
			}
			// Going from expanded to collapsed.
			else {
				navMenu.css("width", "6em");
				navMenu.css("height", "3em");
				navMenu.css("color", "black");
				navMenu.css("background-color", "cyan");
				navMenu.css("border", "2px solid cyan");
				navMenu.css("opacity", "0.25");
			}

			if (!(this.collapsed()))
				expandedContent.css("display", "none");
		})

		// Setup event that fires once transitions are complete.
		document.getElementById("nav-menu").addEventListener("transitionend", this.transitionEnd.bind(this));
		document.getElementById("nav-menu").addEventListener("webkitTransitionEnd", this.transitionEnd.bind(this));		// For Safari
	}

	ngOnDestroy() {
	}


	// Instance variables

	// Keep a record of the width of the menu when it is collapsed.
	// We use it to know when the menu is collapsed and when it is expanded.
	collapsedWidth: number;


	// Event handler that is called whenever a transition is completed.
	transitionEnd(e) {

		if (e.propertyName == "width") {

			let navMenuText: any = $("#nav-menu-text");
			if (this.collapsed())
				navMenuText.css("display", "block");
			else
				navMenuText.css("display", "none");

			let expandedContent: any = $("#expandedContent");
			if (!(this.collapsed())){
				expandedContent.css("display", "block");
				expandedContent.css("color", "black");
			}
		}
	}

	// Indicates whether the menu is expanded or collapsed.
	collapsed(): boolean {
		return ($("#nav-menu").width() === this.collapsedWidth);
	}

}
