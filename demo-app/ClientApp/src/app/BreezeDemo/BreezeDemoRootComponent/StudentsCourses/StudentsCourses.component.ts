import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, of, pipe } from 'rxjs';
import { filter, map, tap, switchMap, take } from 'rxjs/operators'

import { SchoolModel } from '../../School.model';
import { ICourse } from '../../Course'
import { IStudent } from '../../Student'
import { IEnrollment } from '../../Enrollment'
import { ITeacher } from '../../Teacher'

@Component({
    selector: 'StudentsCourses',
    template: `
        <div align="center" style="margin: 1em">
            <table>
                <tr>
                    <th style="padding: 1em">
                        Students
                    </th>
                    <th style="padding: 1em">
                        Courses
                    </th>
                    <th style="padding: 1em">
                        Teachers
                    </th>
                </tr>
                <tr>
                    <td style="padding: 1em">
                        <select size="10" (change)="OnChange($event)">
                            <option *ngFor="let student of Students | async" value="{{student.id}}">{{ student.firstName + ' ' + student.lastName }}</option>
                        </select>
                    </td>
                    <td style="padding: 1em">
                        <select size="10">
                            <option *ngFor="let studentEnrollment of StudentEnrollments | async">{{ studentEnrollment.course.Title }}</option>
                        </select>
                    </td>
                    <td style="padding: 1em">
                        <select size="10">
                            <option *ngFor="let teacher of Teachers | async">{{ teacher.firstName + ' ' + teacher.lastName }}</option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>
    `,
})
export class StudentsCoursesComponent implements OnInit {

    constructor(
        private schoolModel: SchoolModel,
    ) {
    }


    // Property Accessors

    get Students(): Observable<IStudent[]> {
        return this.schoolModel.Students;
    }

    get StudentEnrollments(): Observable<IEnrollment[]> {
        return this.schoolModel.StudentEnrollments;
    }

    get Teachers(): Observable<ITeacher[]> {
        return this.schoolModel.Teachers
    }


   // Life cycle methods

    ngOnInit() {
    }

    OnChange(ev) {
        this.schoolModel.CurrentlySelectedStudent = Number(ev.target.value);
        this.schoolModel.UpdateStudentEnrollments();
    }

}
