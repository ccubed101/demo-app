import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationsRoutingModule } from './AnimationsRouting.module';
import { AnimationsRootComponent } from './AnimationsRootComponent/AnimationsRoot.component';
import { RotationComponent } from './AnimationsRootComponent/RotationComponent/Rotation.component';
import { RotatorWrapperComponent } from './AnimationsRootComponent/RotatorWrapperComponent/RotatorWrapper.component';
import { RotatorComponent } from './AnimationsRootComponent/RotatorComponent/Rotator.component';
import { ThickFrame3DComponent } from './AnimationsRootComponent/ThickFrame3DComponent/ThickFrame3D.component';
import { AnimatedListComponent } from './AnimatedListComponent/AnimatedList.component';
import { RouteTransitionPage1Component } from './AnimationsRootComponent/RouteTransitionPage1Component/RouteTransitionPage1.component';
import { RouteTransitionPage2Component } from './AnimationsRootComponent/RouteTransitionPage2Component/RouteTransitionPage2.component';

@NgModule({
	imports: [
		CommonModule,
		AnimationsRoutingModule,
	],
	declarations: [
		AnimationsRootComponent,
		RotationComponent,
		RotatorComponent,
		RotatorWrapperComponent,
		ThickFrame3DComponent,
		AnimatedListComponent,
		RouteTransitionPage1Component,
		RouteTransitionPage2Component,
	]
})
export class AnimationsModule {

  // This method is part of the mechanism that makes injectable services in this "SharedModule" available
  // to lazy loaded feature modules.  (If the lazy loaded feature modules imported this shared module then
  // any services created by the lazy loaded feature module would have their own instances--which would be a
  // problem if what you wanted was an application wide singleton service.
  // This method returns an object that is imported into the AppModule.  The object specifies the shared
  // services which are then added to the providers defined by the AppModule.
  // (The "forRoot" name is a convention adopted by a lot of Angular libraries, but of course you could name
  // that static method however you want.)
  static forRoot() {

    // interface ModuleWithProviders {
    // 
    return {
      ngModule: AnimationsModule,
      providers: [ /* List services here. */ ]
    }
  }

}
