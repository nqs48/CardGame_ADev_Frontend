/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateGameService } from './createGame.service';

describe('Service: CreateGame', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateGameService]
    });
  });

  it('should ...', inject([CreateGameService], (service: CreateGameService) => {
    expect(service).toBeTruthy();
  }));
});
