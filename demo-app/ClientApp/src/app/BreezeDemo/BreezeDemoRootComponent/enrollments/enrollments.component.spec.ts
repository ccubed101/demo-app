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
xdescribe('EnrollmentComponent', () => {
    let component: EnrollmentsComponent;
    let fixture: ComponentFixture<EnrollmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            EnrollmentsComponent
        ],
        imports: [
            ReactiveFormsModule,
            BreezeBridgeHttpClientModule,
        ],
        providers: [
            HttpClient,
            HttpHandler,
            SchoolModel,
            UnitOfWork,
            BreezeDemoEntityManager,
            CourseRepository,
            StudentRepository,
            EnrollmentRepository,
            TeacherRepository,
        ]
   })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(EnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
