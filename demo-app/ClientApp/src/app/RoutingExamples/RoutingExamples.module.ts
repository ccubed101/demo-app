import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingExamplesRoutingModule } from './RoutingExamplesRouting.module';
import { RoutingExamplesComponent } from './RoutingExamples.component';
import { RoutingExample1Component } from './RoutingExample1.component';
import { RoutingExample2Component } from './RoutingExample2.component';
import { RoutingExample3Component } from './RoutingExample3.component';
import { RoutingExample4Component } from './RoutingExample4.component';
import { RouteParamExamplesComponent } from './RouteParamExamples.component';
import { RouteParamExample1Component } from './RouteParamExample1.component';

@NgModule({
	imports: [
		CommonModule,
		RoutingExamplesRoutingModule,
	],
	declarations: [
		RoutingExamplesComponent,
		RoutingExample1Component,
		RoutingExample2Component,
		RoutingExample3Component,
		RoutingExample4Component,
		RouteParamExamplesComponent,
		RouteParamExample1Component,
	]
})
export class RoutingExamplesModule {

  // This method is part of the mechanism that makes injectable services in this "SharedModule" available
  // to lazy loaded feature modules.  (If the lazy loaded feature modules imported this shared module then
  // any services created by the lazy loaded feature module would their own instances--which would be a
  // problem is what you wanted was an application wide singleton service.
  // This method returns an object that is imported into the AppModule.  The object specifies the shared
  // services which then added to the providers defined by the AppModule.
  // (The "forRoot" name is a convention adopted by a lot of Angular libraries, but of course you could name
  // that static method however you want.)
  static forRoot() {

    // interface ModuleWithProviders {
    // 
    return {
      ngModule: RoutingExamplesModule,
      providers: [ /* List services here. */ ]
    }
  }

}
