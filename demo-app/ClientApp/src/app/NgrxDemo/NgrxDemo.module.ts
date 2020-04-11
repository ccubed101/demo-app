import { NgModule, InjectionToken } from '@angular/core'
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'

import { NgrxDemoRootComponent } from './NgrxDemoRootComponent/NgrxDemoRoot.component'
import { NgrxDemoRoutingModule } from './NgrxDemoRouting.module'


// ngrx 
import { StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';
import { ngrxDemoReducer } from './ngrx/NgrxDemo.reducers';
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


        //// For ngrx.  This makes the store available for injection everywhere in the app.
        //StoreModule.forRoot({
        //    main: mainReducer,
        //}),
        //// For ngrx effects.  Note that even if you do not need to register any effects at the
        //// "root" level you still must have the following (with an empty array) because is sets
        //// up the providers required for effects.
        //EffectsModule.forRoot([
        //]),
        StoreModule.forFeature('NgrxDemo', ngrxDemoReducer),
        //EffectsModule.forFeature([FavoriteMoviesEffects]),
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
