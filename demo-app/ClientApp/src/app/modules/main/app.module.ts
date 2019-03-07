import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Next 2 lines added to support Angular Universal (server-side rendering).
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';    // Added for Angular Universal app.
import { isPlatformBrowser } from '@angular/common';            // Added for Angular Universal app.

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/app/nav-menu/nav-menu.component';
import { SplashComponent } from './components/app/splash/splash.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExpandingNavMenuComponent } from './components/app/expanding-nav-menu/expanding-nav-menu.component';
import { NavMenuItemComponent } from './components/app/expanding-nav-menu/nav-menu-item.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
		AppComponent,
		NavMenuComponent,
		SplashComponent,
		ExpandingNavMenuComponent,
		NavMenuItemComponent,
		PageNotFoundComponent,
  ],
  imports: [
		// Add .withServerTransition() to support Universal rendering.  Note that 'app-root'
		// identifies the element in index.html where the Angular generated html is placed.
		BrowserModule.withServerTransition({ appId: 'app-root' }),
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		CoreModule,                     // For application wide (global) services.  This will add providers from CoreModule to AppModule's providers.
		SharedModule.forRoot(),         // For stuff that is shared across multiple apps.  This will add providers from SharedModule to AppModule's providers. 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

	  // Next 7 lines added to support Angular Universal (server-side rendering).
	  constructor(
			@Inject(PLATFORM_ID) private platformId: Object,
			@Inject(APP_ID) private appId: string) {
			const platform = isPlatformBrowser(platformId) ?
			  'in the browser' : 'on the server';
			console.log(`Running ${platform} with appId=${appId}`);
	  }

}
