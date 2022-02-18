import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { ngrxDemoReducer } from '../../../NgrxDemo/ngrx/NgrxDemo.reducers';

import { AddRemoveCourseComponent } from './AddRemoveCourse.component';

import { SchoolModel } from '../../School.model';

describe('AddRemoveCourseComponent', () => {
  let component: AddRemoveCourseComponent;
  let fixture: ComponentFixture<AddRemoveCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
            StoreModule.forRoot({}),
            StoreModule.forFeature('NgrxDemo', ngrxDemoReducer),
        ],
        declarations: [AddRemoveCourseComponent],
        providers: [
            { provide: SchoolModel, useValue: jasmine.createSpy('SchoolModel') }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
