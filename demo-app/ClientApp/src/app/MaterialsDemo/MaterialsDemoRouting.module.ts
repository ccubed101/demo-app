import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialsDemoRootComponent } from './MaterialsDemoRoot/MaterialsDemoRoot.component';

const routes: Routes = [
	{
		path: '', children: [
            { path: 'MaterialsDemo', component: MaterialsDemoRootComponent },
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
export class MaterialsDemoRoutingModule { }

