import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz-Service/quiz.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-submission-view',
  imports: [CommonModule,RouterModule],
  templateUrl: './teacher-submission-view.component.html',
  styleUrl: './teacher-submission-view.component.scss'
})
export class TeacherSubmissionViewComponent {
  submissions: any[] = [];
  quizId: string = ''; // ← Set this based on route or input
  classId:string='';

  constructor(private quizService: QuizService,
    private route:ActivatedRoute ) {}

  ngOnInit(): void {
    this.classId=this.route.snapshot.paramMap.get('classId')!;
    this.quizId=this.route.snapshot.paramMap.get('quizId')!;
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
