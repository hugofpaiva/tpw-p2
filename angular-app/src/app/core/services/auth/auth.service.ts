import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }
  AuthenticateUser(userName: string, pw: string): Observable < any > {
    const url = environment.baseURL + 'token-auth/';
    return this.http.post(url, {username: userName, password: pw}, environment.httpOptions);
  }

  loggedIn(): boolean {
    return  localStorage.hasOwnProperty('userToken') && !!localStorage.getItem('userToken');
  }
  getToken(): string {
    return localStorage.getItem('userToken') as string;
  }
  logout(): void {
    localStorage.clear();
  }
}
