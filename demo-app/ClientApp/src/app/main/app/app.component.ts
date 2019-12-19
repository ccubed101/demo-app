import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';

import { NavMenuItem } from '../app/expanding-nav-menu/NavMenuItem';

import { configuration } from '../configuration';
import { LayoutChangedEventService } from '../../shared/LayoutChangedEvent.service';

@Component({
    selector: 'app-root',
	template: `
		<expanding-nav-menu [navMenuTree]="navMenuTree"></expanding-nav-menu>
		<router-outlet></router-outlet>
    `,
  styles: [
  ]
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {

    // Construction.

    constructor(
        private layoutChangedEventService: LayoutChangedEventService,
    ) {
    }

    title = 'app';

    navMenuTree: NavMenuItem[] = configuration.navMenuTree;


    // Life cycle event handlers.

    // Handler for event that is called once immediately after the component is instantiated.
    ngOnInit() {
    }

    // Called after every check of the component's view. Applies to components only.  
    // Importantly, because this component is the root component for the application,
    // when this handler is called the DOM has been modified by Angular (if there
    // were any modifications to be made).
    ngAfterViewChecked() {
        this.layoutChangedEventService.LayoutChange();
    }

    ngOnDestroy() {
    }
}
