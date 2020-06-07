import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailStudentComponent } from './activity-detail-student.component';

describe('ActivityDetailStudentComponent', () => {
  let component: ActivityDetailStudentComponent;
  let fixture: ComponentFixture<ActivityDetailStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDetailStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDetailStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
