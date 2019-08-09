import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimationsRootComponent } from './AnimationsRootComponent/AnimationsRoot.component';
import { RotationComponent } from './AnimationsRootComponent/RotationComponent/Rotation.component';
import { RotatorWrapperComponent } from './AnimationsRootComponent/RotatorWrapperComponent/RotatorWrapper.component';
import { AnimatedListComponent } from './AnimatedListComponent/AnimatedList.component';
import { RouteTransitionPage1Component } from './AnimationsRootComponent/RouteTransitionPage1Component/RouteTransitionPage1.component';
import { RouteTransitionPage2Component } from './AnimationsRootComponent/RouteTransitionPage2Component/RouteTransitionPage2.component';

const routes: Routes = [
	{
		path: '', children: [
			{
				path: 'AnimationsRoot', component: AnimationsRootComponent, children: [
					{ path: 'RouteTransitionPage1', component: RouteTransitionPage1Component, data: { animation: 'Page1' } },
					{ path: 'RouteTransitionPage2', component: RouteTransitionPage2Component, data: { animation: 'Page2' } },
				]
			},
			{ path: 'Rotation', component: RotationComponent },
			{ path: 'RotatorWrapper', component: RotatorWrapperComponent },
			{ path: 'AnimatedList', component: AnimatedListComponent },
		]
	},
	//{
	//	path: 'AnimationsRoot', component: AnimationsRootComponent,	children: [
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
export class AnimationsRoutingModule { }
