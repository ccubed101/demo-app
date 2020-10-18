import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Observable, of, pipe } from 'rxjs';

import { ICourse } from '../../Course'
import { SchoolModel } from '../../School.model';

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
                            <select id="courseSelect" size="8" (change)="OnChangeCourse($event)" #courseSelect style="min-width: 10em">
                                <option *ngFor="let course of Courses$ | async" [value]="course.id">{{ course.Title }}</option>
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
				            <button type="button" (click)="OnRemoveCourse($event)" [disabled]="(SelectedCourseToRemove$ | async) == null" [style.opacity]="((SelectedCourseToRemove$ | async) != null) ? 1: 0.33">Remove Course</button>
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
        private schoolModel: SchoolModel,
    ) {
    }


    // Property accessors

    get Courses$(): Observable<ICourse[]> {
        return this.schoolModel.Courses$;
    }

    get SelectedCourseToRemove$(): Observable<ICourse> {
        return this.schoolModel.SelectedCourseToRemove$
    }


    // Life cycle methods

    ngOnInit() {
        // Make the height of the select element where the course to remove is selected equal to
        // the height of the table where the course information is entered.
        $("#selectDiv").height($("#formTable").outerHeight());
        //$("#selectCourse").height($("#formTable").outerHeight());
    }

    // Form

    formGroup: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required]),
        credits: new FormControl(null, [Validators.required]),
    });


    // UI event handlers.

    onSubmit() {
        this.schoolModel.AddCourse(
            this.formGroup.controls['title'].value,
            this.formGroup.controls['credits'].value
        );
    }

    OnChangeCourse(ev) {
        this.schoolModel.Courses$.subscribe(
            (courses) => {
                let coursestArray: ICourse[] = courses as ICourse[];
                this.schoolModel.SelectedCourseToRemove$ = of(coursestArray[$("#courseSelect").prop("selectedIndex")]);
            }
        ).unsubscribe();
    }

    OnRemoveCourse(ev) {
        this.schoolModel.SelectedCourseToRemove$.subscribe(
            (course) => {
                this.schoolModel.RemoveCourse(course);
            }
        ).unsubscribe();

        this.schoolModel.SelectedCourseToRemove$ = of();
    }
}
