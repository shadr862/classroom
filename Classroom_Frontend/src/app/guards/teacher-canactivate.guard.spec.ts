import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teacherCanactivateGuard } from './teacher-canactivate.guard';

describe('teacherCanactivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teacherCanactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
