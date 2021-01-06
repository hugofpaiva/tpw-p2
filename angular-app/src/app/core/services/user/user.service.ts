import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User>{
    const url = environment.baseURL + 'user/' + id;
    return this.http.get<User>(url);
  }

  getUsers(): Observable<User[]>{
    const url = environment.baseURL + 'users';
    return this.http.get<User[]>(url);
  }

  getUserP(page: number): Observable<User[]>{
    const url = environment.baseURL + 'users?page=';
    return this.http.get<User[]>(url);
  }

  userAuthentication(userName: string, pw: string): Observable<any>{
    const url = environment.baseURL + 'token-auth/';
    return this.http.post(url, {username: userName, password: pw}, environment.httpOptions);

  }
}
