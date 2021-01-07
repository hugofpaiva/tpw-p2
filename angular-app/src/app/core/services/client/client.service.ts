import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Client} from "../../models/client";



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<Client>{
    const url = environment.baseURL + 'client/' + id;
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
}
