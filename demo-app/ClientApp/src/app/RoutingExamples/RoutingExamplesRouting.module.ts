import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutingExamplesComponent } from './RoutingExamples.component';
import { RoutingExample1Component } from './RoutingExample1.component';
import { RoutingExample2Component } from './RoutingExample2.component';
import { RoutingExample3Component } from './RoutingExample3.component';
import { RoutingExample4Component } from './RoutingExample4.component';
import { RouteParamExamplesComponent } from './RouteParamExamples.component';
import { RouteParamExample1Component } from './RouteParamExample1.component';

const routes: Routes = [
	{
		// Normally the line that is commented out below (which includes an empty path)
		// would be the first item in the 'Routes' array.  However there is a known bug
		// with named router outlets when such an empty path is used.  The bug causes
		// the router to look for the named router outlet in the parent module rather
		// than in this module.  You can see this is you have a named router outlet in
		// the main module that has the same name as a router outlet in this module.
		// The fix for the bug is to not use empty paths.  So what has been done here
		// is to use the non-empty path 'shim' and then add an additional path with an
		// empty path that redirect to 'shim'.
		// See https://stackoverflow.com/questions/47482230/angular-4-lazy-loading-with-named-router-outlet-not-working/47487220#47487220
		//path: 'shim', component: RoutingExamplesComponent, children: [
		path: 'shim', component: RoutingExamplesComponent, children: [
			{ path: 'RoutingExample1', component: RoutingExample1Component, outlet: 'primary' },
			{ path: 'RoutingExample1', component: RoutingExample1Component, outlet: 'second' },
			{ path: 'RoutingExample1', component: RoutingExample1Component, outlet: 'third' },
			{ path: 'RoutingExample1', component: RoutingExample1Component, outlet: 'fourth' },
			{ path: 'RoutingExample2', component: RoutingExample2Component, outlet: 'primary' },
			{ path: 'RoutingExample2', component: RoutingExample2Component, outlet: 'second' },
			{ path: 'RoutingExample2', component: RoutingExample2Component, outlet: 'third' },
			{ path: 'RoutingExample2', component: RoutingExample2Component, outlet: 'fourth' },
			{ path: 'RoutingExample3', component: RoutingExample3Component, outlet: 'primary' },
			{ path: 'RoutingExample3', component: RoutingExample3Component, outlet: 'second' },
			{ path: 'RoutingExample3', component: RoutingExample3Component, outlet: 'third' },
			{ path: 'RoutingExample3', component: RoutingExample3Component, outlet: 'fourth' },
			{ path: 'RoutingExample4', component: RoutingExample4Component, outlet: 'primary' },
			{ path: 'RoutingExample4', component: RoutingExample4Component, outlet: 'second' },
			{ path: 'RoutingExample4', component: RoutingExample4Component, outlet: 'third' },
			{ path: 'RoutingExample4', component: RoutingExample4Component, outlet: 'fourth' },
			{ path: '', component: RoutingExample1Component, outlet: 'second' },					// Applies when first entering page.
		]
	},
	{
		path: 'RouteParameterExamples', component: RouteParamExamplesComponent, children: [
			{ path: 'RouteParameterExample1/:id1/:id2/:id3', component: RouteParamExample1Component },
		]},
	{ path: '', redirectTo: 'shim' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule],
	declarations: [
	]
})
export class RoutingExamplesRoutingModule { }
