import { TestBed, async, inject } from '@angular/core/testing';

import { TeacherOrAdminGuard } from './teacher-or-admin.guard';

describe('TeacherOrAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherOrAdminGuard]
    });
  });

  it('should ...', inject([TeacherOrAdminGuard], (guard: TeacherOrAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
