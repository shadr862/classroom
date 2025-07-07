import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly api = 'https://localhost:7240/api/Comment';
  private refreshNeeded = new Subject<void>();

  triggerRefresh()
  {
    this.refreshNeeded.next()
  }

  RefresshOn()
  {
     return this.refreshNeeded.asObservable();
  }

  constructor(private http: HttpClient) { }

  addComment(comment: any) {
    return this.http.post(`${this.api}`, comment);
  }

  getAssignmentComments(assignmentId: string) {
    return this.http.get<any>(`${this.api}/assignment/${assignmentId}`);
  }

  getAnnouncementComments(announcementId: string) {
    return this.http.get<any>(`${this.api}/announcement/${announcementId}`);
  }

  deleteComment(id: string) {
    return this.http.delete(`${this.api}/${id}`)
  }

}
