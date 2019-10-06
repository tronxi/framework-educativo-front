import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageStudentComponent } from './homepage-student.component';

describe('HomepageStudentComponent', () => {
  let component: HomepageStudentComponent;
  let fixture: ComponentFixture<HomepageStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
