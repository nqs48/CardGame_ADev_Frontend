/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GamerService } from './gamer.service';

describe('Service: CreateUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamerService]
    });
  });

  it('should ...', inject([GamerService], (service: GamerService) => {
    expect(service).toBeTruthy();
  }));
});
