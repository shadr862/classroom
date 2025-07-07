import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../services/assignment-service/assignment.service';

@Component({
  selector: 'app-assignment-submission-list',
  imports: [CommonModule],
  templateUrl: './assignment-submission-list.component.html',
  styleUrl: './assignment-submission-list.component.scss'
})
export class AssignmentSubmissionListComponent {

  assignmentId: string = '';
  submissions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('assignmentId')!;
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    this.assignmentService.getSubmissionsByAssignmentId(this.assignmentId)
      .subscribe((data) => {
        this.submissions = data;
      });
  }

  resetSubmission(submissionId: string): void {
    if (confirm('Are you sure you want to reset this submission?')) {
      this.assignmentService.resetSubmission(submissionId).subscribe(() => {
        this.loadSubmissions(); // Refresh list
      });
    }
  }

}
