import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AppState, Student, Course } from '../../ngrx/interfaces';
import { setSelectedStudentForEnrollment, setSelectedEnrolledCourse, setSelectedUnenrolledCourse, addStudentEnrollment, removeStudentEnrollment } from '../../ngrx/NgrxDemo.actions';
import { getStudents, getEnrolledCourses, getUnenrolledCourses, getSelectedStudentForEnrollment, getSelectedEnrolledCourse, getSelectedUnenrolledCourse } from '../../ngrx/NgrxDemo.selectors';

import { Observable, of, pipe } from 'rxjs';

import * as $ from 'jquery'

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
                <select id="studentList" size="10" (change)="OnChangeStudent($event)" selected>
                    <option *ngFor="let student of students$ | async" [ngValue]="student">{{ student.firstName + ' ' + student.lastName }}</option>
                </select>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    Enrolled Courses
                </div>
                <select size="10" (change)="OnChangeEnrolled($event)">
                    <option *ngFor="let enrolledCourse of enrolledCourses$ | async">{{ enrolledCourse.title }}</option>
                </select>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    &nbsp;
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; height: 100%">
                    <div>
                        <input type="button" value=">>" (click)="OnEnrolledToUnenrolled()" [disabled]="(selectedEnrolledCourse$ | async) == null" [style.opacity]="((selectedEnrolledCourse$ | async) != null) ? 1: 0.33"/>
                    </div>
                    <div>
                        <input type="button" value="<<" (click)="OnUnenrolledToEnrolled()" [disabled]="(selectedUnenrolledCourse$ | async) == null" [style.opacity]="((selectedUnenrolledCourse$ | async) != null) ? 1: 0.33"/>
                    </div>
                </div>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    Unenrolled Courses
                </div>
                <select size="10" (change)="OnChangeUnenrolled($event)">
                    <option *ngFor="let unenrolledCourse of unenrolledCourses$ | async">{{ unenrolledCourse.title }}</option>
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
export class StudentEnrollmentsComponent implements OnInit {

    constructor(
        // If you specify a type T for Store<T> below (other than 'any') it does not actually
        // affect the structure of the store.  T is just what the programmer is telling the
        // compiler to expect the structure of the Store to be.  If the programmer specifies
        // an incorrect type T then all that will happen is that the compiler might complain
        // (with a red line) if a reference is made to a property in the store that does not
        // agree with the type T (even if it does correctly agree with the actual structure of
        // the Store).  Note that in the case when the application executes everything will be
        // fine because the reference is consistent with the Store.  Using 'any' will get
        // around this problem.  But using a type T has the advantage of helping expose erroneous
        // references (especially if the type T is defined in one place with global scope).
        //private store: Store<{ counterFeature: { count: number } }>
        private store: Store<AppState>
    ) {
        this.students$ = store.pipe(select(getStudents));
        this.enrolledCourses$ = this.store.pipe(select(getEnrolledCourses));
        this.unenrolledCourses$ = this.store.pipe(select(getUnenrolledCourses));
        this.selectedEnrolledCourse$ = this.store.pipe(select(getSelectedEnrolledCourse))
        this.selectedUnenrolledCourse$ = this.store.pipe(select(getSelectedUnenrolledCourse))
    }


    // Instance variables

    students$: Observable<Student[]>;
    enrolledCourses$: Observable<Course[]>;
    unenrolledCourses$: Observable<Course[]>;
    selectedEnrolledCourse$: Observable<Course>;
    selectedUnenrolledCourse$: Observable<Course>;


    // Life cycle methods

    ngOnInit() {
    }


    // UI event handlers.

    OnChangeStudent(ev) {
        let students$: Observable<Student[]> = this.store.pipe(select(getStudents));
        students$.subscribe(
            (students) => {
                let studentArray: Student[] = students as Student[];
                this.store.dispatch(setSelectedStudentForEnrollment({ selectedStudent: studentArray[ev.target.selectedIndex] }));
            }
        ).unsubscribe();
    }

    OnChangeEnrolled(ev) {
        let enrolledCourses$: Observable<Course[]> = this.store.pipe(select(getEnrolledCourses));
        enrolledCourses$.subscribe(
            (courses) => {
                let coursesArray: Course[] = courses as Course[];
                this.store.dispatch(setSelectedEnrolledCourse({ selectedCourse: coursesArray[ev.target.selectedIndex] }));
            }
        ).unsubscribe();
    }

    OnChangeUnenrolled(ev) {
        let unenrolledCourses$: Observable<Course[]> = this.store.pipe(select(getUnenrolledCourses));
        unenrolledCourses$.subscribe(
            (courses) => {
                let coursesArray: Course[] = courses as Course[];
                this.store.dispatch(setSelectedUnenrolledCourse({ selectedCourse: coursesArray[ev.target.selectedIndex] }));
            }
        ).unsubscribe();
    }

    OnEnrolledToUnenrolled() {
        let selectedStudentForEnrollment$: Observable<Student> = this.store.pipe(select(getSelectedStudentForEnrollment));
        selectedStudentForEnrollment$.subscribe(
            (student) => {
                if (student) {
                    let selectedEnrolledCourse$: Observable<Course> = this.store.pipe(select(getSelectedEnrolledCourse));
                    selectedEnrolledCourse$.subscribe(
                        (course) => {
                            if (course) {
                                this.store.dispatch(removeStudentEnrollment({ selectedStudent: student, selectedCourse: course }))
                            }
                        }
                    ).unsubscribe();
                }
            }
        ).unsubscribe()

        this.store.dispatch(setSelectedEnrolledCourse({ selectedCourse: null }));
    }

    OnUnenrolledToEnrolled() {
        let selectedStudentForEnrollment$: Observable<Student> = this.store.pipe(select(getSelectedStudentForEnrollment));
        selectedStudentForEnrollment$.subscribe(
            (student) => {
                if (student) {
                    let selectedUnenrolledCourse$: Observable<Course> = this.store.pipe(select(getSelectedUnenrolledCourse));
                    selectedUnenrolledCourse$.subscribe(
                        (course) => {
                            if (course) {
                                console.log(student);
                                console.log(course);
                                this.store.dispatch(addStudentEnrollment({ selectedStudent: student, selectedCourse: course }))
                            }
                        }
                    ).unsubscribe();
                }
            }
        ).unsubscribe()

        this.store.dispatch(setSelectedUnenrolledCourse({ selectedCourse: null }));
    }

}
