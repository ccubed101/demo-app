import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { ngrxDemoReducer } from '../../../NgrxDemo/ngrx/NgrxDemo.reducers';

import { StudentEnrollmentsComponent } from './StudentEnrollments.component';

import { SchoolModel } from '../../School.model';

describe('StudentEnrollmentsComponent', () => {
    let component: StudentEnrollmentsComponent;
    let fixture: ComponentFixture<StudentEnrollmentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('NgrxDemo', ngrxDemoReducer),
            ],
            declarations: [ StudentEnrollmentsComponent ],
            providers: [
                { provide: SchoolModel, useValue: jasmine.createSpy('SchoolModel') }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentEnrollmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
