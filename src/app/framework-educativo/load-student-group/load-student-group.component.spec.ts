import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadStudentGroupComponent } from './load-student-group.component';

describe('LoadUserComponent', () => {
  let component: LoadStudentGroupComponent;
  let fixture: ComponentFixture<LoadStudentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadStudentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadStudentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
