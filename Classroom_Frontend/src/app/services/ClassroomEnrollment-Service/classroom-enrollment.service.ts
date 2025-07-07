import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassroomEnrollmentService {
  readonly apiUrl = 'https://localhost:7240/api/Enrollment';

  constructor(private http:HttpClient) { }

  joinClassWithCode(accessCode: string, studentId: string) {

    const url = `${this.apiUrl}/join/${accessCode}`;
    const params = new HttpParams().set('studentId', studentId);

    return this.http.post<any>(url, null, { params });
  }

  getEnrolledClasses(studentId: string) {
    return this.http.get<any>(`${this.apiUrl}/student/${studentId}`);
  }

  unenrollFromClass(classId: string, studentId: string) {
    const params = new HttpParams().set('studentId', studentId);
    return this.http.delete(`${this.apiUrl}/unenroll/${classId}`, { params });
  }

  getEnrolledStudents(classId: string) {
    return this.http.get<any>(`${this.apiUrl}/students-by-class/${classId}`);
  }
}
