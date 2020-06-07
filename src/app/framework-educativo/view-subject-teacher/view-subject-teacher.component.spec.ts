import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubjectTeacherComponent } from './view-subject-teacher.component';

describe('ViewSubjectTeacherComponent', () => {
  let component: ViewSubjectTeacherComponent;
  let fixture: ComponentFixture<ViewSubjectTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubjectTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubjectTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
