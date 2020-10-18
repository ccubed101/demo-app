import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { IStudent } from '../../Student'
import { SchoolModel } from '../../School.model';

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
                                <select id="studentSelect" size="8" (change)="OnChangeStudent($event)" #studentSelect style="min-width: 10em">
                                    <option *ngFor="let student of Students$ | async" [value]="student.id">{{ student.FirstName + ' ' + student.LastName }}</option>
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
				                <button type="button" (click)="OnRemoveStudent($event)" [disabled]="(SelectedStudentToRemove$ | async) == null" [style.opacity]="((SelectedStudentToRemove$ | async) != null) ? 1: 0.33">Remove Student</button>
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
        private schoolModel: SchoolModel,
    ) {
    }


    // Property Accessors

    get Students$(): Observable<IStudent[]> {
        return this.schoolModel.Students$
    }

    get SelectedStudentToRemove$(): Observable<IStudent> {
        return this.schoolModel.SelectedStudentToRemove$
    }


    // Life cycle methods

    ngOnInit() {
        // Make the height of the select element where the student to remove is selected equal to
        // the height of the table where the student information is entered.
        $("#selectDiv").height($("#formTable").outerHeight());
        //$("#selectStudent").height($("#formTable").outerHeight());
    }


    // Form

    formGroup: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        enrollmentDate: new FormControl(null, [Validators.required]),
    });


    // UI event handlers.

    onSubmit() {
        this.schoolModel.AddStudent(
            this.formGroup.controls['firstName'].value,
            this.formGroup.controls['lastName'].value,
            this.formGroup.controls['enrollmentDate'].value
        );
    }

    OnChangeStudent(ev) {
        this.schoolModel.Students$.subscribe(
            (students) => {
                let studentArray: IStudent[] = students as IStudent[];
                this.schoolModel.SelectedStudentToRemove$ = of(studentArray[$("#studentSelect").prop("selectedIndex")]);
            }
        ).unsubscribe();
    }

    OnRemoveStudent(ev) {

        this.schoolModel.SelectedStudentToRemove$.subscribe(
            (student) => {
                this.schoolModel.RemoveStudent(student);
            }
        ).unsubscribe();

        // If the selected student in the StudentEnrollments component is the same as
        // the student that was removed then update the choice of selection.
        this.schoolModel.SelectedStudentToRemove$.subscribe(
            (removedStudent) => {
                this.schoolModel.SelectedStudentForEnrollment$.subscribe(
                    (selectedStudentForEnrollment) => {
                        if (removedStudent == selectedStudentForEnrollment) {
                            this.schoolModel.SelectedStudentForEnrollment$ = of();
                        }
                    }
                ).unsubscribe();
            }
        ).unsubscribe();

        this.schoolModel.SelectedStudentToRemove$ = of();
    }

}
