import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SchoolModel } from '../../School.model';

import { TestDepClass } from '../../TestDepClass';
import { ITestDepObj, testDepObj, TEST_DEP_OBJ } from '../../TestDepObj';

@Component({
    selector: 'courses',
    template: `
        <div style="margin: 1em">
            <div style="text-align: center">
                Course
            </div>
		    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
			    <table align="center" border="6px line black" style="border-spacing: 10px; border-collapse: separate">
				    <tr>
					    <td>Title:</td>
					    <td>
						    <input type="text" formControlName="title"/>
					    </td>
				    </tr>
				    <tr>
					    <td>Credits:</td>
					    <td>
						    <input type="number" formControlName="credits" max="4" min="1"/>
					    </td>
				    </tr>
			    </table>
			    <div style="text-align: center; margin-top: 1em">
				    <button type="submit" [disabled]="!formGroup.valid" style="margin-left: 0.5em; margin-right: 0.5em" [style.opacity]="formGroup.valid ? 1: 0.33">Submit</button>
			    </div>
		    </form>
        </div>
    `,
    //providers: [
    //    TestDepClass,
    //    { provide: TEST_DEP_OBJ, useValue: <ITestDepObj>testDepObj },
    //]
})
export class CoursesComponent implements OnInit {

    constructor(
        private schoolModel: SchoolModel,
        @Inject(TestDepClass) testDepClass: TestDepClass,
        @Inject(TEST_DEP_OBJ) testDepObj: ITestDepObj
    ) {
    }


   // Life cycle methods

    ngOnInit() {
    }


    // Form

    formGroup: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required]),
        credits: new FormControl(null, [Validators.required, Validators.max(4), Validators.min(1)]),
    });


    // UI event handlers.

    onSubmit() {
        this.schoolModel.AddCourse(
            this.formGroup.controls['title'].value,
            this.formGroup.controls['credits'].value,
        );
    }

}
