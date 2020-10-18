import { Component } from '@angular/core';

import { UnitOfWork } from '../UnitOfWork'
import { SchoolModel } from '../School.model'


@Component({
    selector: 'breeze-demo',
    template: `
		<div class="title">
			Breeze Demo
        </div>

        <div class="grid-container">
            <div class="item1">
                <AddRemoveTeacher></AddRemoveTeacher>
            </div>
            <div class="item2">
                <AddRemoveCourse></AddRemoveCourse>
           </div>
            <div class="item3">
                 <AddRemoveStudent></AddRemoveStudent>
            </div>  
            <div class="item4">
                 <TeacherAssignments></TeacherAssignments>
            </div>
            <div class="item5">
                <StudentEnrollments></StudentEnrollments>
            </div>
        </div>
        <div style="text-align: center; margin-top: 1em">
            <button type="button" (click)="OnLoad()" style="margin: 1em" [disabled]="HaveMetadata == false" [style.opacity]="(HaveMetadata) ? 1: 0.33">Load</button>
            <button type="button" (click)="OnSave()" style="margin: 1em">Save</button>
        </div>
    `,
    styles: [
        ".title { text-align: center; font-size: xx-large; margin-top: 0.5em }",
        "                                                       \
        .item1 { grid-area: add-remove-teacher; }               \
        .item2 { grid-area: add-remove-course; }                \
        .item3 { grid-area: add-remove-student; }               \
        .item4 { grid-area: teacher-assignments; }              \
        .item5 { grid-area: student-enrollments; }              \
                                                                \
        .grid-container {                                       \
            display: grid;                                      \
            justify-content: stretch;                           \
            align-content: stretch;                             \
            justify-items: stretch;                             \
            align-items: stretch;                               \
            grid-template-areas:                                \
                'add-remove-teacher add-remove-teacher add-remove-course add-remove-course add-remove-student add-remove-student'   \
                'teacher-assignments teacher-assignments teacher-assignments student-enrollments student-enrollments student-enrollments';                                    \
            grid-gap: 0.75em;                                     \
            background-color: #2196F3;                          \
            padding: 0.75em;                                      \
        }                                                       \
                                                                \
        .grid-container > div {                                 \
            background-color: rgba(255, 255, 255, 0.8);         \
            padding: 0.75em 0.75em 0.75em 0.75em;               \
            font-size: 12px;                                    \
            text-align: center;                                 \
        }                                                       \
        "
    ],
})
export class BreezeDemoRootComponent {

    // Construction.

    constructor(
        private unitOfWork: UnitOfWork,
        private schoolModel: SchoolModel,
    ) {

    }


    // Property accessors.

    get HaveMetadata(): boolean {
        return this.schoolModel.HaveMetadata;
    }
    set HaveMetadata(haveMetadata: boolean) {
        this.schoolModel.HaveMetadata = haveMetadata;
    }



    // Methods

    OnLoad() {
        this.schoolModel.Load();
    }

    OnSave() {
        this.unitOfWork.SaveChanges();
    }

}


