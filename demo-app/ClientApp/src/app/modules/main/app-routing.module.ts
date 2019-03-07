import { NgModule, ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PreloadStrategy } from './preload-strategy';
import { SplashComponent } from './components/app/splash/splash.component';
import { AppComponent } from './components/app/app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [

	{ path: '', component: SplashComponent, pathMatch: 'full' },
	{ path: 'reactive-forms-demo', loadChildren: '../forms-demo/forms-demo.module#FormsDemoModule', data: { preload: false } },
	{ path: 'analytics', loadChildren: '../analytics/analytics.module#AnalyticsModule', data: { preload: false } },
	{ path: '**', component: PageNotFoundComponent }

    // ?
    //{ path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadStrategy/*, enableTracing: true*/ })],
  exports: [RouterModule],
  providers: [ PreloadStrategy ]
})
export class AppRoutingModule { }

