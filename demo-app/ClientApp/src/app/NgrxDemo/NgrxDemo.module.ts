import { NgModule, InjectionToken } from '@angular/core'
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'

import { NgrxDemoRootComponent } from './NgrxDemoRootComponent/NgrxDemoRoot.component'
import { NgrxDemoRoutingModule } from './NgrxDemoRouting.module'

// ngrx 
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ngrxDemoReducer, loadReducer, reducers, metaReducers } from './ngrx/NgrxDemo.reducers';
import { NgrxDemoEffects } from './ngrx/NgrxDemo.effects'

import { NgrxDemoDataService } from './NgrxDemoRootComponent/NgrxDemoData.service'

import { AddRemoveTeacherComponent } from './NgrxDemoRootComponent/AddRemoveTeacher/AddRemoveTeacher.component';
import { AddRemoveCourseComponent } from './NgrxDemoRootComponent/AddRemoveCourse/AddRemoveCourse.component';
import { AddRemoveStudentComponent } from './NgrxDemoRootComponent/AddRemoveStudent/AddRemoveStudent.component';
import { StudentEnrollmentsComponent } from './NgrxDemoRootComponent/StudentEnrollments/StudentEnrollments.component';
import { TeacherAssignmentsComponent } from './NgrxDemoRootComponent/TeacherAssignments/TeacherAssignments.component';
//import { mainReducer } from './ngrx/main.reducers';
//import { featureReducer } from './FeatureState.reducer'
//import { FavoriteMoviesEffects } from './FavoriteMovies.effects'

//import { configuration } from './Configuration'

@NgModule({
	imports: [
		CommonModule,
        NgrxDemoRoutingModule,

        // Reactive forms
        ReactiveFormsModule,

        // Ngrx
        // Ngrx documentation says that if you use the following in a feature module like this one,
        //   StoreModule.forFeature('featureName', featureReducer),
        //   EffectsModule.forFeature([featureEffects]),
        // with the objective of isolating the state for this module in this module...then you
        // should add the following to the application's root module (i.e. app.module.ts),
        //   StoreModule.forRoot({}),
        //   EffectsModule.forRoot([]),
        // Doing this results in the feather state being added to the application state.  So
        // Ngrx can be used throughout the entire application but the feature state can be more
        // easily isolated to the module that implements the feature.
        // But it turns out that if nothing is added to the application's root module and you add
        // the following to this module,
        //   StoreModule.forRoot({ NgrxDemo: ngrxDemoReducer }),
        //   EffectsModule.forRoot([NgrxDemoEffects]),
        // everything will still work.  With the additional advantage that the feature state is even
        // more isolated.
        // It is possible to have the following in the application's root module 
        //   StoreModule.forRoot({ propertyName1: aReducer }),
        // as well as the following in the feature module,  
        //   StoreModule.forRoot({ propertyName2: anotherReducer }),
        // which results in 2 store instances.  But that can get complicated because it is problematic
        // to figure out what effects are connected to which stores.

        // Use the following if this module's feature state should be added to the application's state
        // that is added in app.module.ts.
        //StoreModule.forFeature('NgrxDemo', ngrxDemoReducer),
        //EffectsModule.forFeature([NgrxDemoEffects]),

        // Use the following if you want an Ngrx store instance to be available only in this feature
        // module and nowhere else.  In this case StoreModule and EffectsModule need not be imported
        // in app.module.ts.
        StoreModule.forRoot({ NgrxDemo: ngrxDemoReducer }),
        //StoreModule.forRoot(reducers, { metaReducers }),              // Will compile in development mode, but not in production build (which uses --aot flag).
        EffectsModule.forRoot([NgrxDemoEffects]),

        // During development there were times when that app worked when served by the Angular development
        // server but did not work when run in Docker.  In those cases the Chrome console indicated the
        // lack of a provider for a particular injection.  It was not possible to determine what injected
        // object lacked a provider because code optimizations completely obscured the names of objects.
        // Only by setting configurations\production\optimization to 'false' (in angular.json) could the
        // name of the object be seen.  In one case the object was the ReducerManager.
 	],
	declarations: [
		NgrxDemoRootComponent,
		AddRemoveTeacherComponent,
		AddRemoveCourseComponent,
		AddRemoveStudentComponent,
		StudentEnrollmentsComponent,
		TeacherAssignmentsComponent,
    ],
    providers: [

        /* Notes on Providers
         * ------------------
         * >> The typical provider configuration is as follows:
         *      <Logger>
         *    which is actually expanded to an object literal with the "provide" property being the token
         *    that serves as the key for both locating a dependency value and configuring the injector, and
         *    the second property being a provider definition object, which tells the injector how to create
         *    the dependency value.
         *      { provide: Logger, useClass: Logger}
         * >> Different classes can provide the same service.
         *      { provide: Logger, useClass: BetterLogger}
         * >> Use the following if you want to inject a string, function or object.
         *      { provider: TEST_DEP_OBJ, useValue: { name: 'Test Name' }
         */

        NgrxDemoDataService

    ]
})
export class NgrxDemoModule {

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
            ngModule: NgrxDemoModule,
            providers: [

            ]
        }
    }

}
