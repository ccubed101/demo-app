import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { ngrxDemoReducer } from '../../ngrx/NgrxDemo.reducers';

import { AddRemoveStudentComponent } from './AddRemoveStudent.component';

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
        declarations: [ AddRemoveStudentComponent ]
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
