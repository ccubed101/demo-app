import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedSampleService } from './SharedSampleService';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: []
})
export class SharedModule {

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
      ngModule: SharedModule,
      providers: [ /* List services here. */ SharedSampleService ]
    }
  }

}
