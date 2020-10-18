import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { BreezeBridgeHttpClientModule } from 'breeze-bridge2-angular';

import { BreezeDemoEntityManager } from './BreezeDemoEntityManager'

import { BreezeDemoRoutingModule } from './BreezeDemoRouting.module';
import { BreezeDemoRootComponent } from './BreezeDemoRootComponent/BreezeDemoRoot.component'

import { AddRemoveTeacherComponent } from './BreezeDemoRootComponent/AddRemoveTeacher/AddRemoveTeacher.component'
import { AddRemoveCourseComponent } from './BreezeDemoRootComponent/AddRemoveCourse/AddRemoveCourse.component'
import { AddRemoveStudentComponent } from './BreezeDemoRootComponent/AddRemoveStudent/AddRemoveStudent.component'
import { StudentEnrollmentsComponent } from './BreezeDemoRootComponent/StudentEnrollments/StudentEnrollments.component'
import { TeacherAssignmentsComponent } from './BreezeDemoRootComponent/TeacherAssignments/TeacherAssignments.component'

import { UnitOfWork } from './UnitOfWork'
import { TeacherRepository } from './TeacherRepository';
import { CourseRepository } from './CourseRepository';
import { StudentRepository } from './StudentRepository';
import { TeacherAssignmentRepository } from './TeacherAssignmentRepository';
import { StudentEnrollmentRepository } from './StudentEnrollmentRepository';

import { SchoolModel } from './School.model'

@NgModule({
	imports: [
		CommonModule,
        BreezeDemoRoutingModule,

        // Reactive forms
        ReactiveFormsModule,

        // BreezeJS
        BreezeBridgeHttpClientModule,

	],
	declarations: [
		BreezeDemoRootComponent,

        AddRemoveTeacherComponent,
        AddRemoveCourseComponent,
        AddRemoveStudentComponent,
        StudentEnrollmentsComponent,
        TeacherAssignmentsComponent

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

        BreezeDemoEntityManager,

        /*
            The code below is the original method that a Breeze EntityManager was made available via dependency
            injection.  The method could not be used because while there was no problem when compiling in
            development mode that was not the case when compiling in production mode using the AOT (Ahead of Time)
            compiler.  An error kept occurring where "index" could not be found in "breeze-client".  The problem
            was clearly related to the dependency injection process.  The problem was resolved by creating the
            BreezeDemoEntityManager and deriving it from the Breeze EntityManager class.
         
            // The Breeze server-side service is implemented using an independent WebApi app (i.e. a microservice).
            // So the specific "service name" must be supplied to the EntityManager constructor.  The service
            // name is just the specific URL to the controller that implements the service.
            {
                provide: EntityManager, useValue: entityManagerFactory()
            },
        */


        UnitOfWork,
        TeacherRepository,
        CourseRepository,
        StudentRepository,
        TeacherAssignmentRepository,
        StudentEnrollmentRepository,
        SchoolModel,
    ]
})
export class BreezeDemoModule {

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
static forRoot(): ModuleWithProviders<BreezeDemoModule> {
    // interface ModuleWithProviders {
    // 
    return {
        ngModule: BreezeDemoModule,
        providers: []
    };
}

}
