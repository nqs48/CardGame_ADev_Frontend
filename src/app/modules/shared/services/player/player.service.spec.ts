/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerService } from './player.service';

describe('Service: CreateUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService],
    });
  });

  it('should ...', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));
});
