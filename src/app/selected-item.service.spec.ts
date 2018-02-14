import { TestBed, inject } from '@angular/core/testing';

import { SelectedItemService } from './selected-item.service';

describe('SelectedItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedItemService]
    });
  });

  it('should be created', inject([SelectedItemService], (service: SelectedItemService) => {
    expect(service).toBeTruthy();
  }));
});
