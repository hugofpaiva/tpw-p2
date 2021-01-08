import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<Product>{
    const url = environment.baseURL + 'product/' + id;
    return this.http.get<Product>(url);
  }

  getProducts(): Observable<Product[]>{
    const url = environment.baseURL + 'products';
    return this.http.get<Product[]>(url);
  }

  getTopProducts(num: number= 6): Observable<Product[]>{
    const url = environment.baseURL + 'top_products';
    const params = new HttpParams().set('num', String(num));
    return this.http.get<Product[]>(url, {params});
  }

  getNewProducts(num: number= 6): Observable<Product[]>{
    const url = environment.baseURL + 'new_products';
    const params = new HttpParams().set('num', String(num));
    return this.http.get<Product[]>(url, {params});
  }

  getProductsP(page: number): Observable<Product[]>{
    const url = environment.baseURL + 'products?page=';
    return this.http.get<Product[]>(url);
  }

}
