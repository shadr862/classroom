import { TestBed } from '@angular/core/testing';

import { ClassroomEnrollmentService } from './classroom-enrollment.service';

describe('ClassroomEnrollmentService', () => {
  let service: ClassroomEnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomEnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
