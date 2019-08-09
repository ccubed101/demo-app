import { NgModule, ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PreloadStrategy } from './preload-strategy';
import { AuthGuard } from './auth.guard';
import { SplashComponent } from './components/app/splash/splash.component';
import { AppComponent } from './components/app/app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

	{ path: 'Splash', component: SplashComponent },
	{ path: 'Login', component: LoginComponent },
	{ path: '', component: SplashComponent, pathMatch: 'full' },
	{
		path: '', canActivate: [AuthGuard], children: [
			{ path: 'reactive-forms-demo', loadChildren: '../forms-demo/forms-demo.module#FormsDemoModule', data: { preload: false } },
			{ path: 'analytics', loadChildren: '../AnalyticsModule/analytics.module#AnalyticsModule', data: { preload: false } },
			{ path: 'RoutingExamples', loadChildren: '../RoutingExamples/RoutingExamples.module#RoutingExamplesModule', data: { preload: false } },
			{ path: 'Animations', loadChildren: '../AnimationsModule/Animations.module#AnimationsModule', data: { preload: false } },
			{ path: 'Videos', loadChildren: '../VideosModule/Videos.module#VideosModule', data: { preload: false } },
		]
	},
	{ path: '**', component: PageNotFoundComponent }

    // ?
    //{ path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadStrategy/*, enableTracing: true*/ })],	// 'enableTracing: true' sends router events to console.
  exports: [RouterModule],
  providers: [ PreloadStrategy ]
})
export class AppRoutingModule { }

