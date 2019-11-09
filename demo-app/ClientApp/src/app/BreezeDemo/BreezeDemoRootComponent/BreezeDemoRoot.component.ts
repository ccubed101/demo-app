import { Component } from '@angular/core';

import { UnitOfWork } from '../UnitOfWork'
import { SchoolModel } from '../School.model'


@Component({
    selector: 'breeze-demo',
	template: `
		<div class="title">
			Breeze Demo
        </div>
        <table style="margin-left: auto; margin-right: auto; margin-top: 1em" border="1">
            <tr>
                <td>
                    <courses></courses>
                </td>
                <td>
                    <students></students>
                </td>
                <td>
                    <enrollments></enrollments>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <StudentsCourses></StudentsCourses>
                </td>
            </tr>
            <tr>
                <td colspan="3" style="text-align: center">
                    <button type="button" (click)="OnLoad()" style="margin: 1em">Load</button>
                    <button type="button" (click)="OnSave()" style="margin: 1em">Save</button>
                </td>
            </tr>
       </table>
	`,
	styles: [
		".title { text-align: center; font-size: xx-large; margin-top: 0.5em }",
	],
})
export class BreezeDemoRootComponent {

    // Construction.

    constructor(
        private unitOfWork: UnitOfWork,
        private schoolModel: SchoolModel,
    ) {

    }


    // Methods

    OnLoad() {
        //this.schoolModel.Load();

        //console.log(this.unitOfWork.Courses.GetAll());
        //console.log(this.unitOfWork.Students.GetAll());
        //console.log(this.unitOfWork.Enrollments.GetAll());

    }

    OnSave() {
        this.unitOfWork.SaveChanges();
    }

}


