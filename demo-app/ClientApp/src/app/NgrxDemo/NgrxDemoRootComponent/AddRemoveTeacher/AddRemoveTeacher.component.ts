import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Store, select } from '@ngrx/store';

import { NgrxDemoState, Teacher } from '../../ngrx/interfaces';
import { addTeacher, removeTeacher, setSelectedTeacherForAssignment, setSelectedTeacherToRemove } from '../../ngrx/NgrxDemo.actions';
import { initialState } from '../../ngrx/NgrxDemo.reducers';
import { getTeachers, getSelectedTeacherToRemove, getSelectedTeacherForAssignment } from '../../ngrx/NgrxDemo.selectors';

import { Observable, of, pipe } from 'rxjs';

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
					            <td class="formLabel">ID:</td>
					            <td>
						            <input type="number" formControlName="id"/>
					            </td>
				            </tr>
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
                            <select id="teacherSelector" size="8" (change)="OnChangeTeacher($event)" #teacherSelector style="min-width: 10em">
                                <option *ngFor="let teacher of Teachers | async" [value]="teacher.id">{{ teacher.firstName + ' ' + teacher.lastName }}</option>
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
				            <button type="button" (click)="OnRemoveTeacher($event)" [disabled]="(selectedTeacherToRemove$ | async) == null" [style.opacity]="((selectedTeacherToRemove$ | async) != null) ? 1: 0.33">Remove Teacher</button>
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
        this.teachers$ = store.pipe(select('NgrxDemo', 'teachers'));
        this.selectedTeacherToRemove$ = store.pipe(select(getSelectedTeacherToRemove));
    }


    // Instance variables

    teachers$: Observable<Teacher[]>;
    selectedTeacherToRemove$: Observable<Teacher>;


    // Life cycle methods

    ngOnInit() {
        // Make the height of the select element where the course to remove is selected equal to
        // the height of the table where the course information is entered.
        $("#selectDiv").height($("#formTable").outerHeight());
        //$("#selectCourse").height($("#formTable").outerHeight());
   }


    // Property accessors

    get Teachers(): Observable<Teacher[]> {
        return this.teachers$;
    }

    // Form

    formGroup: FormGroup = new FormGroup({
        id: new FormControl(null, [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
    });


    // UI event handlers.

    onSubmit() {
        let teacherToAdd: Teacher = {
            id: this.formGroup.controls['id'].value,
            firstName: this.formGroup.controls['firstName'].value,
            lastName: this.formGroup.controls['lastName'].value
        };
        this.store.dispatch(addTeacher({ teacherToAdd }));
    }

    OnChangeTeacher(ev) {
        let teachers$: Observable<Teacher[]> = this.store.pipe(select(getTeachers));
        teachers$.subscribe(
            (teachers) => {
                let teacherArray: Teacher[] = teachers as Teacher[];
                this.store.dispatch(setSelectedTeacherToRemove({ selectedTeacher: teacherArray[$("#teacherSelector").prop("selectedIndex")] }));
            }
        ).unsubscribe();
    }

    OnRemoveTeacher(ev) {

        let selectedTeacherToRemove$: Observable<any> = this.store.pipe(select(getSelectedTeacherToRemove));
        selectedTeacherToRemove$.subscribe(
            (teacher) => {
                this.store.dispatch(removeTeacher({ teacherToRemove: teacher }));
            }
        ).unsubscribe();

        // If the selected teacher in the Teacher Assignments component is
        // the same as the teacher that was removed then update the choice
        // of selection in the Teacher Assignments component.
        selectedTeacherToRemove$.subscribe(
            (selectedTeacherToRemove) => {
                let selectedTeacherForAssignment$: Observable<Teacher> = this.store.pipe(select(getSelectedTeacherForAssignment));
                selectedTeacherForAssignment$.subscribe(
                    (selectedTeacherForAssignment) => {
                        if (selectedTeacherToRemove == selectedTeacherForAssignment) {
                            this.store.dispatch(setSelectedTeacherForAssignment({ selectedTeacher: null }));
                        }
                    }
                ).unsubscribe();
            }
        ).unsubscribe();

        this.store.dispatch(setSelectedTeacherToRemove({ selectedTeacher: null }));
    }
}
