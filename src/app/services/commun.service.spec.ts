import { TestBed } from '@angular/core/testing';

import { CommunService } from './commun.service';

describe('CommunService', () => {
  let service: CommunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
