import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';

import { Observable, of, pipe } from 'rxjs';

import * as $ from 'jquery'

import { IStudent } from '../../Student'
import { ICourse } from '../../Course'
import { SchoolModel } from '../../School.model';

@Component({
  selector: 'StudentEnrollments',
    // In the template below I expected that [ngValue]="student" in the <option> would assign a Student
    // object to the value property.  This does not happen.  Instead the name of the text of the option
    // is assigned to the value property.  I do not know why this is the case.  In any case a work-around
    // was employed.
  template: `
        <div class="header">
            Student Enrollments
        </div>
        <div class="flex-container">
            <div class="gridDiv">
                <div class="header2">
                    Students
                </div>
                <select id="studentList" size="10" (change)="OnChangeStudent($event)" selected #studentList>
                    <option *ngFor="let student of Students$ | async" [ngValue]="student">{{ student.FirstName + ' ' + student.LastName }}</option>
                </select>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    Enrolled Courses
                </div>
                <select size="10" (change)="OnChangeEnrolled($event)">
                    <option *ngFor="let enrolledCourse of EnrolledCourses$ | async">{{ enrolledCourse.Title }}</option>
                </select>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    &nbsp;
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; height: 100%">
                    <div>
                        <input type="button" value=">>" (click)="OnEnrolledToUnenrolled()" [disabled]="(SelectedEnrolledCourse$ | async) == null" [style.opacity]="((SelectedEnrolledCourse$ | async) != null) ? 1: 0.33"/>
                    </div>
                    <div>
                        <input type="button" value="<<" (click)="OnUnenrolledToEnrolled()" [disabled]="(SelectedUnenrolledCourse$ | async) == null" [style.opacity]="((SelectedUnenrolledCourse$ | async) != null) ? 1: 0.33"/>
                    </div>
                </div>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    Unenrolled Courses
                </div>
                <select size="10" (change)="OnChangeUnenrolled($event)">
                    <option *ngFor="let unenrolledCourse of UnenrolledCourses$ | async">{{ unenrolledCourse.Title }}</option>
                </select>
            </div>
        </div>
    `,
    styles: [
        ".flex-container { display: flex; justify-content: center; padding-left: 0.375em; padding-right: 0.375em }",
        ".gridDiv { margin-top: 0.75em; margin-bottom: 0.75em; margin-left: 0.375em; margin-right: 0.375em }",
        "select { min-width: 20em }",
        ".header { padding-bottom: 0.75em }",
        ".header2 { padding-bottom: 0.75em }",
    ]
})
export class StudentEnrollmentsComponent implements OnInit, OnChanges, DoCheck {

    constructor(
        private schoolModel: SchoolModel,
    ) {
    }


    // Property accessors

    get Students$(): Observable<IStudent[]> {
        return this.schoolModel.Students$
    }

    get EnrolledCourses$(): Observable<ICourse[]> {
        return this.schoolModel.EnrolledCourses$;
    }

    get UnenrolledCourses$(): Observable<ICourse[]> {
        return this.schoolModel.UnenrolledCourses$;
    }

    get SelectedEnrolledCourse$(): Observable<ICourse> {
        return this.schoolModel.SelectedEnrolledCourse$;
    }
    set SelectedEnrolledCourse$(selectedEnrolledCourse$: Observable<ICourse>) {
        this.schoolModel.SelectedEnrolledCourse$ = selectedEnrolledCourse$;
    }

    get SelectedUnenrolledCourse$(): Observable<ICourse> {
        return this.schoolModel.SelectedUnenrolledCourse$;
    }
    set SelectedUnnrolledCourse$(selectedUnenrolledCourse$: Observable<ICourse>) {
        this.schoolModel.SelectedUnenrolledCourse$ = selectedUnenrolledCourse$;
    }


    // Life cycle methods

    ngOnInit() {
        console.log("ngOnInit");
    }

    ngOnChanges() {
        console.log("ngOnChanges");
    }

    ngDoCheck() {
        console.log("ngDoCheck");
    }


    // UI event handlers.

    OnChangeStudent(ev) {
        this.schoolModel.Students$.subscribe(
            (students) => {
                let studentsArray: IStudent[] = students as IStudent[];
                this.schoolModel.SelectedStudentForEnrollment$ = of(studentsArray[$("#studentList").prop("selectedIndex")]);
            }
        ).unsubscribe();
    }

    OnChangeEnrolled(ev) {
        this.schoolModel.EnrolledCourses$.subscribe(
            (enrolledCourses) => {
                let enrolledCoursesArray: ICourse[] = enrolledCourses as ICourse[];
                this.schoolModel.SelectedEnrolledCourse$ = of(enrolledCoursesArray[ev.target.selectedIndex]);
            }
        ).unsubscribe();
    }

    OnChangeUnenrolled(ev) {
        this.schoolModel.UnenrolledCourses$.subscribe(
            (unenrolledCourses) => {
                let unenrolledCoursesArray: ICourse[] = unenrolledCourses as ICourse[];
                this.schoolModel.SelectedUnenrolledCourse$ = of(unenrolledCoursesArray[ev.target.selectedIndex]);
            }
        ).unsubscribe();
    }

    OnEnrolledToUnenrolled() {
        this.schoolModel.SelectedStudentForEnrollment$.subscribe(
            (student) => {
                if (student) {
                    this.schoolModel.SelectedEnrolledCourse$.subscribe(
                        (course) => {
                            if (course) {
                                console.log(student);
                                console.log(course);
                                this.schoolModel.RemoveStudentEnrollment(student, course);
                            }
                        }
                    ).unsubscribe();
                }
            }
        ).unsubscribe()

        this.schoolModel.SelectedEnrolledCourse$ = of();
    }

    OnUnenrolledToEnrolled() {
        this.schoolModel.SelectedStudentForEnrollment$.subscribe(
            (student) => {
                if (student) {
                    this.schoolModel.SelectedUnenrolledCourse$.subscribe(
                        (course) => {
                            if (course) {
                                this.schoolModel.AddStudentEnrollment(student, course);
                            }
                        }
                    ).unsubscribe();
                }
            }
        ).unsubscribe()

        this.schoolModel.SelectedUnenrolledCourse$ = of();
    }

}
