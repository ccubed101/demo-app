import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AppState, NgrxDemoState, Teacher, Course } from '../../ngrx/interfaces';
import { setSelectedTeacherForAssignment, setSelectedAssignedCourse, setSelectedUnassignedCourse, addTeacherAssignment, removeTeacherAssignment } from '../../ngrx/NgrxDemo.actions';
import { getTeachers, getAssignedCourses, getUnassignedCourses, getSelectedAssignedCourse, getSelectedUnassignedCourse, getSelectedTeacherForAssignment} from '../../ngrx/NgrxDemo.selectors';

import { Observable, of, pipe } from 'rxjs';

import * as $ from 'jquery'

@Component({
    selector: 'TeacherAssignments',
    // In the template below I expected that [ngValue]="teacher" in the <option> would assign a Teacher
    // object to the value property.  This does not happen.  Instead the name of the text of the option
    // is assigned to the value property.  I do not know why this is the case.  In any case a work-around
    // was employed.
    template: `
        <div class="header">
            Teacher Course Assignments
        </div>
        <div class="flex-container">
            <div class="gridDiv">
                <div class="header2">
                    Teachers
                </div>
                <select id="teacherList" size="10" (change)="OnChangeTeacher($event)" selected>
                    <option *ngFor="let teacher of teachers$ | async" [ngValue]="teacher">{{ teacher.firstName + ' ' + teacher.lastName }}</option>
                </select>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    Assigned
                </div>
                <select size="10" (change)="OnChangeAssigned($event)">
                    <option *ngFor="let assignedCourse of assignedCourses$ | async">{{ assignedCourse.title }}</option>
                </select>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    &nbsp;
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; height: 100%">
                    <div>
                        <input type="button" value=">>" (click)="OnAssignedToUnassigned()" [disabled]="(selectedAssignedCourse$ | async) == null" [style.opacity]="((selectedAssignedCourse$ | async) != null) ? 1: 0.33"/>
                    </div>
                    <div>
                        <input type="button" value="<<" (click)="OnUnassignedToAssigned()"[disabled]="(selectedUnassignedCourse$ | async) == null" [style.opacity]="((selectedUnassignedCourse$ | async) != null) ? 1: 0.33"/>
                    </div>
                </div>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    Unassigned
                </div>
                <select size="10" (change)="OnChangeUnassigned($event)">
                    <option *ngFor="let unassignedCourse of unassignedCourses$ | async">{{ unassignedCourse.title }}</option>
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
export class TeacherAssignmentsComponent implements OnInit {

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
        this.teachers$ = store.pipe(select(getTeachers));
        this.assignedCourses$ = this.store.pipe(select(getAssignedCourses));
        this.unassignedCourses$ = this.store.pipe(select(getUnassignedCourses));
        this.selectedAssignedCourse$ = this.store.pipe(select(getSelectedAssignedCourse))
        this.selectedUnassignedCourse$ = this.store.pipe(select(getSelectedUnassignedCourse))
    }


    // Instance variables

    teachers$: Observable<Teacher[]>;
    assignedCourses$: Observable<Course[]>;
    unassignedCourses$: Observable<Course[]>;
    selectedAssignedCourse$: Observable<Course>;
    selectedUnassignedCourse$: Observable<Course>;


    // Life cycle methods

    ngOnInit() {
    }


    // UI event handlers.

    OnChangeTeacher(ev) {
        let teachers$: Observable<Teacher[]> = this.store.pipe(select('NgrxDemo', 'teachers'));
        teachers$.subscribe(
            (teachers) => {
                let teacherArray: Teacher[] = teachers as Teacher[];
                this.store.dispatch(setSelectedTeacherForAssignment({ selectedTeacher: teacherArray[ev.target.selectedIndex] }));
            }
        ).unsubscribe();
    }

    OnChangeAssigned(ev) {
        let assignedCourses$: Observable<Course[]> = this.store.pipe(select(getAssignedCourses));
        assignedCourses$.subscribe(
            (courses) => {
                let coursesArray: Course[] = courses as Course[];
                this.store.dispatch(setSelectedAssignedCourse({ selectedCourse: coursesArray[ev.target.selectedIndex] }));
            }
        ).unsubscribe();
    }

    OnChangeUnassigned(ev) {
        let unassignedCourses$: Observable<Course[]> = this.store.pipe(select(getUnassignedCourses));
        unassignedCourses$.subscribe(
            (courses) => {
                let coursesArray: Course[] = courses as Course[];
                this.store.dispatch(setSelectedUnassignedCourse({ selectedCourse: coursesArray[ev.target.selectedIndex] }));
            }
        ).unsubscribe();
    }

    OnAssignedToUnassigned() {
        let selectedTeacherForAssignment$: Observable<Teacher> = this.store.pipe(select(getSelectedTeacherForAssignment));
        selectedTeacherForAssignment$.subscribe(
            (teacher) => {
                if (teacher) {
                    let selectedAssignedCourse$: Observable<Course> = this.store.pipe(select(getSelectedAssignedCourse));
                    selectedAssignedCourse$.subscribe(
                        (course) => {
                            if (course) {
                                this.store.dispatch(removeTeacherAssignment({ selectedTeacher: teacher, selectedCourse: course }))
                            }
                        }
                    ).unsubscribe();
                }
            }
        ).unsubscribe()

        this.store.dispatch(setSelectedAssignedCourse({ selectedCourse: null }));
    }

    OnUnassignedToAssigned() {
        let selectedTeacherForAssignment$: Observable<Teacher> = this.store.pipe(select(getSelectedTeacherForAssignment));
        selectedTeacherForAssignment$.subscribe(
            (teacher) => {
                if (teacher) {
                    let selectedUnassignedCourse$: Observable<Course> = this.store.pipe(select(getSelectedUnassignedCourse));
                    selectedUnassignedCourse$.subscribe(
                        (course) => {
                            if (course) {
                                this.store.dispatch(addTeacherAssignment({ selectedTeacher: teacher, selectedCourse: course }))
                            }
                        }
                    ).unsubscribe();
                }
            }
        ).unsubscribe()

        this.store.dispatch(setSelectedUnassignedCourse({ selectedCourse: null }));
    }
}
