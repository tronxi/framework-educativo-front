import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAdminComponent } from './homepage-admin.component';

describe('HomepageAdminComponent', () => {
  let component: HomepageAdminComponent;
  let fixture: ComponentFixture<HomepageAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
