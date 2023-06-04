import { TestBed } from '@angular/core/testing';

import { SmartContractService } from './smart-contract.service';

describe('ContractService', () => {
  let service: SmartContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
