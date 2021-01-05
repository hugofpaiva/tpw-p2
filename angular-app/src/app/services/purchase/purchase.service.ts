import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Purchase} from '../../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  getPurchase(id: number): Observable<Purchase>{
    const url = environment.baseURL + 'purchase?id=' + id;
    return this.http.get<Purchase>(url);
  }

  getPurchases(): Observable<Purchase[]>{
    const url = environment.baseURL + 'purchases';
    return this.http.get<Purchase[]>(url);
  }

  getPurchaseP(page: number): Observable<Purchase[]>{
    const url = environment.baseURL + 'purchases?page=';
    return this.http.get<Purchase[]>(url);
  }
}
