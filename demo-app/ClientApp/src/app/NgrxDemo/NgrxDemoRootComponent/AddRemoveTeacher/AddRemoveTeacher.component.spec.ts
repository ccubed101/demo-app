import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveTeacherComponent } from './AddRemoveTeacher.component';

describe('AddRemoveTeacherComponent', () => {
  let component: AddRemoveTeacherComponent;
  let fixture: ComponentFixture<AddRemoveTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveTeacherComponent ]
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
