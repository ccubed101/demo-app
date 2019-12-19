import { NgModule, InjectionToken } from '@angular/core'
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'

import { TheRevenueProjectRootComponent } from './TheRevenueProjectRootComponent/TheRevenueProjectRoot.component'
import { TheRevenueProjectRoutingModule } from './TheRevenueProjectRouting.module'
import { Layout1Component } from './TheRevenueProjectRootComponent/Layout1Component/Layout1.component'
import { Layout2Component } from './TheRevenueProjectRootComponent/Layout2Component/Layout2.component'


@NgModule({
	imports: [
		CommonModule,
        TheRevenueProjectRoutingModule,
	],
	declarations: [
		TheRevenueProjectRootComponent,
		Layout1Component,
		Layout2Component,
    ],
    providers: [
    ]
})
export class TheRevenueProjectModule {

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
    static forRoot() {

        // interface ModuleWithProviders {
        // 
        return {
            ngModule: TheRevenueProjectModule,
            providers: [

            ]
        }
    }

}
