import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TheRevenueProjectRootComponent } from './TheRevenueProjectRootComponent/TheRevenueProjectRoot.component';

const routes: Routes = [
	{
		path: '', children: [
			{
                path: 'TheRevenueProjectRoot', component: TheRevenueProjectRootComponent, children: [


				]
			},
		]
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule],
	declarations: [
	]
})
export class TheRevenueProjectRoutingModule { }

