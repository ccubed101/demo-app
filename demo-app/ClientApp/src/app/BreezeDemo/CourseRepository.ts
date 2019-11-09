import { Injectable, Inject } from '@angular/core';

import { EntityManager } from 'breeze-client';

//import { NgrxPlusBreezeModule } from './NgrxPlusBreeze.module';

import { IRepository, Repository } from './Repository';
import { ICourse } from './Course'

export interface ICourseRepository extends IRepository<ICourse> {

}

//// Specifying providers can be done as shown below (as opposed to being done in the NgModule
//// declaration).  But this could cause problems.  In particular there was some conflict with
//// Ngrx.
//@Injectable({
//    providedIn: NgrxPlusBreezeModule
//})
export class CourseRepository extends Repository<ICourse> implements ICourseRepository {

    // Construction.

    constructor(
        entityManager: EntityManager,
    ) {
        super(entityManager);
    }


    // Property Accessors

    get EntityTypeName(): string {
        return "Course";
    }

}
