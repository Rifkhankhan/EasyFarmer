import { TestBed } from '@angular/core/testing';

import { AnimalinterventionService } from './animalintervention.service';

describe('AnimalinterventionService', () => {
  let service: AnimalinterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalinterventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
