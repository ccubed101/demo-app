import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsTreeComponent } from './MaterialsTree.component';

describe('MaterialsTreeComponent', () => {
  let component: MaterialsTreeComponent;
  let fixture: ComponentFixture<MaterialsTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
