import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SampleService } from './Sample.service';
import { SampleResolverService } from './resolvers/sample-resolver.service';

@NgModule({
    imports: [
        CommonModule
        , FormsModule
    ],
    providers: [
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
