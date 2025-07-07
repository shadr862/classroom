import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentDto } from './comment.model';
import { CommentService } from '../services/comment-Service/comment.service';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule,FormsModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent {
  @Input() assignmentId?: string;
  @Input() announcementId?: string;
  @Input() userId!: string;
  @Input() userName!: string;

  comments: CommentDto[] = [];
  newComment: string = '';

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (this.assignmentId) {
      this.commentService.getAssignmentComments(this.assignmentId).subscribe(data => {
        this.comments = data;
      });
    } else if (this.announcementId) {
      this.commentService.getAnnouncementComments(this.announcementId).subscribe(data => {
        this.comments = data;
      });
    }
  }

  postComment(): void {
    if (!this.newComment.trim()) return;

    const payload: CommentDto = {
      userId: this.userId,
      assignmentId: this.assignmentId,
      announcementId: this.announcementId,
      name: this.userName,
      content: this.newComment,
      createdAt: new Date().toISOString()
    };

    this.commentService.addComment(payload).subscribe(() => {
      this.newComment = '';
      this.loadComments();
    });
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.loadComments();
      this.commentService.triggerRefresh();
    });
  
}

}
