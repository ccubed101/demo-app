import { async, TestBed } from '@angular/core/testing'
import { of } from 'rxjs';
import { MetadataStore, NamingConvention, EntityType, ComplexType } from 'breeze-client';

import { UnitOfWork } from './UnitOfWork'
import { BreezeDemoEntityManager } from './BreezeDemoEntityManager'
import { CourseRepository } from './CourseRepository'
import { StudentRepository } from './StudentRepository'
import { StudentEnrollmentRepository } from './StudentEnrollmentRepository'
import { TeacherRepository } from './TeacherRepository'

describe('BreezeDemo UnitOfWork', () => {

    // Programmer Note:  Jasmine's "this" keyword does not work if the async()
    // function is used. So it cannot be used as a global means of sharing state.

    var entityManager;

    beforeEach(async(() => {

        let metadataStore = {
            getEntityTypes: function () {
                console.log('*****getEntityTypes()*****');
                return <(EntityType | ComplexType)[]>[];
            }
        }

        entityManager = {
            fetchMetadata: () => {
                return new Promise((resolve, reject) => { resolve("Dummy Schema") })
            },
            metadataStore: {
                getEntityTypes: function () {
                    console.log('**getEntityTypes()**');
                    return <(EntityType | ComplexType)[]>(new Array());
                }
            }
        }

        //spyOn(entityManager.metadataStore, "getEntityTypes");

        //let metadataStore = jasmine.createSpyObj('metadataStore', { 'getEntityTypes': 3 });

        //let entityManager: Partial<BreezeDemoEntityManager> = {
        //    metadataStore: metadataStore
        //}

        TestBed.configureTestingModule({
            providers: [
                UnitOfWork,
                //{
                //    provide: BreezeDemoEntityManager, useValue: jasmine.createSpyObj('BreezeDemoEntityManager',
                //        {
                //            'fetchMetadata': of("Dummy Schema"), 
                //            'metadataStore': jasmine.createSpyObj('metadataStore', { 'getEntityTypes': [] })
                //        }), 
                //},
                { provide: BreezeDemoEntityManager, useValue: entityManager },
                { provide: CourseRepository, useValue: jasmine.createSpy('CourseRepository') },
                { provide: StudentRepository, useValue: jasmine.createSpy('StudentRepository') },
                { provide: StudentEnrollmentRepository, useValue: jasmine.createSpy('StudentEnrollmentRepository') },
                { provide: TeacherRepository, useValue: jasmine.createSpy('TeacherRepository') },
            ]
        });
    }));


    it('should be created', () => {
        const unitOfWork: UnitOfWork = TestBed.get(UnitOfWork);
        spyOn(entityManager.metadataStore, "getEntityTypes");
        expect(unitOfWork).toBeTruthy();
        //expect(entityManager.metadataStore.getEntityTypes.calls.count()).toEqual(1);
    });
});
