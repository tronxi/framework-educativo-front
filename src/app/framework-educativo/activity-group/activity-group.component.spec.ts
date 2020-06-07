import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityGroupComponent } from './activity-group.component';

describe('ActivityGroupComponent', () => {
  let component: ActivityGroupComponent;
  let fixture: ComponentFixture<ActivityGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
