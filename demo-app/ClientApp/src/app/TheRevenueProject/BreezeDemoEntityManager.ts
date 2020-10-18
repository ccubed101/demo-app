import { EntityManager } from 'breeze-client';

import { entityManagerFactory } from './EntityManagerFactory'

export class BreezeDemoEntityManager extends EntityManager {

    // Construction.

    constructor(
    ) {
        super(entityManagerFactory());
    }

}
