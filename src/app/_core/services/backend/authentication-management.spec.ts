import { TestBed } from '@angular/core/testing';

import { AuthenticationManagementService } from './authentication-management';

describe('AuthenticationManagementService', () => {
  let service: AuthenticationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
