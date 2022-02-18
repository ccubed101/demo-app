import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { ngrxDemoReducer } from '../../../NgrxDemo/ngrx/NgrxDemo.reducers';

import { AddRemoveTeacherComponent } from './AddRemoveTeacher.component';

import { SchoolModel } from '../../School.model';

describe('AddRemoveTeacherComponent', () => {
    let component: AddRemoveTeacherComponent;
    let fixture: ComponentFixture<AddRemoveTeacherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('NgrxDemo', ngrxDemoReducer),
            ],
            declarations: [ AddRemoveTeacherComponent ],
            providers: [
                { provide: SchoolModel, useValue: jasmine.createSpy('SchoolModel') }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddRemoveTeacherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
