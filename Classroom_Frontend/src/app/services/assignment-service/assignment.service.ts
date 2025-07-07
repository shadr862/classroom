import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private readonly api = 'https://localhost:7240/api/Assignment';
  private readonly api1 = 'https://localhost:7240/api/AssignmentSubmission';

  constructor(private http: HttpClient) { }

  createAssignment(assignment: any) {
    return this.http.post<any>(`${this.api}`, assignment);
  }

  getAssignmentsByClassroomId(classroomId: string) {
    return this.http.get<any>(`${this.api}/classId/${classroomId}`);
  }
  updateAssignment(id: any, assignment: any) {
    return this.http.put<any>(`${this.api}/${id}`, assignment)
  }
  deleteAssignment(id: any) {
    return this.http.delete(`${this.api}/${id}`)
  }


  //submission
  uploadAssignmentPdf(formData: FormData) {
    return this.http.post<any>(`${this.api1}`, formData);
  }

  getSubmissionFileByAssignmentAndStudent(assignmentId: string, studentId: string) {
    return this.http.get(
      `${this.api1}/file/${assignmentId}/${studentId}`,
      { responseType: 'blob' }
    );
  }

  getSubmissionsByAssignmentId(id: any) {
    return this.http.get<any>(`${this.api1}/assignment/${id}/submissions-with-user`)
  }

  resetSubmission(submissionId: string) {
    return this.http.delete(`${this.api1}/${submissionId}`);
  }




}
