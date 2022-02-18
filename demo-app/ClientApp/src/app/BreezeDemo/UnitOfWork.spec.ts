import { async, TestBed } from '@angular/core/testing'
import { of } from 'rxjs';
import { MetadataStore, NamingConvention, EntityType, ComplexType } from 'breeze-client';

import { UnitOfWork } from './UnitOfWork'
import { BreezeDemoEntityManager } from './BreezeDemoEntityManager'
import { TeacherRepository } from './TeacherRepository'
import { CourseRepository } from './CourseRepository'
import { StudentRepository } from './StudentRepository'
import { StudentEnrollmentRepository } from './StudentEnrollmentRepository'
import { TeacherAssignmentRepository } from './TeacherAssignmentRepository'


describe('BreezeDemo UnitOfWork', () => {

    // Programmer Note:  Jasmine's "this" keyword does not work if the async()
    // function is used. So it cannot be used as a global means of sharing state.

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                { provide: UnitOfWork, useClass: UnitOfWork },
                {
                    provide: BreezeDemoEntityManager, useValue: 
                        {
                            fetchMetadata: jasmine.createSpy('fetchMetadata').and.returnValue( of('Schema')),
                            metadataStore: jasmine.createSpyObj({ 'getEntityTypes':  [] })
                        },
                },

                //{ provide: BreezeDemoEntityManager, useValue: jasmine.createSpy('entityManager') },
                { provide: TeacherRepository, useValue: jasmine.createSpy('TeacherRepository') },
                { provide: CourseRepository, useValue: jasmine.createSpy('CourseRepository') },
                { provide: StudentRepository, useValue: jasmine.createSpy('StudentRepository') },
                { provide: TeacherAssignmentRepository, useValue: jasmine.createSpy('TeacherAssignmentRepository') },
                { provide: StudentEnrollmentRepository, useValue: jasmine.createSpy('StudentEnrollmentRepository') },
            ]
        });
    }));



    it('should be created', () => {

        const unitOfWork: UnitOfWork = TestBed.get(UnitOfWork);
        expect(unitOfWork).toBeTruthy();

        // Note that the instance of the BreezeDemoEntityManager that is obtained
        // on the line below is also the instance that is provided to the constructor
        // for the UnitOfWork instance above.
        const entityManager: BreezeDemoEntityManager = TestBed.get(BreezeDemoEntityManager);
        //console.log('count = ' + ((entityManager.metadataStore.getEntityTypes) as jasmine.Spy).calls.count());
        expect(((entityManager.metadataStore.getEntityTypes) as jasmine.Spy).calls.count()).toEqual(1);
    });
});
