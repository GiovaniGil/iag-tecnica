import { TestBed, inject } from '@angular/core/testing';

import { IndicadorServiceService } from './indicador-service.service';

describe('IndicadorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicadorServiceService]
    });
  });

  it('should be created', inject([IndicadorServiceService], (service: IndicadorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
