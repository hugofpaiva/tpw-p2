import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Purchase} from '../../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) {
  }

  getPurchase(id: number): Observable<Purchase> {
    const url = environment.baseURL + 'purchase?id=' + id;
    return this.http.get<Purchase>(url);
  }

  getPurchases(): Observable<Purchase[]> {
    const url = environment.baseURL + 'purchases';
    return this.http.get<Purchase[]>(url);
  }
  createPurchase(purch: Purchase): Observable<any> {
    const url = environment.baseURL + 'authorcre';
    return this.http.post(url, purch, environment.httpOptions);
  }
  updatePurchase(purch: Purchase): Observable<any> {
    const url = environment.baseURL + 'purchaseupd';
    return this.http.put(url, purch, environment.httpOptions);
  }
  // @ts-ignore
  deletePurchase(purch: Purchase): Observable<any> {
    const url = environment.baseURL + 'purchasedel/' + purch.id;
  }
}
