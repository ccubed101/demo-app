import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { ngrxDemoReducer } from '../../../NgrxDemo/ngrx/NgrxDemo.reducers';

import { AddRemoveStudentComponent } from './AddRemoveStudent.component';

import { SchoolModel } from '../../School.model';

describe('AddRemoveStudentComponent', () => {
  let component: AddRemoveStudentComponent;
  let fixture: ComponentFixture<AddRemoveStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
            StoreModule.forRoot({}),
            StoreModule.forFeature('NgrxDemo', ngrxDemoReducer),
        ],
        declarations: [ AddRemoveStudentComponent ],
        providers: [
            { provide: SchoolModel, useValue: jasmine.createSpy('SchoolModel') }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
