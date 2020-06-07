import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityViewStudentComponent } from './activity-view-student.component';

describe('ActivityViewStudentComponent', () => {
  let component: ActivityViewStudentComponent;
  let fixture: ComponentFixture<ActivityViewStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityViewStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityViewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
