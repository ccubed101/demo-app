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
xdescribe('CoursesComponent', () => {
    let component: CoursesComponent;
    let fixture: ComponentFixture<CoursesComponent>;

    //var schoolModelSpy;
    //var httpClientSpy;

    beforeEach(async(() => {

        //schoolModelSpy = jasmine.createSpyObj('SchoolModel', ['AddStudent']);
        //httpClientSpy = jasmine.createSpy('HttpClient');

        TestBed.configureTestingModule({
            declarations: [
                CoursesComponent
            ],
            imports: [
                ReactiveFormsModule,
                BreezeBridgeHttpClientModule,
            ],
            providers: [

                //schoolModelSpy,

 		        //HttpClient,
		        //HttpHandler,
                SchoolModel,
                UnitOfWork,
                BreezeDemoEntityManager,
                CourseRepository,
                StudentRepository,
                EnrollmentRepository,
                TeacherRepository,

                TestDepClass,
                { provide: TEST_DEP_OBJ, useValue: <ITestDepObj>testDepObj },
            ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

