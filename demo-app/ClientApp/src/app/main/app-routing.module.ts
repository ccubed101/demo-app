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

	{ path: 'reactive-forms-demo', loadChildren: () => import('../forms-demo/forms-demo.module').then(m => m.FormsDemoModule), data: { preload: false } },
	{ path: 'analytics', loadChildren: () => import('../AnalyticsModule/analytics.module').then(m => m.AnalyticsModule), data: { preload: false } },
	{ path: 'RoutingExamples', loadChildren: () => import('../RoutingExamples/RoutingExamples.module').then(m => m.RoutingExamplesModule), data: { preload: false } },
	{ path: 'Animations', loadChildren: () => import('../AnimationsModule/Animations.module').then(m => m.AnimationsModule), data: { preload: false } },
    { path: 'Videos', loadChildren: () => import('../VideosModule/Videos.module').then(m => m.VideosModule), data: { preload: false } },
    { path: 'BreezeDemo', loadChildren: () => import('../BreezeDemo/BreezeDemo.module').then(m => m.BreezeDemoModule), data: { preload: false } },
    { path: 'NgrxDemo', loadChildren: () => import('../NgrxDemo/NgrxDemo.module').then(m => m.NgrxDemoModule), data: { preload: false } },
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

