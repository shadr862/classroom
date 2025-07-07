import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizDetailComponent } from './student-quiz-detail.component';

describe('StudentQuizDetailComponent', () => {
  let component: StudentQuizDetailComponent;
  let fixture: ComponentFixture<StudentQuizDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentQuizDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentQuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
