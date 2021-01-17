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
  updateUser(user: {}, id: number): Observable<any>  {
    const url = environment.baseURL + 'userupd/' + id;
    return this.http.put<any>(url, user, environment.httpOptions);
  }

  updateUserPw(old_password: string, new_password1: string, new_password2: string, id: number): Observable<any>  {
    const url = environment.baseURL + 'userupdpw/' + id;
    return this.http.put<any>(url, {old_password, new_password1, new_password2, id}, environment.httpOptions);
  }
}
