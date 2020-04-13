// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//// ngrx 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//import { mainReducer } from './ngrx/main.reducers';

// Next 2 lines added to support Angular Universal (server-side rendering).
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';    // Added for Angular Universal app.
import { isPlatformBrowser } from '@angular/common';            // Added for Angular Universal app.

// The application.
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app/app.component'
import { NavMenuComponent } from './app/nav-menu/nav-menu.component'
import { SplashComponent } from './app/splash/splash.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ExpandingNavMenuComponent } from './app/expanding-nav-menu/expanding-nav-menu.component'
import { NavMenuItemComponent } from './app/expanding-nav-menu/nav-menu-item.component'
import { CoreModule } from '../core/core.module'
import { SharedModule } from '../shared/shared.module'
import { LoginComponent } from './login/login.component'
import { JwtDemoComponent } from './jwt-demo/jwt-demo.component'


@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		SplashComponent,
		ExpandingNavMenuComponent,
		NavMenuItemComponent,
		PageNotFoundComponent,
		LoginComponent,
        JwtDemoComponent,
	],
	imports: [
		// Add .withServerTransition() to support Universal rendering.  Note that 'app-root'
		// identifies the element in index.html where the Angular generated html is placed.
		BrowserModule.withServerTransition({ appId: 'app-root' }),
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		CoreModule,                     // For application wide (global) services.  This will add providers from CoreModule to AppModule's providers.
		SharedModule.forRoot(),         // For stuff that is shared across multiple apps.  This will add providers from SharedModule to AppModule's providers. 
        AppRoutingModule,				// Should always be last in the list (so that routing works correctly).

        //// For ngrx.  This makes the store available for injection everywhere in the app.
        //// Internet says that even if you have no reducer at this (the root) level you still
        //// have to import StoreModule.forRoot({}).
        //StoreModule.forRoot({
        //    main: mainReducer,
        //}),
        StoreModule.forRoot({
        }),
        //// For ngrx effects.  Note that even if you do not need to register any effects at the
        //// "root" level you still must have the following (with an empty array) because is sets
        //// up the providers required for effects.
        //// Internet says that even if you have no effects at this (the root) level you still
        //// have to import EffectsModule.forRoot([]).        \
        EffectsModule.forRoot([
        ]),
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
