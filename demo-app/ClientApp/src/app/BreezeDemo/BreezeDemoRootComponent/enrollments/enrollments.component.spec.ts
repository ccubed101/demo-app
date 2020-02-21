import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BreezeBridgeHttpClientModule } from 'breeze-bridge2-angular';

import { EnrollmentsComponent } from './enrollments.component';

import { SchoolModel } from '../../School.model'
import { UnitOfWork } from '../../UnitOfWork'
import { BreezeDemoEntityManager } from '../../BreezeDemoEntityManager'
import { ICourseRepository, CourseRepository } from '../../CourseRepository'
import { IStudentRepository, StudentRepository } from '../../StudentRepository'
import { IEnrollmentRepository, EnrollmentRepository } from '../../EnrollmentRepository'
import { ITeacherRepository, TeacherRepository } from '../../TeacherRepository'

// THIS UNIT TEST IS DISABLED.  For some reason running this test, or any of the similar
// tests for the components in the BreezeDemo module, causes very strange things to happen.
// Specifically errors start to occur in test in completely different modules which causes
// the unit testing operation to fail.  Until the cause can be discerned these test must
// not be run.
// One possible explanation is that Karma and Jasmine are fine if the unit tests for
// components are in the startup module (e.g. app or main).  But in other module problems arise.
describe('EnrollmentComponent', () => {

    let component: EnrollmentsComponent;
    let fixture: ComponentFixture<EnrollmentsComponent>;

    beforeEach(async(() => {

        let schoolModelSpy = jasmine.createSpyObj('SchoolModel', ['AddEnrollments', 'UpdateEnrollments']);
        let httpClientSpy = jasmine.createSpy('HttpClient');

        TestBed.configureTestingModule({
            declarations: [
                EnrollmentsComponent
            ],
            imports: [
                ReactiveFormsModule,
                //BreezeBridgeHttpClientModule,
            ],
            providers: [
                //HttpClient,
                //HttpHandler,
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: SchoolModel, useValue: schoolModelSpy },
            ]
        })
        .compileComponents().then(() => {
            fixture = TestBed.createComponent(EnrollmentsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
