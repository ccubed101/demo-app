import { Injectable } from '@angular/core';

import { BreezeDemoModule } from './BreezeDemo.module';

import { IRepository, Repository } from './Repository';
import { IEnrollment } from './Enrollment'

export interface IEnrollmentRepository extends IRepository<IEnrollment>{

}

//// Specifying providers can be done as shown below (as opposed to being done in the NgModule
//// declaration).  But this could cause problems.  In particular there was some conflict with
//// Ngrx.
//@Injectable({
//    providedIn: NgrxPlusBreezeModule
//})
export class EnrollmentRepository extends Repository<IEnrollment> implements IEnrollmentRepository {

    // Property Accessors

    get EntityTypeName(): string {
        return "Enrollment";
    }

}
