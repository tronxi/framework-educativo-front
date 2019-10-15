import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadUserComponent } from './load-user.component';

describe('LoadTeacherComponent', () => {
  let component: LoadUserComponent;
  let fixture: ComponentFixture<LoadUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
