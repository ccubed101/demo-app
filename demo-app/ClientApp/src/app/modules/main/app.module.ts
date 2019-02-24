import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Next 2 lines added to support Angular Universal (server-side rendering).
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';    // Added for Angular Universal app.
import { isPlatformBrowser } from '@angular/common';            // Added for Angular Universal app.

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/app/nav-menu/nav-menu.component';
import { SplashComponent } from './components/app/splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SplashComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SplashComponent, pathMatch: 'full' },
    ]),
    // Add .withServerTransition() to support Universal rendering.  Note that 'app-root'
    // identifies the element in index.html where the Angular generated html is placed.
    BrowserModule.withServerTransition({ appId: 'app-root' }),
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
      'in the browser------------------------------------------------' : 'on the server-------------------------------------------------';
    console.log(`Running ${platform} with appId=${appId}`);
  }

}
