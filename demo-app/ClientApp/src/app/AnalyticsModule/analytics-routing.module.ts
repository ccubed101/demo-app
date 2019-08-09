import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { CommitHistoryComponent } from './components/commit-history/commit-history.component';

const routes: Routes = [
	{ path: '', 
		children: [
			{ path: 'commit-history', component: CommitHistoryComponent },
			{ path: '', component: CommitHistoryComponent },
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
export class AnalyticsRoutingModule { }
