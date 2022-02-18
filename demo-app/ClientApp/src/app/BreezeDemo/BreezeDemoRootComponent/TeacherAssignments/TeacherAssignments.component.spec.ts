import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { ngrxDemoReducer } from '../../../NgrxDemo/ngrx/NgrxDemo.reducers';

import { TeacherAssignmentsComponent } from './TeacherAssignments.component';

import { SchoolModel } from '../../School.model';

describe('TeacherAssignmentsComponent', () => {
    let component: TeacherAssignmentsComponent;
    let fixture: ComponentFixture<TeacherAssignmentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('NgrxDemo', ngrxDemoReducer),
            ],
            declarations: [ TeacherAssignmentsComponent ],
            providers: [
                { provide: SchoolModel, useValue: jasmine.createSpy('SchoolModel') }
            ]
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
