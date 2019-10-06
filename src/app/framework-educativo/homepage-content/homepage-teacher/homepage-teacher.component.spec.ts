import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTeacherComponent } from './homepage-teacher.component';

describe('HomepageTeacherComponent', () => {
  let component: HomepageTeacherComponent;
  let fixture: ComponentFixture<HomepageTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
