import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Client} from "../../models/client";



@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public currentUserSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }
  getUser(id: number): Observable<Client>{
    const url = environment.baseURL + 'client/' + id;
    return this.http.get<Client>(url);
  }

  getActualUser(): Observable<Client>{
    const url = environment.baseURL + 'client/';
    return this.http.get<Client>(url);
  }

  getUsers(): Observable<Client[]>{
    const url = environment.baseURL + 'clients';
    return this.http.get<Client[]>(url);
  }

  getUserP(page: number): Observable<Client[]>{
    const url = environment.baseURL + 'client?page=';
    return this.http.get<Client[]>(url);
  }

  updateClient(username: string, email: string, first_name: string, last_name: string, id: number): Observable<any>  {
    const url = environment.baseURL + 'userupd/' + id;
    return this.http.put<any>(url, {username, email, first_name, last_name, id}, environment.httpOptions);
  }

  updateClientPw(old_password: string, new_password1: string, new_password2: string, id: number): Observable<any>  {
    const url = environment.baseURL + 'userupdpw/' + id;
    return this.http.put<any>(url, {old_password, new_password1, new_password2, id}, environment.httpOptions);
  }

}
