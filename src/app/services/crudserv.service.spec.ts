import { TestBed } from '@angular/core/testing';

import { CrudservService } from './crudserv.service';

describe('CrudservService', () => {
  let service: CrudservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
