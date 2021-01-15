import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../models/product';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../models/category';
import {Developer} from '../../models/developer';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory(id: number): Observable<Category>{
    const url = environment.baseURL + 'category/' + id;
    return this.http.get<Category>(url);
  }

  updateCategory(cat: {}, id: number ): Observable<Category>{
    const url = environment.baseURL + 'categoryupd/' + id;
    return this.http.put<Category>( url, cat, environment.httpOptions);
  }

  createCategory(cat: Category): Observable<Category>{
    const url = environment.baseURL + 'categorycre';
    return this.http.post<Category>(url, cat);
  }

  getCategories(): Observable<Category[]>{
    const url = environment.baseURL + 'categories';
    return this.http.get<Category[]>(url);
  }

  getCategoriesP(page: number): Observable<Category[]>{
    const url = environment.baseURL + 'categories?page=';
    return this.http.get<Category[]>(url);
  }
}
