import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz-Service/quiz.service';

@Component({
  selector: 'app-teacher-submission-view',
  imports: [CommonModule],
  templateUrl: './teacher-submission-view.component.html',
  styleUrl: './teacher-submission-view.component.scss'
})
export class TeacherSubmissionViewComponent {
    submissions: any[] = [];
  quizId: string = ''; // ← Set this based on route or input

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    // Example quizId setup (replace with ActivatedRoute if needed)
    this.quizId = 'c54c8c52-1004-435f-b1ce-d1a2bacc09f4';
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    this.quizService.getSubmissionListByQuizId(this.quizId).subscribe({
      next: (res) => this.submissions = res,
      error: (err) => console.error('Error loading submissions:', err)
    });
  }

  deleteSubmission(submissionId: string): void {
    if (confirm('Are you sure you want to reset this submission?')) {
      this.quizService.deleteQuizSubmission(submissionId).subscribe({
        next: () => {
          this.submissions = this.submissions.filter(s => s.submissionId !== submissionId);
        },
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }
}
