import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { studentCanactiveGuard } from './student-canactive.guard';

describe('studentCanactiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => studentCanactiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
