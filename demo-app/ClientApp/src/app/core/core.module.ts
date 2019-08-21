import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { LoginService } from './login.service';
import { SampleService } from './Sample.service';
import { SampleResolverService } from './resolvers/sample-resolver.service';
import { LoginCallbacksService } from './login.callbacks.service';

@NgModule({
    imports: [
        CommonModule
        , FormsModule
    ],
	providers: [

		// The following allows us to inject an instance of AuthenticationService as an interface.  This
		// opens up the possibility of injecting an interface into a class that references an instance
		// of any class that implements the interface.  Here is what appears in the class constructor:
		//   @Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
		AuthenticationService,
		{ provide: 'IAuthenticationService', useExisting: AuthenticationService },

		LoginCallbacksService,
		LoginService,
        SampleService
        , SampleResolverService
    ],
    declarations: []
})
export class CoreModule {

  // Construction
    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error("A CoreModule has already been instantiated.  CoreModule should only be imported into AppModule and nowhere else.");
        }
    }

}
