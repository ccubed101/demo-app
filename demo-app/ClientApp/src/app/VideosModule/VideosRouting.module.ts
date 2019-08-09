import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleVideoComponent } from './SingleVideoComponent/SingleVideo.component';

const routes: Routes = [
	{
		path: '', children: [
			{ path: 'SingleVideo', component: SingleVideoComponent },
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
export class VideosRoutingModule { }

