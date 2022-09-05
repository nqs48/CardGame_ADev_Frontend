import { TestBed } from '@angular/core/testing';

import { JugadoresFakeService } from './jugadores-fake.service';

describe('JugadoresFakeService', () => {
  let service: JugadoresFakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadoresFakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
