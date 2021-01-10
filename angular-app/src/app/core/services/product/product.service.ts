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

  getProductsParams(categoryId: number|undefined, developerId: number|undefined, rating: number|undefined, search: string,
              minPrice: number|undefined, maxPrice: number|undefined): Observable<Product[]>{
    const url = environment.baseURL + 'products';
    const params = new HttpParams();
    if (categoryId !== undefined) {
      params.set('category', String(categoryId));
    }
    if (developerId !== undefined) {
      params.set('developer', String(developerId));
    }
    if (rating !== undefined) {
      params.set('rating', String(developerId));
    }
    if (search !== '') {
      params.set('name', String(search));
    }
    if (minPrice !== undefined) {
      params.set('min_price', String(minPrice));
    }
    if (maxPrice !== undefined) {
      params.set('max_price', String(maxPrice));
    }

    return this.http.get<Product[]>(url, {params});
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
