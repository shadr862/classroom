import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService {
  private api = 'https://localhost:7240/api/Classroom';
  

  constructor(private http: HttpClient) { }

  getClassroomsByTeacher(teacherId: string) {
    return this.http.get<any>(`${this.api}/by-teacher/${teacherId}`);
  }
  getClassroomById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  createClassroom(data: any) {
    return this.http.post<any>(this.api, data);
  }

  deleteClassroom(id: any): any {
    return this.http.delete(`${this.api}/${id}`)
  }

}
