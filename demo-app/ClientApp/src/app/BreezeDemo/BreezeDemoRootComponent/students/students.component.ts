import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { UnitOfWork } from '../../UnitOfWork'

import { SchoolModel } from '../../School.model'

import { TestDepClass } from '../../TestDepClass'
import { ITestDepObj, testDepObj, TEST_DEP_OBJ } from '../../TestDepObj'

@Component({
  selector: 'students',
  template: `
        <div style="margin: 1em">
            <div style="text-align: center">
                Student
            </div>
		    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
			    <table align="center" border="6px line black" style="border-spacing: 10px; border-collapse: separate">
				    <tr>
					    <td>Frist Name:</td>
					    <td>
						    <input type="text" formControlName="firstName"/>
					    </td>
				    </tr>
				    <tr>
					    <td>Last Name:</td>
					    <td>
						    <input type="text" formControlName="lastName"/>
					    </td>
				    </tr>
				    <tr>
					    <td>Enrollment Date:</td>
					    <td>
						    <input type="date" formControlName="enrollmentDate"/>
					    </td>
				    </tr>
			    </table>
			    <div style="text-align: center; margin-top: 1em">
				    <button type="submit" [disabled]="!formGroup.valid" style="margin-left: 0.5em; margin-right: 0.5em" [style.opacity]="formGroup.valid ? 1: 0.33">Submit</button>
			    </div>
		    </form>
        </div>
  `,
    styles: [],
    //providers: [
    //    TestDepClass,
    //    { provide: TEST_DEP_OBJ, useValue: <ITestDepObj>testDepObj },
    //]
})
export class StudentsComponent implements OnInit {

    constructor(
        private unitOfWork: UnitOfWork,
        private schoolModel: SchoolModel,
        @Inject(TestDepClass) testDepClass: TestDepClass,
        @Inject(TEST_DEP_OBJ) testDepObj: ITestDepObj
    ) {
    }

    ngOnInit() {
    }

    // Form

    formGroup: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
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
}
