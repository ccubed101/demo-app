import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Store, select } from '@ngrx/store';

import { NgrxDemoState, Student } from '../../ngrx/interfaces';
import { setSelectedStudentToRemove, addStudent, removeStudent, setSelectedStudentForEnrollment } from '../../ngrx/NgrxDemo.actions';
import { getStudents, getSelectedStudentToRemove, getSelectedStudentForEnrollment } from '../../ngrx/NgrxDemo.selectors';

import { Observable, of, pipe } from 'rxjs';

import * as $ from 'jquery'

@Component({
  selector: 'AddRemoveStudent',
  template: `
        <div style="text-align: center">
            <div style="padding-bottom: 0.75em">
                Add/Remove Student
            </div>

 		    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" style="text-align: center">
                <table style="margin-left: auto; margin-right: auto">
                    <tr>
                        <td style="padding-right: 0.75em">
			                <table id="formTable" align="left" border="1px line black" class="formTable">
				                <tr>
					                <td class="formLabel">ID:</td>
					                <td>
						                <input type="number" formControlName="id"/>
					                </td>
				                </tr>
				                <tr>
					                <td class="formLabel">First Name:</td>
					                <td>
						                <input type="text" formControlName="firstName"/>
					                </td>
				                </tr>
				                <tr>
					                <td class="formLabel">Last Name:</td>
					                <td>
						                <input type="text" formControlName="lastName"/>
					                </td>
				                </tr>
				                <tr>
					                <td class="formLabel">Enrollment Date:</td>
					                <td>
						                <input type="date" formControlName="enrollmentDate"/>
					                </td>
				                </tr>
			                </table>
                        </td>
                        <td class="selectTableCell">
                            <div id="selectDiv" style="overflow: hidden">
                                <select id="studentSelect" size="8" (change)="OnChangeStudent($event)" #studentSelector style="min-width: 10em">
                                    <option *ngFor="let student of students$ | async" [value]="student.id">{{ student.firstName + ' ' + student.lastName }}</option>
                                </select>
                            </div>
                       </td>
                    </tr>
                    <tr>
                        <td>
 			                <div style="text-align: center; margin-top: 1em">
				                <button type="submit" [disabled]="!formGroup.valid" style="margin-left: 0.5em; margin-right: 0.5em" [style.opacity]="formGroup.valid ? 1: 0.33">Add Student</button>
			                </div>
                        </td>
                        <td>
  			                <div style="text-align: center; margin-top: 1em">
				                <button type="button" (click)="OnRemoveStudent($event)" [disabled]="(selectedStudentToDelete$ | async) == null" [style.opacity]="((selectedStudentToDelete$ | async) != null) ? 1: 0.33">Remove Student</button>
			                </div>
                       </td>
                    </tr>
                </table>
		    </form>
        </div>
    `,
    styles: [
        ".header { padding-bottom: 0.75em }",
        ".formLabel { text-align: left; vertical-align: middle; padding-left: 0.2em; padding-right: 0.2em }",
        ".formTable { border-spacing: 10px; border-collapse: separate }",
        ".selectTableCell { vertical-align: top; }"
    ]
})
export class AddRemoveStudentComponent implements OnInit {

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
        // references (especially if the type T is define in one place with global scope).
        //private store: Store<{ counterFeature: { count: number } }>
        private store: Store<any>
    ) {
        this.students$ = store.pipe(select(getStudents));
        this.selectedStudentToDelete$ = store.pipe(select(getSelectedStudentToRemove));
    }


    // Instance variables

    students$: Observable<Student[]>;
    selectedStudentToDelete$: Observable<Student>;


    // Life cycle methods

    ngOnInit() {
        // Make the height of the select element where the student to remove is selected equal to
        // the height of the table where the student information is entered.
        $("#selectDiv").height($("#formTable").outerHeight());
        //$("#selectStudent").height($("#formTable").outerHeight());
    }


    // Form

    formGroup: FormGroup = new FormGroup({
        id: new FormControl(null, [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        enrollmentDate: new FormControl(null, [Validators.required]),
    });


    // UI event handlers.

    onSubmit() {
        let studentToAdd: Student = {
            id: this.formGroup.controls['id'].value,
            firstName: this.formGroup.controls['firstName'].value,
            lastName: this.formGroup.controls['lastName'].value,
            enrollmentDate: this.formGroup.controls['enrollmentDate'].value,
        };
        console.log(studentToAdd);
        this.store.dispatch(addStudent({ studentToAdd }));
    }

    OnChangeStudent(ev) {
        let students$: Observable<Student[]> = this.store.pipe(select(getStudents));
        students$.subscribe(
            (students) => {
                let studentArray: Student[] = students as Student[];
                this.store.dispatch(setSelectedStudentToRemove({ selectedStudent: studentArray[$("#studentSelect").prop("selectedIndex")] }));
            }
        ).unsubscribe();
    }

    OnRemoveStudent(ev) {

        let selectedStudentToDelete$: Observable<any> = this.store.pipe(select(getSelectedStudentToRemove));
        selectedStudentToDelete$.subscribe(
            (student) => {
                this.store.dispatch(removeStudent({ studentToRemove: student }));
            }
        ).unsubscribe();

        // If the selected student in the Enrollments component is that same as the
        // student that was removed then update then update the choice of selection.
        selectedStudentToDelete$.subscribe(
            (removedStudent) => {
                let selectedStudentForEnrollment$: Observable<Student> = this.store.pipe(select(getSelectedStudentForEnrollment));
                selectedStudentForEnrollment$.subscribe(
                    (selectedStudentForEnrollment) => {
                        if (removedStudent == selectedStudentForEnrollment) {
                            this.store.dispatch(setSelectedStudentForEnrollment({ selectedStudent: null }));
                        }
                    }
                ).unsubscribe();
            }
        ).unsubscribe();

        this.store.dispatch(setSelectedStudentToRemove({ selectedStudent: null }));
    }

}
