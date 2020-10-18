import { Injectable } from '@angular/core';

import { BreezeDemoEntityManager } from './BreezeDemoEntityManager'

import { IRepository, Repository } from './Repository';
import { IStudentEnrollment } from './StudentEnrollment'

export interface IStudentEnrollmentRepository extends IRepository<IStudentEnrollment> {

}

//// Specifying providers can be done as shown below (as opposed to being done in the NgModule
//// declaration).  But this could cause problems.  In particular there was some conflict with
//// Ngrx.
//@Injectable({
//    providedIn: NgrxPlusBreezeModule
//})
@Injectable()
export class StudentEnrollmentRepository extends Repository<IStudentEnrollment> implements IStudentEnrollmentRepository {

    // Construction.

    constructor(
        entityManager: BreezeDemoEntityManager,
    ) {
        super(entityManager);
    }

    // Property Accessors

    get EntityTypeName(): string {
        return "StudentEnrollment";
    }

}
