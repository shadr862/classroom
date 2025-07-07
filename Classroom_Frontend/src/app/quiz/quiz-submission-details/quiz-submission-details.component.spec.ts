import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSubmissionDetailsComponent } from './quiz-submission-details.component';

describe('QuizSubmissionDetailsComponent', () => {
  let component: QuizSubmissionDetailsComponent;
  let fixture: ComponentFixture<QuizSubmissionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSubmissionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSubmissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
