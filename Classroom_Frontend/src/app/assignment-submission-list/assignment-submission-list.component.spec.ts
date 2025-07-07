import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmissionListComponent } from './assignment-submission-list.component';

describe('AssignmentSubmissionListComponent', () => {
  let component: AssignmentSubmissionListComponent;
  let fixture: ComponentFixture<AssignmentSubmissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentSubmissionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentSubmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
