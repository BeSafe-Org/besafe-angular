import { TestBed } from '@angular/core/testing';

import { BesafeGlobalService } from './besafe-global.service';

describe('BesafeGlobalService', () => {
  let service: BesafeGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BesafeGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
