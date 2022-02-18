import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { ngrxDemoReducer } from '../../ngrx/NgrxDemo.reducers';

import { TeacherAssignmentsComponent } from './TeacherAssignments.component';

describe('TeacherAssignmentsComponent (NgrxDemo)', () => {
    let component: TeacherAssignmentsComponent;
    let fixture: ComponentFixture<TeacherAssignmentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('NgrxDemo', ngrxDemoReducer),
            ],
            declarations: [ TeacherAssignmentsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeacherAssignmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
