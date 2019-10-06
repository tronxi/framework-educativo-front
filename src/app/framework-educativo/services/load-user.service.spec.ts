import { TestBed } from '@angular/core/testing';

import { LoadUserService } from './load-user.service';

describe('LoadUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadUserService = TestBed.get(LoadUserService);
    expect(service).toBeTruthy();
  });
});
