import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'https://localhost:7240/api/Quiz';
  private apiUrl2 = 'https://localhost:7240/api/QuizQuestion';
  private apiUrl3 = 'https://localhost:7240/api/QuizSubmission';

  constructor(private http: HttpClient) { }

  //Quiz related methods
  getQuizzesByClassroomId(classroomId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classId/${classroomId}`);
  }

  createQuiz(quizDto: any) {
    return this.http.post<any>(this.apiUrl, quizDto);
  }

  updateQuiz(id: any, quiz: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, quiz);
  }
  
  deleteQuiz(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getQuizzByQuizId(Id: any) {
    return this.http.get<any>(`${this.apiUrl}/${Id}`)
  }

  //Quiz Question related methods
  createQuizQuestion(quizQuestionDto: any) {
    return this.http.post<any>(this.apiUrl2, quizQuestionDto);
  }
  getQuizQuestionById(quizId: string) {
    return this.http.get<any>(`${this.apiUrl2}/QuizId/${quizId}`);
  }
  deleteQuizQuestion(questionId: string) {
    return this.http.delete<any>(`${this.apiUrl2}/${questionId}`);
  }

  //Quiz Submission related methods
  createQuizSubmission(submissionDto: any) {
    return this.http.post<any>(this.apiUrl3, submissionDto);
  }
  getQuizsubmissionbyStudentIdAndQuizId(studentId: string, quizId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/student/${studentId}/quiz/${quizId}`);
  }
  getSubmissionsByStudent(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl3}/student/${studentId}`);
  }

  getSubmissionListByQuizId(quizId: string) {
    return this.http.get<any>(`${this.apiUrl3}/quiz/${quizId}/submissions-with-user`)
  }

  deleteQuizSubmission(id: any) {
    return this.http.delete(`${this.apiUrl3}/${id}`)
  }

}
