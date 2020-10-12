import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalRChatDemoRoutingModule } from './SignalRChatDemoRouting.module';
import { SignalRChatDemoRootComponent } from './SignalRChatDemoRoot/SignalRChatDemoRoot.component'


@NgModule({
	imports: [
		CommonModule,
        SignalRChatDemoRoutingModule,
	],
	declarations: [
		SignalRChatDemoRootComponent,
    ],
    providers: []
})
export class SignalRChatDemoModule {

    constructor() {

    }

    // This method is part of the mechanism that makes injectable services in this "SharedModule" available
    // to lazy loaded feature modules.  (If the lazy loaded feature modules imported this shared module then
    // any services created by the lazy loaded feature module would have their own instances--which would be a
    // problem if what you wanted was an application wide singleton service.
    // This method returns an object that is imported into the AppModule.  The object specifies the shared
    // services which are then added to the providers defined by the AppModule.
    // (The "forRoot" name is a convention adopted by a lot of Angular libraries, but of course you could name
    // that static method however you want.)
    // This method is part of the mechanism that makes injectable services in this "SharedModule" available
// to lazy loaded feature modules.  (If the lazy loaded feature modules imported this shared module then
// any services created by the lazy loaded feature module would have their own instances--which would be a
// problem if what you wanted was an application wide singleton service.
// This method returns an object that is imported into the AppModule.  The object specifies the shared
// services which are then added to the providers defined by the AppModule.
// (The "forRoot" name is a convention adopted by a lot of Angular libraries, but of course you could name
// that static method however you want.)
static forRoot(): ModuleWithProviders<SignalRChatDemoModule> {
    // interface ModuleWithProviders {
    // 
    return {
        ngModule: SignalRChatDemoModule,
        providers: []
    };
}

}
