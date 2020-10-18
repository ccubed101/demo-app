import { Injectable } from '@angular/core';

import { BreezeDemoEntityManager } from './BreezeDemoEntityManager'

import { IRepository, Repository } from './Repository';
import { ITeacherAssignment } from './TeacherAssignment'

export interface ITeacherAssignmentRepository extends IRepository<ITeacherAssignment> {

}

//// Specifying providers can be done as shown below (as opposed to being done in the NgModule
//// declaration).  But this could cause problems.  In particular there was some conflict with
//// Ngrx.
//@Injectable({
//    providedIn: NgrxPlusBreezeModule
//})
@Injectable()
export class TeacherAssignmentRepository extends Repository<ITeacherAssignment> implements ITeacherAssignmentRepository {

    // Construction.

    constructor(
        entityManager: BreezeDemoEntityManager,
    ) {
        super(entityManager);
    }

    // Property Accessors

    get EntityTypeName(): string {
        return "TeacherAssignment";
    }

}
