import { Injectable } from '@angular/core';

import { EntityManager } from 'breeze-client';

//import { NgrxPlusBreezeModule } from './NgrxPlusBreeze.module';

import { IRepository, Repository } from './Repository';
import { ITeacher } from './Teacher'

export interface ITeacherRepository extends IRepository<ITeacher> {

}

//// Specifying providers can be done as shown below (as opposed to being done in the NgModule
//// declaration).  But this could cause problems.  In particular there was some conflict with
//// Ngrx.
//@Injectable({
//    providedIn: NgrxPlusBreezeModule
//})
export class TeacherRepository extends Repository<ITeacher> implements ITeacherRepository {

    // Construction.

    constructor(
        entityManager: EntityManager,
    ) {
        super(entityManager);
    }


    // Property Accessors

    get EntityTypeName(): string {
        return "Teacher";
    }

}