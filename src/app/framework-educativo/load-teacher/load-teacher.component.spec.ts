import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTeacherComponent } from './load-teacher.component';

describe('LoadTeacherComponent', () => {
  let component: LoadTeacherComponent;
  let fixture: ComponentFixture<LoadTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
