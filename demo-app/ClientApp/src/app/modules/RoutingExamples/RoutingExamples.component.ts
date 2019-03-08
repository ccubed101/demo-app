import { Component } from '@angular/core';

@Component({
	selector: 'RoutingExamples',
	template: `
		<div style="margin-left: 10em; margin-right: 10em">
			<div class="anchorContainer">
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { second: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;second :['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { third: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;third :['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { fourth: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;fourth :['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample2'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample2'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { second: ['RoutingExample2'] }}]">[routerLink]=[&#123; outlets: &#123;second :['RoutingExample2'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { third: ['RoutingExample2'] }}]">[routerLink]=[&#123; outlets: &#123;third :['RoutingExample2'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { fourth: ['RoutingExample2'] }}]">[routerLink]=[&#123; outlets: &#123;fourth :['RoutingExample2'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample3'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample3'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { second: ['RoutingExample3'] }}]">[routerLink]=[&#123; outlets: &#123;second :['RoutingExample3'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { third: ['RoutingExample3'] }}]">[routerLink]=[&#123; outlets: &#123;third :['RoutingExample3'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { fourth: ['RoutingExample3'] }}]">[routerLink]=[&#123; outlets: &#123;fourth :['RoutingExample3'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample4'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample4'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { second: ['RoutingExample4'] }}]">[routerLink]=[&#123; outlets: &#123;second :['RoutingExample4'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { third: ['RoutingExample4'] }}]">[routerLink]=[&#123; outlets: &#123;third :['RoutingExample4'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { fourth: ['RoutingExample4'] }}]">[routerLink]=[&#123; outlets: &#123;fourth :['RoutingExample4'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="[{ outlets: { primary: ['RoutingExample4'], second: ['RoutingExample3'], third: ['RoutingExample2'], fourth: ['RoutingExample1'] }}]">[routerLink]=[&#123; outlets: &#123;primary :['RoutingExample4'], second: ['RoutingExample3'], third: ['RoutingExample2'], fourth: ['RoutingExample1'] &#125;&#125;]</a>
				</div>
				<div class="anchorItem">
					<a [routerLink]="['none']">[routerLink]=['none']</a>
				</div>
			</div>
		</div>
		<div class="flexContainer">
			<div class="flexItem routerOutletContainer">
				<div>primary router-outlet</div>
				<router-outlet></router-outlet>
			</div>
			<div class="flexItem routerOutletContainer">
				<div>second router-outlet</div>
				<router-outlet name="second"></router-outlet>
			</div>
			<div class="flexItem routerOutletContainer">
				<div>third router-outlet</div>
				<router-outlet name="third"></router-outlet>
			</div>
			<div class="flexItem routerOutletContainer">
				<div>fourth router-outlet</div>
				<router-outlet name="fourth"></router-outlet>
			</div>
		</div>
	`,
	styles: [
		".centerText { text-align: center }",
		".routerOutletContainer { border: 1px solid black; height: 200px; }",
		".anchorContainer { display: flex; flex-wrap: wrap; justify-content: center; }",
		".anchorItem { display: flex; border: 1px solid black; padding: 1em; margin: 1em; }",
		".flexContainer { display: flex; flex-wrap: wrap; border: 1px solid black }",								// Can't use '.container' because it is in use elsewhere.
		".flexItem { width: 50% }",
	]
})
export class RoutingExamplesComponent {
}

/* Programmer Notes:
 *
 * >> In the above statement RoutingExample1 will be interpreted as a property of the RoutingExamplesComponent class.
 *    <a [routerLink]="RoutingExample1">Link #1</a>
 *    Intead use
 *    <a [routerLink]="['RoutingExample1']">Link #1</a>
 *
 *
 */


		//<div class="centerText">
		//	Routing Examples
		//</div>
		//<div class="centerText">
		//	<a [routerLink]="[{ outlets: { first: ['RoutingExample1'] } } ]">Link #1</a>
		//</div>
		//<div class="centerText">
		//	<a [routerLink]="['/RoutingExamples/RoutingExample2']">Link #2</a>
		//</div>
		//<div class="centerText">
		//	<a [routerLink]="[{ outlets: { third: ['RoutingExample3'] } } ]">Link #3</a>
		//</div>
		//<div class="centerText">
		//	<a [routerLink]="[{ outlets: { fourth: ['\RoutingExample4'] } } ]">Link #4</a>
		//</div>
		//			<router-outlet name="first"></router-outlet>
		//			<router-outlet name="second"></router-outlet>
		//			<router-outlet name="third"></router-outlet>
		//			<router-outlet name="fourth"></router-outlet>
		//<table>
		//	<tr>
		//		<th>
		//		</th>
		//		<th>
		//		</th>
		//	</tr>
		//	<tr>
		//		<td>
		//		</td>
		//		<td>
		//		</td>
		//	</tr>
		//	<tr>
		//		<td>
		//		</td>
		//		<td>
		//		</td>
		//	</tr>
		//</table>

