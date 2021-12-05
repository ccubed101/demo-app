import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Observable, of, pipe } from 'rxjs';

import { ITeacher } from '../../Teacher'
import { SchoolModel } from '../../School.model';

import * as $ from 'jquery'

@Component({
  selector: 'AddRemoveTeacher',
  template: `
        <div class="header">
            Add/Remove Teacher
        </div>

 		<form [formGroup]="formGroup" (ngSubmit)="onSubmit()" style="text-align: center">
            <table style="margin-left: auto; margin-right: auto">
                <tr>
                    <td style="padding-right: 0.75em">
			            <table id="formTable" align="left" border="1px line black" class="formTable">
				            <tr>
					            <td class="formLabel">Frist Name:</td>
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
			            </table>
                    </td>
                    <td class="selectTableCell">
                        <div id="selectDiv" style="overflow: hidden">
                            <select id="teacherSelect" size="8" (change)="OnChangeTeacher($event)" #teacherSelect style="min-width: 10em">
                                <option *ngFor="let teacher of Teachers$ | async" [value]="teacher.id">{{ teacher.FirstName + ' ' + teacher.LastName }}</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
 			            <div style="text-align: center; margin-top: 1em">
				                <button type="submit" [disabled]="!formGroup.valid" style="margin-left: 0.5em; margin-right: 0.5em" [style.opacity]="formGroup.valid ? 1: 0.33">Add Teacher</button>
			            </div>
                    </td>
                    <td>
  			            <div style="text-align: center; margin-top: 1em">
				            <button type="button" (click)="OnRemoveTeacher($event)" [disabled]="(SelectedTeacherToRemove$ | async) == null" [style.opacity]="((SelectedTeacherToRemove$ | async) != null) ? 1: 0.33">Remove Teacher</button>
			            </div>
                    </td>
                </tr>
            </table>
		</form>
    `,
    styles: [
        ".header { padding-bottom: 0.75em }",
        ".formLabel { text-align: left; vertical-align: middle; padding-left: 0.2em; padding-right: 0.2em }",
        ".formTable { border-spacing: 10px; border-collapse: separate }",
        ".selectTableCell { vertical-align: top; }"
    ]
})
export class AddRemoveTeacherComponent implements OnInit {

    constructor(
        private schoolModel: SchoolModel,
    ) {
    }


    // Life cycle methods

    ngOnInit() {
        // Make the height of the select element where the course to remove is selected equal to
        // the height of the table where the course information is entered.
        $("#selectDiv").height($("#formTable").outerHeight());
        //$("#selectCourse").height($("#formTable").outerHeight());
   }


    // Property accessors

    get Teachers$(): Observable<ITeacher[]> {
        return this.schoolModel.Teachers$;
    }

    get SelectedTeacherToRemove$(): Observable<ITeacher> {
        return this.schoolModel.SelectedTeacherToRemove$
    }


    // Form

    formGroup: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
    });


    // UI event handlers.

    onSubmit() {
        this.schoolModel.AddTeacher(
            this.formGroup.controls['firstName'].value,
            this.formGroup.controls['lastName'].value,
        );
    }

    OnChangeTeacher(ev) {
        this.Teachers$.subscribe(
            (teachers) => {
                const teacherArray: ITeacher[] = teachers as ITeacher[];
                this.schoolModel.SelectedTeacherToRemove$ = of(teacherArray[$("#teacherSelect").prop("selectedIndex")]);
           }
        ).unsubscribe();
    }

    OnRemoveTeacher(ev) {

        this.schoolModel.SelectedTeacherToRemove$.subscribe(
            (teacher) => {
                this.schoolModel.RemoveTeacher(teacher);
            }
        ).unsubscribe();

        // If the selected teacher in the Teacher Assignments component is
        // the same as the teacher that was removed then update the choice
        // of selection in the Teacher Assignments component.
        this.schoolModel.SelectedTeacherToRemove$.subscribe(
            (selectedTeacherToRemove) => {
                this.schoolModel.SelectedTeacherForAssignment$.subscribe(
                    (selectedTeacherForAssignment) => {
                        if (selectedTeacherToRemove == selectedTeacherForAssignment) {
                            this.schoolModel.SelectedTeacherForAssignment$ = of();
                        }
                    }
                ).unsubscribe();
            }
        ).unsubscribe();

        this.schoolModel.SelectedTeacherToRemove$ = of();
    }
}
