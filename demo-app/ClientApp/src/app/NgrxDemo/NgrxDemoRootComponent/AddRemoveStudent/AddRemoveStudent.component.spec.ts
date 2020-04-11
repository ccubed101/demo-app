import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveStudentComponent } from './AddRemoveStudent.component';

describe('AddRemoveStudentComponent', () => {
  let component: AddRemoveStudentComponent;
  let fixture: ComponentFixture<AddRemoveStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
