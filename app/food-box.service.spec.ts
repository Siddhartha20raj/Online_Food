import { TestBed } from '@angular/core/testing';

import { FoodBoxService } from './food-box.service';

describe('FoodBoxService', () => {
  let service: FoodBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
