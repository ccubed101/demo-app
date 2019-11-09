import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { UnitOfWork } from '../../UnitOfWork';
import { ICourse } from '../../Course'
import { IStudent } from '../../Student'

import { SchoolModel } from '../../School.model';

@Component({
    selector: 'enrollments',
    template: `
        <div style="margin: 1em">
            <div style="text-align: center">
                Enrollments
            </div>
		    <form [formGroup]="enrollment" (ngSubmit)="onSubmit()">
			    <table align="center" border="6px line black" style="border-spacing: 10px; border-collapse: separate">
				    <tr>
					    <td>Course:</td>
					    <td>
						    <select formControlName="courses" (change)="OnChangeCourse($event)">
                                <option value="" disabled>Choose a course</option>
                                <option *ngFor="let course of Courses | async" [ngValue]="course">{{ course.Title }}</option>
                            </select>
					    </td>
				    </tr>
				    <tr>
					    <td>Student:</td>
					    <td>
						    <select formControlName="students" (change)="OnChangeStudent($event)">
                                <option value="" disabled>Choose a student</option>
                                <option *ngFor="let student of Students | async" [ngValue]="student">{{ student.firstName + ' ' + student.lastName }}</option>
                            </select>
					    </td>
				    </tr>
			    </table>
			    <div style="text-align: center; margin-top: 1em">
				    <button type="submit" [disabled]="!enrollment.valid" style="margin-left: 0.5em; margin-right: 0.5em" [style.opacity]="enrollment.valid ? 1: 0.33">Submit</button>
			    </div>
		    </form>
        </div>
    `,
    //providers: [
    //    TestDepClass,
    //    { provide: TEST_DEP_OBJ, useValue: <ITestDepObj>testDepObj },
    //]
})
export class EnrollmentsComponent implements OnInit {

    constructor(
        private schoolModel: SchoolModel,
    ) {
    }


    // Instance variables.
    selectedCourse: ICourse = null;
    selectedStudent: IStudent = null;


   // Life cycle methods

    ngOnInit() {
    }


    // Property Accessors

    get Students(): Observable<IStudent[]> {
        return this.schoolModel.Students;
    }

    get Courses(): Observable<ICourse[]> {
        return this.schoolModel.Courses;
    }


    // Form

    enrollment: FormGroup = new FormGroup({
        students: new FormControl(null, [Validators.required]),
        courses: new FormControl(null, [Validators.required]),
    });

    onSubmit() {
        console.log('onSubmit');
        this.schoolModel.AddEnrollment(
            this.selectedCourse,
            this.selectedStudent,
            0
        );
        this.schoolModel.UpdateStudentEnrollments();
    }

    OnChangeCourse(ev) {
        this.selectedCourse = this.enrollment.get("courses").value;
   }

    OnChangeStudent(ev) {
        this.selectedStudent = this.enrollment.get("students").value;
   }
}
