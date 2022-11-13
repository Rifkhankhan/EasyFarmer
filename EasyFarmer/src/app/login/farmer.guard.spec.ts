import { TestBed } from '@angular/core/testing';

import { FarmerGuard } from './farmer.guard';

describe('FarmerGuard', () => {
  let guard: FarmerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FarmerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
