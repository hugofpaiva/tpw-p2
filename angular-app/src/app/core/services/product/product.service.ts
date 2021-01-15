import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../models/product';
import {Client} from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<Product>{
    const url = environment.baseURL + 'product/' + id;
    return this.http.get<Product>(url);
  }

  updateProduct(product: {}, id: number ): Observable<Product>{
    const url = environment.baseURL + 'productupd/' + id;
    return this.http.put<Product>( url, product, environment.httpOptions);
  }

  createProduct(product: {}): Observable<Product>{
    const url = environment.baseURL + 'productcre';
    return this.http.post<Product>( url, product, environment.httpOptions);
  }
  getProductsParams(categoryId: number|undefined, developerId: number|undefined, rating: number|undefined, search: string,
                    minPrice: number|undefined, maxPrice: number|undefined, order: string): Observable<Product[]>{
    const url = environment.baseURL + 'products';
    const paramsDict: { [name: string]: string} = {};
    if (categoryId !== undefined) {
      paramsDict.category = String(categoryId);
    }
    if (developerId !== undefined) {
      paramsDict.developer = String(developerId);
    }
    if (rating !== undefined) {
      paramsDict.rate = String(rating);
    }
    if (search !== '') {
      paramsDict.name = search;
    }
    if (minPrice !== undefined) {
      paramsDict.min_price = String(minPrice);
    }

    paramsDict.order = String(order);

    if (maxPrice !== undefined) {
      paramsDict.max_price = String(maxPrice);
    }

    console.log(paramsDict);

    let params = new HttpParams();
    Object.keys(paramsDict).forEach(p => {
      params = params.append(p.toString(), paramsDict[p].toString());
    });
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
