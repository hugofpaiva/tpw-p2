import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../models/product';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Developer} from '../../models/developer';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient) { }

  createDeveloper(dev: Developer): Observable<Developer>{
    const url = environment.baseURL + 'developercre';
    return this.http.post<Developer>(url, dev);
  }

  updateDeveloper(dev: {}, id: number ): Observable<Developer>{
    const url = environment.baseURL + 'developerupd/' + id;
    return this.http.put<Developer>( url, dev, environment.httpOptions);
  }

  getDeveloper(id: number): Observable<Developer>{
    const url = environment.baseURL + 'developer/' + id;
    return this.http.get<Developer>(url);
  }

  getDevelopers(): Observable<Developer[]>{
    const url = environment.baseURL + 'developers';
    return this.http.get<Developer[]>(url);
  }

  getDevelopersP(page: number): Observable<Developer[]>{
    const url = environment.baseURL + 'developers?page=';
    return this.http.get<Developer[]>(url);
  }
}
