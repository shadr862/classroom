import { H } from '@angular/cdk/keycodes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly api = 'https://localhost:7240/api/Users';

  constructor(private http: HttpClient) { }

  signUp(user: any) {
    return this.http.post<any>(`${this.api}/signup`, user);
  }

  Login(email: string) {

    const params = new HttpParams().set('Email', email); 
    return this.http.post<any>( `${this.api}/login`,null,{ params });
  }

  clear() {
  localStorage.clear(); 
}


}
