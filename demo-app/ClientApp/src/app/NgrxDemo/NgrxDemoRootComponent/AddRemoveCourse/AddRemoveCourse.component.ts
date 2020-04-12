import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Store, select } from '@ngrx/store';

import { NgrxDemoState, Course } from '../../ngrx/interfaces';
import { addCourse, removeCourse, setSelectedCourseToRemove } from '../../ngrx/NgrxDemo.actions';
import { getCourses, getSelectedCourseToRemove } from '../../ngrx/NgrxDemo.selectors';

import { Observable, of, pipe } from 'rxjs';

import * as $ from 'jquery'

@Component({
  selector: 'AddRemoveCourse',
    template: `
        <div class="header">
            Add/Remove Course
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
					            <td class="formLabel">Title:</td>
					            <td>
						            <input type="text" formControlName="title"/>
					            </td>
				            </tr>
				            <tr>
					            <td class="formLabel">Credits:</td>
					            <td>
						            <input type="number" formControlName="credits"/>
					            </td>
				            </tr>
			            </table>
                    </td>
                    <td class="selectTableCell">
                        <div id="selectDiv" style="overflow: hidden">
                            <select id="courseSelect" size="8" (change)="OnChangeCourse($event)" #courseSelector style="min-width: 10em">
                                <option *ngFor="let course of Courses | async" [value]="course.id">{{ course.title }}</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
 			            <div style="text-align: center; margin-top: 1em">
				            <button type="submit" [disabled]="!formGroup.valid" style="margin-left: 0.5em; margin-right: 0.5em" [style.opacity]="formGroup.valid ? 1: 0.33">Add Course</button>
			            </div>
                    </td>
                    <td>
  			            <div style="text-align: center; margin-top: 1em">
				            <button type="button" (click)="OnRemoveCourse($event)" [disabled]="(selectedCourseToRemove$ | async) == null" [style.opacity]="((selectedCourseToRemove$ | async) != null) ? 1: 0.33">Remove Course</button>
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
export class AddRemoveCourseComponent implements OnInit {

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
        this.courses$ = store.pipe(select(getCourses));
        this.selectedCourseToRemove$ = store.pipe(select(getSelectedCourseToRemove));
    }


    // Instance variables

    courses$: Observable<Course[]>;
    selectedCourseToRemove$: Observable<Course>;


    // Life cycle methods

    ngOnInit() {
        // Make the height of the select element where the course to remove is selected equal to
        // the height of the table where the course information is entered.
        $("#selectDiv").height($("#formTable").outerHeight());
        //$("#selectCourse").height($("#formTable").outerHeight());
    }


    // Property accessors

    get Courses(): Observable<Course[]> {
        return this.courses$;
    }

    // Form

    formGroup: FormGroup = new FormGroup({
        id: new FormControl(null, [Validators.required]),
        title: new FormControl('', [Validators.required]),
        credits: new FormControl(null, [Validators.required]),
    });


    // UI event handlers.

    onSubmit() {
        let courseToAdd: Course = {
            id: this.formGroup.controls['id'].value,
            title: this.formGroup.controls['title'].value,
            credits: this.formGroup.controls['credits'].value
        };
        this.store.dispatch(addCourse({ courseToAdd }));
   }

    OnChangeCourse(ev) {
        let courses$: Observable<Course[]> = this.store.pipe(select(getCourses));
        courses$.subscribe(
            (courses) => {
                let courseArray: Course[] = courses as Course[];
                this.store.dispatch(setSelectedCourseToRemove({ selectedCourse: courseArray[$("#courseSelect").prop("selectedIndex")] }));
            }
        ).unsubscribe();
    }

    OnRemoveCourse(ev) {
        let selectedCourseToRemove$: Observable<any> = this.store.pipe(select(getSelectedCourseToRemove));
        selectedCourseToRemove$.subscribe(
            (course) => {
                this.store.dispatch(removeCourse({ courseToRemove: course }));
            }
        ).unsubscribe();

        this.store.dispatch(setSelectedCourseToRemove({ selectedCourse: null }));
    }
}
