import { Component } from '@angular/core';

@Component({
	selector: 'thick-frame-3d',
	template: `
		<div class="frame1">
			<div class="frame2">
				<div class="frame3">
					<div class="frame4">
						<div class="frame5">
							<div>
								<ng-content></ng-content>
							</div>
						<div>
					<div>
				<div>
			<div>
		</div>
	`,
	styles: [
		".frame1 { border-color: #dddddd; border-style: solid solid none none; border-width: 3px 3px 0px 0px; border-radius: 24px 23px 24px 0px; }",
		".frame2 { border-color: #333333; border-style: none none solid solid; border-width: 0px 0px 3px 3px; border-radius: 20px 0px 22px 20px;}",
		".frame3 { border-color: gray; border-style: solid solid solid solid; border-width: 10px 10px 10px 10px; border-radius: 18px 20px 20px 18px;}",
		".frame4 { border-color: #333333; border-style: solid solid none none; border-width: 3px 3px 0px 0px; border-radius: 9px 10px 10px 0px;}",
		".frame5 { border-color: #dddddd; border-style: none none solid solid; border-width: 0px 0px 3px 3px; border-radius: 10px 0px 10px 10px; }",
	],
})
export class ThickFrame3DComponent {


}
