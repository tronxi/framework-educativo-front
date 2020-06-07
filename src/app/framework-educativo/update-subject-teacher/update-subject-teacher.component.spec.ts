import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubjectTeacherComponent } from './update-subject-teacher.component';

describe('UpdateSubjectTeacherComponent', () => {
  let component: UpdateSubjectTeacherComponent;
  let fixture: ComponentFixture<UpdateSubjectTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSubjectTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubjectTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
