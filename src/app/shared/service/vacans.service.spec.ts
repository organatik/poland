import { TestBed, inject } from '@angular/core/testing';

import { VacansService } from './vacans.service';

describe('VacansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacansService]
    });
  });

  it('should be created', inject([VacansService], (service: VacansService) => {
    expect(service).toBeTruthy();
  }));
});
