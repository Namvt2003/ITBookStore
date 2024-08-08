import { TestBed } from '@angular/core/testing';

import { FileinputService } from './fileinput.service';

describe('FileinputService', () => {
  let service: FileinputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileinputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
