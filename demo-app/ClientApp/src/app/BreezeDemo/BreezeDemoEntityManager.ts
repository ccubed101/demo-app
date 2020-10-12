import { EntityManager } from 'breeze-client';

import { entityManagerFactory } from './EntityManagerFactory'
import { Injectable } from "@angular/core";

@Injectable()
export class BreezeDemoEntityManager extends EntityManager {

    // Construction.

    constructor(
    ) {
        super(entityManagerFactory());
    }

}
