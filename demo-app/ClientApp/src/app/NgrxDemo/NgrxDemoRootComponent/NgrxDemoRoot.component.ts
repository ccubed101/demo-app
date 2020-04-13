import { Component } from '@angular/core';
import { ActivatedRoute, RouterState, RouterOutlet } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { loadData } from '../ngrx/NgrxDemo.actions';

import { Observable, of } from 'rxjs';


@Component({
    selector: 'ngrx-demo',
	template: `
		<div class="title">
			Ngrx Demo
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
export class NgrxDemoRootComponent {

    // Construction.

    constructor(
        private store: Store<any>
    ) {
    }


    // Life cycle methods

    ngOnInit() {
        console.log("Load the data.");
        this.store.dispatch(loadData());
    }
}


