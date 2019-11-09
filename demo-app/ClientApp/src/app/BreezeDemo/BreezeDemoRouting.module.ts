import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreezeDemoRootComponent } from './BreezeDemoRootComponent/BreezeDemoRoot.component';

const routes: Routes = [
	{
		path: '', children: [
			{
                path: 'BreezeDemoRoot', component: BreezeDemoRootComponent, children: [


				]
			},
		]
	},
	//{
	//	path: 'BreezeDemoRoot', component: BreezeDemoRootComponent,	children: [
	//		{ path: 'Rotation', component: RotationComponent },
	//		{ path: 'RotatorWrapper', component: RotatorWrapperComponent },
	//		{ path: '', redirectTo: 'AnimationsRoot' },
	//	]
	//},
	//{ path: '', redirectTo: 'AnimationsRoot' },
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule],
	declarations: [
	]
})
export class BreezeDemoRoutingModule { }
