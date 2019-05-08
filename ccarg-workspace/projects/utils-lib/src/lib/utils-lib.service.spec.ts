import { TestBed } from '@angular/core/testing';

import { UtilsLibService } from './utils-lib.service';

describe('UtilsLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilsLibService = TestBed.get(UtilsLibService);
    expect(service).toBeTruthy();
  });
});
