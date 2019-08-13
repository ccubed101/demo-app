import { NgModule, ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PreloadStrategy } from './preload-strategy';
import { AuthGuard } from './auth.guard';
import { SplashComponent } from './app/splash/splash.component';
import { AppComponent } from './app/app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { JwtDemoComponent } from './jwt-demo/jwt-demo.component';

const routes: Routes = [

	{ path: 'reactive-forms-demo', loadChildren: '../forms-demo/forms-demo.module#FormsDemoModule', data: { preload: false } },
	{ path: 'analytics', loadChildren: '../AnalyticsModule/analytics.module#AnalyticsModule', data: { preload: false } },
	{ path: 'RoutingExamples', loadChildren: '../RoutingExamples/RoutingExamples.module#RoutingExamplesModule', data: { preload: false } },
	{ path: 'Animations', loadChildren: '../AnimationsModule/Animations.module#AnimationsModule', data: { preload: false } },
	{ path: 'Videos', loadChildren: '../VideosModule/Videos.module#VideosModule', data: { preload: false } },
	{ path: 'Splash', component: SplashComponent },
	{ path: 'Login', component: LoginComponent },
	{ path: '', component: SplashComponent, pathMatch: 'full' },
	{
		path: '', canActivate: [AuthGuard], children: [
			{ path: 'JwtDemo', component: JwtDemoComponent },
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

