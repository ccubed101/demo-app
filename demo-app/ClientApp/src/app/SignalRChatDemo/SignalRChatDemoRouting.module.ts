import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalRChatDemoRootComponent } from './SignalRChatDemoRoot/SignalRChatDemoRoot.component';

const routes: Routes = [
	{
		path: '', children: [
			{
                path: 'SignalRChatDemoRoot', component: SignalRChatDemoRootComponent, children: [


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
export class SignalRChatDemoRoutingModule { }
