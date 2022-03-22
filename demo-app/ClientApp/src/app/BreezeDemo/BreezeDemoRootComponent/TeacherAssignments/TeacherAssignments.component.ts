import { Component, OnInit } from '@angular/core';

import { Observable, of, pipe } from 'rxjs';

import * as $ from 'jquery'

import { ITeacher } from '../../Teacher'
import { ICourse } from '../../Course'
import { SchoolModel } from '../../School.model';

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
                    <option *ngFor="let teacher of Teachers$ | async" [ngValue]="teacher">{{ teacher.firstName + ' ' + teacher.lastName }}</option>
                </select>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    Assigned
                </div>
                <select size="10" (change)="OnChangeAssigned($event)">
                    <option *ngFor="let assignedCourse of AssignedCourses$ | async">{{ assignedCourse.title }}</option>
                </select>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    &nbsp;
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; height: 100%">
                    <div>
                        <input type="button" value=">>" (click)="OnAssignedToUnassigned()" [disabled]="(SelectedAssignedCourse$ | async) == null" [style.opacity]="((SelectedAssignedCourse$ | async) != null) ? 1: 0.33"/>
                    </div>
                    <div>
                        <input type="button" value="<<" (click)="OnUnassignedToAssigned()"[disabled]="(SelectedUnassignedCourse$ | async) == null" [style.opacity]="((SelectedUnassignedCourse$ | async) != null) ? 1: 0.33"/>
                    </div>
                </div>
            </div>
            <div class="gridDiv">
                <div class="header2">
                    Unassigned
                </div>
                <select size="10" (change)="OnChangeUnassigned($event)">
                    <option *ngFor="let unassignedCourse of UnassignedCourses$ | async">{{ unassignedCourse.title }}</option>
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
        private schoolModel: SchoolModel,
    ) {
    }


    // Property accessors

    get Teachers$(): Observable<ITeacher[]> {
        return this.schoolModel.Teachers$
    }

    get AssignedCourses$(): Observable<ICourse[]> {
        return this.schoolModel.AssignedCourses$;
    }

    get UnassignedCourses$(): Observable<ICourse[]> {
        return this.schoolModel.UnassignedCourses$;
    }

    get SelectedAssignedCourse$(): Observable<ICourse> {
        return this.schoolModel.SelectedAssignedCourse$;
    }
    set SelectedAssignedCourse$(selectedAssignedCourse$: Observable<ICourse>) {
        this.schoolModel.SelectedAssignedCourse$ = selectedAssignedCourse$;
    }

    get SelectedUnassignedCourse$(): Observable<ICourse> {
        return this.schoolModel.SelectedUnassignedCourse$;
    }
    set SelectedUnnrolledCourse$(selectedUnassignedCourse$: Observable<ICourse>) {
        this.schoolModel.SelectedUnassignedCourse$ = selectedUnassignedCourse$;
    }


    // Life cycle methods

    ngOnInit() {
    }


    // UI event handlers.

    OnChangeTeacher(ev) {
        this.schoolModel.Teachers$.subscribe(
            (teachers) => {
                let teacherArray: ITeacher[] = teachers as ITeacher[];
                this.schoolModel.SelectedTeacherForAssignment$ = of(teacherArray[ev.target.selectedIndex]);
            }
        ).unsubscribe();
    }

    OnChangeAssigned(ev) {
        this.schoolModel.AssignedCourses$.subscribe(
            (courses) => {
                const coursesArray: ICourse[] = courses as ICourse[];
                console.log(coursesArray[ev.target.selectedIndex].title);
                this.schoolModel.SelectedAssignedCourse$ = of(coursesArray[ev.target.selectedIndex]);
            }
        ).unsubscribe();
    }

    OnChangeUnassigned(ev) {
        this.schoolModel.UnassignedCourses$.subscribe(
            (courses) => {
                const coursesArray: ICourse[] = courses as ICourse[];
                this.schoolModel.SelectedUnassignedCourse$ = of(coursesArray[ev.target.selectedIndex]);
            }
        ).unsubscribe();
    }

    OnAssignedToUnassigned() {
        console.log("OnAssignedToUnassigned");
        this.schoolModel.SelectedTeacherForAssignment$.subscribe(
            (teacher) => {
                if (teacher) {
                    this.schoolModel.SelectedAssignedCourse$.subscribe(
                        (course) => {
                            if (course) {
                                console.log(teacher.firstName + " " + teacher.lastName);
                                console.log(course.title);
                                this.schoolModel.RemoveTeacherAssignment(teacher, course);
                                this.schoolModel.SelectedAssignedCourse$ = of();
                            }
                        }
                    ).unsubscribe();
                }
            }
        ).unsubscribe()

    }

    OnUnassignedToAssigned() {
        console.log("OnUnassignedToAssigned");
        this.schoolModel.SelectedTeacherForAssignment$.subscribe(
            (teacher) => {
                if (teacher) {
                    this.schoolModel.SelectedUnassignedCourse$.subscribe(
                        (course) => {
                            if (course) {
                                console.log(teacher.firstName + " " + teacher.lastName);
                                console.log(course.title);
                                this.schoolModel.AddTeacherAssignment(teacher, course);
                                this.schoolModel.SelectedUnassignedCourse$ = of();
                            }
                        }
                    ).unsubscribe();
                }
            }
        ).unsubscribe()

    }
}
