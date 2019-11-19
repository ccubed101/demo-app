import { Component } from '@angular/core';
import { ActivatedRoute, RouterState, RouterOutlet } from '@angular/router';

@Component({
    selector: 'the-revenue-project',
	template: `
		<div class="title">
			The Revenue Project
        </div>
    `,
	styles: [
		".title { text-align: center; font-size: xx-large; margin-top: 0.5em }",
	],
})
export class TheRevenueProjectRootComponent {

    // Construction.

    constructor(
    ) {
    }
}


