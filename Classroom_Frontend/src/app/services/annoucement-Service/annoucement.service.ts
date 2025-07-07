import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnoucementService {
  private readonly api = 'https://localhost:7240/api/announcements';
  constructor(private http:HttpClient) { }

  createAnnouncement(announcement: any) {
    return this.http.post<any>(`${this.api}`, announcement);
  }
  getAnnouncementsByClassroomId(classroomId: string) {
    return this.http.get<any>(`${this.api}/classId/${classroomId}`);
  }

  updateAnnouncement(id:any,announcement:any)
  {
     return this.http.put<any>(`${this.api}/${id}`,announcement)
  }

  deleteAnnouncement(id:any)
  {
    return this.http.delete(`${this.api}/${id}`)
  }
}
