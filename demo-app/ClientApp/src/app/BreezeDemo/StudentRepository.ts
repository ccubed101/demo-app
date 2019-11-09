import { Injectable } from '@angular/core';

import { EntityManager } from 'breeze-client';

//import { NgrxPlusBreezeModule } from './NgrxPlusBreeze.module';

import { IRepository, Repository } from './Repository';
import { IStudent } from './Student'

export interface IStudentRepository extends IRepository<IStudent> {

}

//// Specifying providers can be done as shown below (as opposed to being done in the NgModule
//// declaration).  But this could cause problems.  In particular there was some conflict with
//// Ngrx.
//@Injectable({
//    providedIn: NgrxPlusBreezeModule
//})
export class StudentRepository extends Repository<IStudent> implements IStudentRepository {

    // Construction.

    constructor(
        entityManager: EntityManager,
    ) {
        super(entityManager);
    }


    // Property Accessors

    get EntityTypeName(): string {
        return "Student";
    }

}
