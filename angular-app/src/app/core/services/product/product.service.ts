import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
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

  getProductsP(page: number): Observable<Product[]>{
    const url = environment.baseURL + 'products?page=';
    return this.http.get<Product[]>(url);
  }

}
