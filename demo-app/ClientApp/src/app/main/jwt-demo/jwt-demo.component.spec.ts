import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtDemoComponent } from './jwt-demo.component';

describe('JwtDemoComponent', () => {
  let component: JwtDemoComponent;
  let fixture: ComponentFixture<JwtDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
