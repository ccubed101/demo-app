import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BreezeBridgeHttpClientModule } from 'breeze-bridge2-angular';

import { CoursesComponent } from './courses.component';

import { SchoolModel } from '../../School.model'
import { UnitOfWork } from '../../UnitOfWork'
import { BreezeDemoEntityManager } from '../../BreezeDemoEntityManager'
import { ICourseRepository, CourseRepository } from '../../CourseRepository'
import { IStudentRepository, StudentRepository } from '../../StudentRepository'
import { IEnrollmentRepository, EnrollmentRepository } from '../../EnrollmentRepository'
import { ITeacherRepository, TeacherRepository } from '../../TeacherRepository'

import { TestDepClass } from '../../TestDepClass';
import { ITestDepObj, testDepObj, TEST_DEP_OBJ } from '../../TestDepObj';


// THIS UNIT TEST IS DISABLED.  For some reason running this test, or any of the similar
// tests for the components in the BreezeDemo module, causes very strange things to happen.
// Specifically errors start to occur in test in completely different modules which causes
// the unit testing operation to fail.  Until the cause can be discerned these test must
// not be run.
// One possible explanation is that Karma and Jasmine are fine if the unit tests for
// components are in the startup module (e.g. app or main).  But in other module problems arise.
describe('CoursesComponent', () => {
    let component: CoursesComponent;
    let fixture: ComponentFixture<CoursesComponent>;

    //var schoolModelSpy;
    //var httpClientSpy;

    beforeEach(async(() => {

        let schoolModelSpy = jasmine.createSpyObj('SchoolModel', ['AddCourse']);
        let httpClientSpy = jasmine.createSpy('HttpClient');

        TestBed.configureTestingModule({
            declarations: [
                CoursesComponent
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
                TestDepClass,
                { provide: TEST_DEP_OBJ, useValue: <ITestDepObj>testDepObj },
            ]
    })
    .compileComponents().then(() => {
        fixture = TestBed.createComponent(CoursesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

