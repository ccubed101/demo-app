import { Component } from '@angular/core';

@Component({
	selector: 'page-not-found',
	template: `
        <div id="titleText">
         * Page Not Found *
        </div>
	`,
	styles: [
		"#titleText { color: red; font-family: Comic Sans MS; font-size: 144px; font-weight: 900; text-align: center; margin-top: 10% }",
	]
})
export class PageNotFoundComponent {
}
