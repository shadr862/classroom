import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  readonly apiUrl = 'https://localhost:7240/api/classroom-details';

  constructor(private http:HttpClient) { }

  getStreamDetails(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
