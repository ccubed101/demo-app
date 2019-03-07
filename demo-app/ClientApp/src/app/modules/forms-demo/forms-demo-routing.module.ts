import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ReactiveFormsExample1Component } from './components/reactive-forms-example1/reactive-forms-example1.component'
import { ReactiveFormsExample2Component } from './components/reactive-forms-example2/reactive-forms-example2.component';
import { ReactiveFormsExample3Component } from './components/reactive-forms-example3/reactive-forms-example3.component';

const routes: Routes = [
	{ path: '', 
		children: [
			{ path: 'reactive-forms-example1', component: ReactiveFormsExample1Component },
			{ path: 'reactive-forms-example2', component: ReactiveFormsExample2Component },
			{ path: 'reactive-forms-example3', component: ReactiveFormsExample3Component },
			{ path: '', component: ReactiveFormsExample3Component },
		]
	},
	//{ path: '', component: ReactiveFormsExample3Component },
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		ReactiveFormsModule,
	],
	exports: [RouterModule],
	declarations: [
	]
})
export class FormsDemoRoutingModule { }
